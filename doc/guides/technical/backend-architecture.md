# 后端架构设计

## 概述

Immortality修仙游戏后端采用现代微服务架构，基于NestJS框架构建类型安全的API服务，使用EventStoreDB实现事件溯源架构，结合PostgreSQL提供传统关系型数据存储，通过Socket.IO支持实时通信，确保系统的高性能、高可用性和可扩展性。

## 🏗️ **架构总览**

### 技术栈

```typescript
const BackendStack = {
  // 核心框架
  framework: 'NestJS 10.0+',
  language: 'TypeScript 5.0+',
  runtime: 'Node.js 18+',
  
  // 数据存储
  eventStore: 'EventStoreDB 23.0+',
  database: 'PostgreSQL 15+',
  cache: 'Redis 7.0+',
  fileStorage: 'MinIO (S3兼容)',
  
  // 实时通信
  websocket: 'Socket.IO 4.0+',
  
  // 消息队列
  messageQueue: 'Redis Pub/Sub',
  
  // 认证授权
  auth: 'JWT + Passport',
  
  // API文档
  documentation: 'Swagger/OpenAPI 3.0',
  
  // 监控日志
  logging: 'Winston + Morgan',
  monitoring: 'Prometheus + Grafana',
  
  // 容器化
  containerization: 'Docker + Docker Compose',
  
  // 测试框架
  testing: 'Jest + Supertest',
  
  // 代码质量
  linting: 'ESLint + Prettier',
  validation: 'class-validator + class-transformer'
};
```

### 系统架构图

```mermaid
flowchart TB
    subgraph "客户端层"
        A[React前端]
        B[移动端App]
        C[管理后台]
    end
    
    subgraph "网关层"
        D[Nginx反向代理]
        E[负载均衡器]
    end
    
    subgraph "应用层"
        F[认证服务<br/>Auth Service]
        G[游戏核心服务<br/>Game Core Service]
        H[实时通信服务<br/>WebSocket Service]
        I[文件服务<br/>File Service]
        J[通知服务<br/>Notification Service]
    end
    
    subgraph "数据层"
        K[EventStoreDB<br/>事件存储]
        L[PostgreSQL<br/>关系数据库]
        M[Redis<br/>缓存/会话]
        N[MinIO<br/>对象存储]
    end
    
    subgraph "基础设施层"
        O[Docker容器]
        P[监控系统]
        Q[日志系统]
        R[备份系统]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    E --> G
    E --> H
    E --> I
    E --> J
    
    F --> L
    F --> M
    G --> K
    G --> L
    G --> M
    H --> M
    I --> N
    J --> M
    
    F --> O
    G --> O
    H --> O
    I --> O
    J --> O
    
    O --> P
    O --> Q
    O --> R
```

## 🎯 **微服务架构设计**

### 1. 认证服务 (Auth Service)

```typescript
// auth.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' }
      }),
      inject: [ConfigService]
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    RolesGuard
  ],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule {}

// auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['roles', 'roles.permissions']
    });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles.map(role => role.name)
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles
      }
    };
  }
  
  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    });
    
    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    
    return result;
  }
  
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
        relations: ['roles']
      });
      
      if (!user) {
        throw new UnauthorizedException('用户不存在');
      }
      
      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('刷新令牌无效');
    }
  }
}

// auth.controller.ts
@Controller('auth')
@ApiTags('认证')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({ status: 200, description: '登录成功' })
  @ApiResponse({ status: 401, description: '认证失败' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );
    
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    
    return this.authService.login(user);
  }
  
  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  
  @Post('refresh')
  @ApiOperation({ summary: '刷新令牌' })
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshDto.refreshToken);
  }
  
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }
}
```

### 2. 游戏核心服务 (Game Core Service)

```typescript
// game.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Player, Character, Cultivation, Combat, Item, Quest
    ]),
    EventStoreModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379
    })
  ],
  controllers: [
    PlayerController,
    CultivationController,
    CombatController,
    ItemController
  ],
  providers: [
    PlayerService,
    CultivationService,
    CombatService,
    ItemService,
    GameEventHandler,
    GameEngine
  ],
  exports: [PlayerService, GameEngine]
})
export class GameModule {}

// cultivation.service.ts
@Injectable()
export class CultivationService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Cultivation)
    private cultivationRepository: Repository<Cultivation>,
    private eventStore: EventStoreService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private gameEngine: GameEngine
  ) {}
  
  async startCultivation(playerId: string, techniqueId: string): Promise<CultivationResult> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: ['character', 'cultivation']
    });
    
    if (!player) {
      throw new NotFoundException('玩家不存在');
    }
    
    if (player.character.energy < 10) {
      throw new BadRequestException('灵力不足，无法开始修炼');
    }
    
    // 创建修炼事件
    const cultivationEvent = new CultivationStartedEvent({
      playerId,
      techniqueId,
      startTime: new Date(),
      energyCost: 10,
      expectedDuration: 3600000 // 1小时
    });
    
    // 保存事件到EventStore
    await this.eventStore.appendToStream(
      `player-${playerId}`,
      [cultivationEvent]
    );
    
    // 更新玩家状态
    player.character.energy -= 10;
    player.character.status = CharacterStatus.CULTIVATING;
    await this.playerRepository.save(player);
    
    // 缓存修炼状态
    await this.cacheManager.set(
      `cultivation:${playerId}`,
      {
        isActive: true,
        startTime: new Date(),
        techniqueId,
        progress: 0
      },
      3600 // 1小时TTL
    );
    
    // 启动修炼进程
    this.gameEngine.startCultivationProcess(playerId, techniqueId);
    
    return {
      success: true,
      message: '开始修炼',
      cultivationId: cultivationEvent.aggregateId
    };
  }
  
  async stopCultivation(playerId: string): Promise<CultivationResult> {
    const cultivationState = await this.cacheManager.get(`cultivation:${playerId}`);
    
    if (!cultivationState || !cultivationState.isActive) {
      throw new BadRequestException('当前未在修炼中');
    }
    
    const duration = Date.now() - new Date(cultivationState.startTime).getTime();
    const experienceGained = this.calculateExperience(duration, cultivationState.techniqueId);
    
    // 创建修炼结束事件
    const cultivationEndedEvent = new CultivationEndedEvent({
      playerId,
      endTime: new Date(),
      duration,
      experienceGained,
      reason: 'manual_stop'
    });
    
    await this.eventStore.appendToStream(
      `player-${playerId}`,
      [cultivationEndedEvent]
    );
    
    // 更新玩家经验和等级
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: ['character']
    });
    
    player.character.experience += experienceGained;
    player.character.status = CharacterStatus.IDLE;
    
    // 检查是否升级
    const levelUpResult = this.checkLevelUp(player.character);
    if (levelUpResult.leveledUp) {
      player.character.level = levelUpResult.newLevel;
      player.character.realm = levelUpResult.newRealm;
      
      // 创建升级事件
      const levelUpEvent = new LevelUpEvent({
        playerId,
        oldLevel: levelUpResult.oldLevel,
        newLevel: levelUpResult.newLevel,
        oldRealm: levelUpResult.oldRealm,
        newRealm: levelUpResult.newRealm
      });
      
      await this.eventStore.appendToStream(
        `player-${playerId}`,
        [levelUpEvent]
      );
    }
    
    await this.playerRepository.save(player);
    
    // 清除缓存
    await this.cacheManager.del(`cultivation:${playerId}`);
    
    return {
      success: true,
      message: '修炼结束',
      experienceGained,
      levelUp: levelUpResult.leveledUp ? {
        newLevel: levelUpResult.newLevel,
        newRealm: levelUpResult.newRealm
      } : null
    };
  }
  
  private calculateExperience(duration: number, techniqueId: string): number {
    // 基础经验计算：每分钟10点经验
    const baseExp = Math.floor(duration / 60000) * 10;
    
    // 根据功法等级调整经验
    const techniqueMultiplier = this.getTechniqueMultiplier(techniqueId);
    
    return Math.floor(baseExp * techniqueMultiplier);
  }
  
  private checkLevelUp(character: Character): LevelUpResult {
    const currentLevel = character.level;
    const currentRealm = character.realm;
    const experience = character.experience;
    
    // 计算新等级
    const newLevel = this.calculateLevel(experience);
    const newRealm = this.calculateRealm(newLevel);
    
    return {
      leveledUp: newLevel > currentLevel,
      oldLevel: currentLevel,
      newLevel,
      oldRealm: currentRealm,
      newRealm
    };
  }
}

// game.engine.ts
@Injectable()
export class GameEngine {
  private cultivationProcesses = new Map<string, NodeJS.Timeout>();
  
  constructor(
    private cultivationService: CultivationService,
    private websocketGateway: GameGateway,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}
  
  startCultivationProcess(playerId: string, techniqueId: string): void {
    // 清除已存在的进程
    this.stopCultivationProcess(playerId);
    
    // 每30秒更新一次修炼进度
    const interval = setInterval(async () => {
      try {
        await this.updateCultivationProgress(playerId, techniqueId);
      } catch (error) {
        console.error(`修炼进程错误 (${playerId}):`, error);
        this.stopCultivationProcess(playerId);
      }
    }, 30000);
    
    this.cultivationProcesses.set(playerId, interval);
  }
  
  stopCultivationProcess(playerId: string): void {
    const interval = this.cultivationProcesses.get(playerId);
    if (interval) {
      clearInterval(interval);
      this.cultivationProcesses.delete(playerId);
    }
  }
  
  private async updateCultivationProgress(playerId: string, techniqueId: string): Promise<void> {
    const cultivationState = await this.cacheManager.get(`cultivation:${playerId}`);
    
    if (!cultivationState || !cultivationState.isActive) {
      this.stopCultivationProcess(playerId);
      return;
    }
    
    // 计算当前进度
    const elapsed = Date.now() - new Date(cultivationState.startTime).getTime();
    const progress = Math.min(elapsed / 3600000, 1); // 1小时完成
    
    // 更新缓存
    await this.cacheManager.set(
      `cultivation:${playerId}`,
      {
        ...cultivationState,
        progress
      },
      3600
    );
    
    // 发送进度更新到客户端
    this.websocketGateway.sendToPlayer(playerId, 'cultivation:progress', {
      progress,
      elapsed,
      experienceGained: this.calculatePartialExperience(elapsed, techniqueId)
    });
    
    // 检查是否完成
    if (progress >= 1) {
      await this.cultivationService.stopCultivation(playerId);
      this.stopCultivationProcess(playerId);
      
      this.websocketGateway.sendToPlayer(playerId, 'cultivation:completed', {
        message: '修炼完成！'
      });
    }
  }
  
  private calculatePartialExperience(elapsed: number, techniqueId: string): number {
    const baseExp = Math.floor(elapsed / 60000) * 10;
    const techniqueMultiplier = this.getTechniqueMultiplier(techniqueId);
    return Math.floor(baseExp * techniqueMultiplier);
  }
}
```

### 3. 实时通信服务 (WebSocket Service)

```typescript
// websocket.gateway.ts
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/game'
})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  
  private connectedPlayers = new Map<string, string>(); // socketId -> playerId
  private playerSockets = new Map<string, string>(); // playerId -> socketId
  
  constructor(
    private jwtService: JwtService,
    private playerService: PlayerService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}
  
  afterInit(server: Server) {
    console.log('WebSocket服务器初始化完成');
  }
  
  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const payload = this.jwtService.verify(token);
      const playerId = payload.sub;
      
      // 验证玩家是否存在
      const player = await this.playerService.findById(playerId);
      if (!player) {
        client.disconnect();
        return;
      }
      
      // 记录连接
      this.connectedPlayers.set(client.id, playerId);
      this.playerSockets.set(playerId, client.id);
      
      // 加入玩家房间
      client.join(`player:${playerId}`);
      
      // 更新在线状态
      await this.cacheManager.set(`online:${playerId}`, true, 0);
      
      // 发送连接成功消息
      client.emit('connected', {
        message: '连接成功',
        playerId,
        timestamp: new Date()
      });
      
      // 发送当前游戏状态
      const gameState = await this.getPlayerGameState(playerId);
      client.emit('game:state', gameState);
      
      console.log(`玩家 ${playerId} 已连接 (${client.id})`);
    } catch (error) {
      console.error('WebSocket连接认证失败:', error);
      client.disconnect();
    }
  }
  
  async handleDisconnect(client: Socket) {
    const playerId = this.connectedPlayers.get(client.id);
    
    if (playerId) {
      // 清理连接记录
      this.connectedPlayers.delete(client.id);
      this.playerSockets.delete(playerId);
      
      // 更新离线状态
      await this.cacheManager.del(`online:${playerId}`);
      
      console.log(`玩家 ${playerId} 已断开连接 (${client.id})`);
    }
  }
  
  @SubscribeMessage('cultivation:start')
  async handleCultivationStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { techniqueId: string }
  ) {
    const playerId = this.connectedPlayers.get(client.id);
    if (!playerId) return;
    
    try {
      const result = await this.cultivationService.startCultivation(
        playerId,
        data.techniqueId
      );
      
      client.emit('cultivation:started', result);
    } catch (error) {
      client.emit('error', {
        message: error.message,
        code: 'CULTIVATION_START_FAILED'
      });
    }
  }
  
  @SubscribeMessage('cultivation:stop')
  async handleCultivationStop(@ConnectedSocket() client: Socket) {
    const playerId = this.connectedPlayers.get(client.id);
    if (!playerId) return;
    
    try {
      const result = await this.cultivationService.stopCultivation(playerId);
      client.emit('cultivation:stopped', result);
    } catch (error) {
      client.emit('error', {
        message: error.message,
        code: 'CULTIVATION_STOP_FAILED'
      });
    }
  }
  
  @SubscribeMessage('combat:challenge')
  async handleCombatChallenge(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { targetPlayerId: string }
  ) {
    const challengerId = this.connectedPlayers.get(client.id);
    if (!challengerId) return;
    
    const targetSocketId = this.playerSockets.get(data.targetPlayerId);
    if (!targetSocketId) {
      client.emit('error', {
        message: '目标玩家不在线',
        code: 'TARGET_OFFLINE'
      });
      return;
    }
    
    // 发送挑战请求给目标玩家
    this.server.to(targetSocketId).emit('combat:challenge_received', {
      challengerId,
      challengerName: await this.getPlayerName(challengerId),
      timestamp: new Date()
    });
    
    client.emit('combat:challenge_sent', {
      targetPlayerId: data.targetPlayerId,
      message: '挑战请求已发送'
    });
  }
  
  // 向特定玩家发送消息
  sendToPlayer(playerId: string, event: string, data: any): void {
    this.server.to(`player:${playerId}`).emit(event, data);
  }
  
  // 向所有在线玩家广播消息
  broadcast(event: string, data: any): void {
    this.server.emit(event, data);
  }
  
  // 向特定房间发送消息
  sendToRoom(room: string, event: string, data: any): void {
    this.server.to(room).emit(event, data);
  }
  
  private async getPlayerGameState(playerId: string): Promise<any> {
    const player = await this.playerService.findById(playerId);
    const cultivationState = await this.cacheManager.get(`cultivation:${playerId}`);
    
    return {
      player: {
        id: player.id,
        name: player.name,
        level: player.character.level,
        realm: player.character.realm,
        experience: player.character.experience,
        energy: player.character.energy,
        status: player.character.status
      },
      cultivation: cultivationState || null,
      timestamp: new Date()
    };
  }
  
  private async getPlayerName(playerId: string): Promise<string> {
    const player = await this.playerService.findById(playerId);
    return player?.name || '未知玩家';
  }
}
```

## 📊 **事件溯源架构**

### 事件定义

```typescript
// events/base.event.ts
export abstract class DomainEvent {
  public readonly aggregateId: string;
  public readonly eventId: string;
  public readonly eventType: string;
  public readonly timestamp: Date;
  public readonly version: number;
  
  constructor(aggregateId: string, data: any, version: number = 1) {
    this.aggregateId = aggregateId;
    this.eventId = uuidv4();
    this.eventType = this.constructor.name;
    this.timestamp = new Date();
    this.version = version;
    Object.assign(this, data);
  }
}

// events/cultivation.events.ts
export class CultivationStartedEvent extends DomainEvent {
  public readonly playerId: string;
  public readonly techniqueId: string;
  public readonly startTime: Date;
  public readonly energyCost: number;
  public readonly expectedDuration: number;
  
  constructor(data: {
    playerId: string;
    techniqueId: string;
    startTime: Date;
    energyCost: number;
    expectedDuration: number;
  }) {
    super(`cultivation-${data.playerId}-${Date.now()}`, data);
  }
}

export class CultivationProgressEvent extends DomainEvent {
  public readonly playerId: string;
  public readonly progress: number;
  public readonly experienceGained: number;
  public readonly timestamp: Date;
  
  constructor(data: {
    playerId: string;
    progress: number;
    experienceGained: number;
  }) {
    super(`cultivation-${data.playerId}-${Date.now()}`, {
      ...data,
      timestamp: new Date()
    });
  }
}

export class CultivationEndedEvent extends DomainEvent {
  public readonly playerId: string;
  public readonly endTime: Date;
  public readonly duration: number;
  public readonly experienceGained: number;
  public readonly reason: 'completed' | 'manual_stop' | 'interrupted';
  
  constructor(data: {
    playerId: string;
    endTime: Date;
    duration: number;
    experienceGained: number;
    reason: 'completed' | 'manual_stop' | 'interrupted';
  }) {
    super(`cultivation-${data.playerId}-${Date.now()}`, data);
  }
}

export class LevelUpEvent extends DomainEvent {
  public readonly playerId: string;
  public readonly oldLevel: number;
  public readonly newLevel: number;
  public readonly oldRealm: string;
  public readonly newRealm: string;
  
  constructor(data: {
    playerId: string;
    oldLevel: number;
    newLevel: number;
    oldRealm: string;
    newRealm: string;
  }) {
    super(`player-${data.playerId}`, data);
  }
}
```

### EventStore服务

```typescript
// eventstore.service.ts
@Injectable()
export class EventStoreService {
  private client: EventStoreDBClient;
  
  constructor(private configService: ConfigService) {
    this.client = EventStoreDBClient.connectionString(
      this.configService.get('EVENTSTORE_CONNECTION_STRING')
    );
  }
  
  async appendToStream(
    streamName: string,
    events: DomainEvent[],
    expectedRevision?: bigint
  ): Promise<void> {
    const eventData = events.map(event => ({
      eventType: event.eventType,
      data: JSON.stringify(event),
      metadata: JSON.stringify({
        timestamp: event.timestamp,
        version: event.version
      })
    }));
    
    try {
      await this.client.appendToStream(
        streamName,
        eventData,
        {
          expectedRevision: expectedRevision || STREAM_EXISTS
        }
      );
    } catch (error) {
      console.error(`Failed to append events to stream ${streamName}:`, error);
      throw error;
    }
  }
  
  async readStream(
    streamName: string,
    fromRevision?: bigint,
    maxCount?: number
  ): Promise<DomainEvent[]> {
    try {
      const events = this.client.readStream(streamName, {
        fromRevision: fromRevision || START,
        maxCount: maxCount || 1000
      });
      
      const result: DomainEvent[] = [];
      
      for await (const event of events) {
        const eventData = JSON.parse(event.event?.data?.toString() || '{}');
        result.push(eventData);
      }
      
      return result;
    } catch (error) {
      console.error(`Failed to read stream ${streamName}:`, error);
      throw error;
    }
  }
  
  async subscribeToStream(
    streamName: string,
    handler: (event: DomainEvent) => Promise<void>
  ): Promise<void> {
    try {
      const subscription = this.client.subscribeToStream(streamName);
      
      for await (const event of subscription) {
        const eventData = JSON.parse(event.event?.data?.toString() || '{}');
        await handler(eventData);
      }
    } catch (error) {
      console.error(`Failed to subscribe to stream ${streamName}:`, error);
      throw error;
    }
  }
  
  async createProjection(
    projectionName: string,
    query: string
  ): Promise<void> {
    try {
      await this.client.createContinuousProjection(
        projectionName,
        query
      );
    } catch (error) {
      console.error(`Failed to create projection ${projectionName}:`, error);
      throw error;
    }
  }
}
```

### 事件处理器

```typescript
// event-handlers/game.event-handler.ts
@Injectable()
export class GameEventHandler {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private websocketGateway: GameGateway,
    private notificationService: NotificationService
  ) {}
  
  @EventsHandler(LevelUpEvent)
  async handleLevelUp(event: LevelUpEvent): Promise<void> {
    // 更新玩家统计
    await this.updatePlayerStats(event.playerId, {
      level: event.newLevel,
      realm: event.newRealm
    });
    
    // 发送实时通知
    this.websocketGateway.sendToPlayer(event.playerId, 'level:up', {
      oldLevel: event.oldLevel,
      newLevel: event.newLevel,
      oldRealm: event.oldRealm,
      newRealm: event.newRealm,
      message: `恭喜突破到${event.newRealm}境界！`
    });
    
    // 发送系统通知
    await this.notificationService.sendNotification(event.playerId, {
      type: 'level_up',
      title: '境界突破',
      message: `恭喜您突破到${event.newRealm}境界，等级提升至${event.newLevel}级！`,
      data: {
        oldLevel: event.oldLevel,
        newLevel: event.newLevel,
        oldRealm: event.oldRealm,
        newRealm: event.newRealm
      }
    });
    
    // 记录成就
    await this.checkAndUnlockAchievements(event.playerId, event.newLevel, event.newRealm);
  }
  
  @EventsHandler(CultivationEndedEvent)
  async handleCultivationEnded(event: CultivationEndedEvent): Promise<void> {
    // 更新修炼统计
    await this.updateCultivationStats(event.playerId, {
      totalCultivationTime: event.duration,
      experienceGained: event.experienceGained
    });
    
    // 发送修炼结果通知
    this.websocketGateway.sendToPlayer(event.playerId, 'cultivation:result', {
      duration: event.duration,
      experienceGained: event.experienceGained,
      reason: event.reason,
      message: this.getCultivationEndMessage(event.reason, event.experienceGained)
    });
  }
  
  private async updatePlayerStats(playerId: string, stats: any): Promise<void> {
    await this.playerRepository.update(playerId, stats);
  }
  
  private async updateCultivationStats(playerId: string, stats: any): Promise<void> {
    // 更新修炼统计数据
    // 实现具体的统计更新逻辑
  }
  
  private getCultivationEndMessage(reason: string, experience: number): string {
    switch (reason) {
      case 'completed':
        return `修炼完成，获得${experience}点修为！`;
      case 'manual_stop':
        return `手动停止修炼，获得${experience}点修为。`;
      case 'interrupted':
        return `修炼被中断，获得${experience}点修为。`;
      default:
        return `修炼结束，获得${experience}点修为。`;
    }
  }
  
  private async checkAndUnlockAchievements(
    playerId: string,
    level: number,
    realm: string
  ): Promise<void> {
    // 检查并解锁成就
    // 实现成就系统逻辑
  }
}
```

## 🗄️ **数据库设计**

### PostgreSQL实体定义

```typescript
// entities/user.entity.ts
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ unique: true })
  username: string;
  
  @Column({ unique: true })
  email: string;
  
  @Column()
  password: string;
  
  @Column({ default: true })
  isActive: boolean;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];
  
  @OneToOne(() => Player, player => player.user)
  player: Player;
}

// entities/player.entity.ts
@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;
  
  @Column({ type: 'int', default: 1 })
  level: number;
  
  @Column({ default: '练气期' })
  realm: string;
  
  @Column({ type: 'bigint', default: 0 })
  experience: string;
  
  @Column({ type: 'int', default: 100 })
  energy: number;
  
  @Column({ type: 'int', default: 100 })
  maxEnergy: number;
  
  @Column({ 
    type: 'enum',
    enum: CharacterStatus,
    default: CharacterStatus.IDLE
  })
  status: CharacterStatus;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToOne(() => User, user => user.player)
  @JoinColumn()
  user: User;
  
  @OneToMany(() => Item, item => item.owner)
  inventory: Item[];
  
  @OneToMany(() => CultivationRecord, record => record.player)
  cultivationRecords: CultivationRecord[];
}

// entities/cultivation-record.entity.ts
@Entity('cultivation_records')
export class CultivationRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  techniqueId: string;
  
  @Column()
  startTime: Date;
  
  @Column({ nullable: true })
  endTime: Date;
  
  @Column({ type: 'int', default: 0 })
  duration: number;
  
  @Column({ type: 'int', default: 0 })
  experienceGained: number;
  
  @Column({
    type: 'enum',
    enum: ['completed', 'manual_stop', 'interrupted'],
    nullable: true
  })
  endReason: string;
  
  @ManyToOne(() => Player, player => player.cultivationRecords)
  player: Player;
  
  @CreateDateColumn()
  createdAt: Date;
}
```

## 🔧 **配置管理**

### 环境配置

```typescript
// config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'immortality',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development'
  },
  
  eventstore: {
    connectionString: process.env.EVENTSTORE_CONNECTION_STRING || 
      'esdb://admin:changeit@localhost:2113?tls=false'
  },
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  
  minio: {
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT, 10) || 9000,
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
  },
  
  websocket: {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true
    }
  }
});
```

### Docker配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  # 后端应用
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=password
      - DB_NAME=immortality
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - EVENTSTORE_CONNECTION_STRING=esdb://admin:changeit@eventstore:2113?tls=false
      - MINIO_ENDPOINT=minio
      - MINIO_PORT=9000
      - JWT_SECRET=your-super-secret-jwt-key
    depends_on:
      - postgres
      - redis
      - eventstore
      - minio
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run start:dev
  
  # PostgreSQL数据库
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=immortality
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  # Redis缓存
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
  
  # EventStoreDB
  eventstore:
    image: eventstore/eventstore:23.6.0-buster-slim
    environment:
      - EVENTSTORE_CLUSTER_SIZE=1
      - EVENTSTORE_RUN_PROJECTIONS=All
      - EVENTSTORE_START_STANDARD_PROJECTIONS=true
      - EVENTSTORE_EXT_TCP_PORT=1113
      - EVENTSTORE_HTTP_PORT=2113
      - EVENTSTORE_INSECURE=true
      - EVENTSTORE_ENABLE_EXTERNAL_TCP=true
      - EVENTSTORE_ENABLE_ATOM_PUB_OVER_HTTP=true
    ports:
      - "1113:1113"
      - "2113:2113"
    volumes:
      - eventstore_data:/var/lib/eventstore
  
  # MinIO对象存储
  minio:
    image: minio/minio:latest
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"

volumes:
  postgres_data:
  redis_data:
  eventstore_data:
  minio_data:
```

## 📊 **监控和日志**

### 日志配置

```typescript
// logger.config.ts
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const loggerConfig = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, context }) => {
          return `${timestamp} [${context}] ${level}: ${message}`;
        })
      )
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});
```

### 健康检查

```typescript
// health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private redis: RedisHealthIndicator
  ) {}
  
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.redis.checkHealth('redis'),
      () => this.checkEventStore(),
      () => this.checkMinio()
    ]);
  }
  
  private async checkEventStore(): Promise<HealthIndicatorResult> {
    // EventStore健康检查逻辑
    return { eventstore: { status: 'up' } };
  }
  
  private async checkMinio(): Promise<HealthIndicatorResult> {
    // MinIO健康检查逻辑
    return { minio: { status: 'up' } };
  }
}
```

## 🧪 **测试策略**

### 单元测试

```typescript
// cultivation.service.spec.ts
describe('CultivationService', () => {
  let service: CultivationService;
  let playerRepository: Repository<Player>;
  let eventStore: EventStoreService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultivationService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository
        },
        {
          provide: EventStoreService,
          useValue: {
            appendToStream: jest.fn()
          }
        }
      ]
    }).compile();
    
    service = module.get<CultivationService>(CultivationService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
    eventStore = module.get<EventStoreService>(EventStoreService);
  });
  
  describe('startCultivation', () => {
    it('should start cultivation successfully', async () => {
      const mockPlayer = {
        id: 'player-1',
        character: {
          energy: 50,
          status: CharacterStatus.IDLE
        }
      };
      
      jest.spyOn(playerRepository, 'findOne').mockResolvedValue(mockPlayer as any);
      jest.spyOn(playerRepository, 'save').mockResolvedValue(mockPlayer as any);
      jest.spyOn(eventStore, 'appendToStream').mockResolvedValue(undefined);
      
      const result = await service.startCultivation('player-1', 'technique-1');
      
      expect(result.success).toBe(true);
      expect(eventStore.appendToStream).toHaveBeenCalled();
    });
    
    it('should throw error when player has insufficient energy', async () => {
      const mockPlayer = {
        id: 'player-1',
        character: {
          energy: 5,
          status: CharacterStatus.IDLE
        }
      };
      
      jest.spyOn(playerRepository, 'findOne').mockResolvedValue(mockPlayer as any);
      
      await expect(
        service.startCultivation('player-1', 'technique-1')
      ).rejects.toThrow('灵力不足，无法开始修炼');
    });
  });
});
```

### 集成测试

```typescript
// app.e2e-spec.ts
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
    
    // 获取认证令牌
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'testpass'
      })
      .expect(200);
    
    authToken = loginResponse.body.access_token;
  });
  
  it('/cultivation/start (POST)', () => {
    return request(app.getHttpServer())
      .post('/cultivation/start')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        techniqueId: 'basic-cultivation'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(true);
      });
  });
  
  afterAll(async () => {
    await app.close();
  });
});
```

## 🚀 **部署策略**

### 生产环境配置

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS production

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

### Kubernetes部署

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: immortality-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: immortality-backend
  template:
    metadata:
      labels:
        app: immortality-backend
    spec:
      containers:
      - name: backend
        image: immortality/backend:latest
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          value: "postgres-service"
        - name: REDIS_HOST
          value: "redis-service"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5
```

## 📋 **开发规范**

### 1. 代码规范
- 使用TypeScript严格模式
- 遵循NestJS最佳实践
- 100%类型覆盖
- 单元测试覆盖率>80%

### 2. API设计规范
- RESTful API设计
- 统一错误处理
- 请求验证和转换
- API版本控制

### 3. 数据库规范
- 事件溯源优先
- 读写分离
- 数据一致性保证
- 性能优化

### 4. 安全规范
- JWT认证
- 角色权限控制
- 输入验证
- SQL注入防护

通过这套后端架构设计，我们能够构建一个高性能、高可用、可扩展的修仙游戏后端系统，支持实时交互和复杂的游戏逻辑处理。