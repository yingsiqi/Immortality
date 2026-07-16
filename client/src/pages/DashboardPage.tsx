import React, { useState, useCallback } from 'react';
import GameMap from '../components/GameMap';
import Character from '../components/Character';
import DraggablePanel from '../components/DraggablePanel';
import ExperienceBar from '../components/ExperienceBar';
import { 
  RocketOutlined, 
  TrophyOutlined, 
  FireOutlined, 
  CrownOutlined,
  GiftOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Card, Progress, Badge, Avatar, Button, Statistic, List } from 'antd';

const DashboardPage: React.FC = () => {
  const [playerStats] = useState({
    level: 45,
    experience: 75680,
    maxExperience: 89000,
    health: 2850,
    maxHealth: 3200,
    mana: 1680,
    maxMana: 2100,
    gold: 15420,
    diamonds: 89
  });

  const [quests] = useState([
    { id: 1, title: '击败暗影领主', description: '在暗影森林深处击败强大的暗影领主', progress: 75, reward: '5000金币 + 稀有装备', type: 'main' },
    { id: 2, title: '收集月光草', description: '在月光谷收集20株月光草', progress: 60, reward: '2000金币 + 经验值', type: 'daily' },
    { id: 3, title: '挑战竞技场', description: '在竞技场中获得5场胜利', progress: 40, reward: '3000金币 + 荣誉点', type: 'weekly' }
  ]);

  const [recentActivities] = useState([
    { time: '2分钟前', action: '获得了传说装备【龙鳞护甲】', type: 'equipment' },
    { time: '15分钟前', action: '完成了任务【古老的秘密】', type: 'quest' },
    { time: '1小时前', action: '在竞技场中击败了玩家【影刃大师】', type: 'pvp' },
    { time: '2小时前', action: '升级到了45级！', type: 'level' }
  ]);

  // 角色移动状态
  const [characterState, setCharacterState] = useState({
    isMoving: false,
    direction: 'idle' as 'up' | 'down' | 'left' | 'right' | 'idle'
  });

  // 浮窗显示状态
  const [panels, setPanels] = useState({
    character: false,
    inventory: false,
    quests: false,
    guild: false,
    shop: false,
    settings: false
  })

  // 处理地图点击
  const handleMapClick = useCallback((x: number, y: number) => {
    setCharacterState({ isMoving: true, direction: 'right' });
    
    // 模拟移动完成
    setTimeout(() => {
      setCharacterState({ isMoving: false, direction: 'idle' });
    }, 1000);
  }, []);

  // 打开/关闭浮窗
  const togglePanel = (panelName: keyof typeof panels) => {
    setPanels(prev => ({ ...prev, [panelName]: !prev[panelName] }));
  };

  const closePanel = (panelName: keyof typeof panels) => {
    setPanels(prev => ({ ...prev, [panelName]: false }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 游戏地图 */}
      <GameMap onMapClick={handleMapClick} />
      
      {/* 角色 */}
      <Character 
        isMoving={characterState.isMoving} 
        direction={characterState.direction} 
      />
      
      {/* 经验条 */}
      <ExperienceBar 
        currentExp={playerStats.experience}
        maxExp={playerStats.maxExperience}
        level={playerStats.level}
      />
      
      {/* 顶部状态栏 */}
      <div className="fixed top-4 left-4 right-4 z-40 flex justify-between items-start">
        {/* 左上角 - 角色信息 */}
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 flex items-center gap-3">
          <Avatar size={40} src="/api/placeholder/40/40" className="border-2 border-yellow-400" />
          <div>
            <div className="text-white font-bold text-sm">不朽剑仙</div>
            <div className="text-yellow-400 text-xs">Lv.{playerStats.level}</div>
          </div>
          <div className="ml-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all"
                  style={{ width: `${(playerStats.health / playerStats.maxHealth) * 100}%` }}
                ></div>
              </div>
              <span className="text-white text-xs">{playerStats.health}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${(playerStats.mana / playerStats.maxMana) * 100}%` }}
                ></div>
              </div>
              <span className="text-white text-xs">{playerStats.mana}</span>
            </div>
          </div>
        </div>
        
        {/* 右上角 - 游戏时间和货币 */}
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-400">游戏时间</div>
              <div className="text-white font-bold">15:42:33</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">金币</div>
              <div className="text-yellow-400 font-bold">{playerStats.gold.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">钻石</div>
              <div className="text-blue-400 font-bold">{playerStats.diamonds}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 右侧功能按钮 */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
        <button 
          onClick={() => togglePanel('character')}
          className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center justify-center text-white transition-colors shadow-lg"
        >
          <UserOutlined />
        </button>
        <button 
          onClick={() => togglePanel('inventory')}
          className="w-12 h-12 bg-green-600 hover:bg-green-500 rounded-lg flex items-center justify-center text-white transition-colors shadow-lg"
        >
          <ShoppingOutlined />
        </button>
        <button 
          onClick={() => togglePanel('quests')}
          className="w-12 h-12 bg-orange-600 hover:bg-orange-500 rounded-lg flex items-center justify-center text-white transition-colors shadow-lg"
        >
          <RocketOutlined />
        </button>
        <button 
          onClick={() => togglePanel('guild')}
          className="w-12 h-12 bg-red-600 hover:bg-red-500 rounded-lg flex items-center justify-center text-white transition-colors shadow-lg"
        >
          <TeamOutlined />
        </button>
        <button 
          onClick={() => togglePanel('settings')}
          className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-lg flex items-center justify-center text-white transition-colors shadow-lg"
        >
          <SettingOutlined />
        </button>
      </div>
      
      {/* 浮窗面板 */}
      {panels.character && (
        <DraggablePanel 
          title="角色信息" 
          onClose={() => closePanel('character')}
          initialPosition={{ x: 100, y: 100 }}
        >
          <div className="space-y-4">
            <div className="text-center">
              <Avatar size={80} src="/api/placeholder/80/80" className="border-4 border-yellow-400" />
              <h3 className="text-white text-lg font-bold mt-2">不朽剑仙</h3>
              <Badge count={`Lv.${playerStats.level}`} style={{ backgroundColor: '#f59e0b' }} />
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-white text-sm mb-1">
                  <span>生命值</span>
                  <span>{playerStats.health}/{playerStats.maxHealth}</span>
                </div>
                <Progress percent={(playerStats.health / playerStats.maxHealth) * 100} strokeColor="#ef4444" showInfo={false} />
              </div>
              <div>
                <div className="flex justify-between text-white text-sm mb-1">
                  <span>法力值</span>
                  <span>{playerStats.mana}/{playerStats.maxMana}</span>
                </div>
                <Progress percent={(playerStats.mana / playerStats.maxMana) * 100} strokeColor="#3b82f6" showInfo={false} />
              </div>
            </div>
          </div>
        </DraggablePanel>
      )}
      
      {panels.quests && (
        <DraggablePanel 
          title="任务列表" 
          onClose={() => closePanel('quests')}
          initialPosition={{ x: 200, y: 150 }}
        >
          <div className="space-y-3">
            {quests.map(quest => (
              <div key={quest.id} className="bg-gray-800/50 p-3 rounded-lg border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white text-sm font-semibold">{quest.title}</h4>
                  <Badge 
                    count={quest.type === 'main' ? '主' : quest.type === 'daily' ? '日' : '周'} 
                    style={{ 
                      backgroundColor: quest.type === 'main' ? '#f59e0b' : quest.type === 'daily' ? '#10b981' : '#8b5cf6'
                    }} 
                  />
                </div>
                <p className="text-gray-300 text-xs mb-2">{quest.description}</p>
                <Progress percent={quest.progress} size="small" strokeColor="#10b981" />
                <p className="text-yellow-400 text-xs mt-1">奖励: {quest.reward}</p>
              </div>
            ))}
          </div>
        </DraggablePanel>
      )}
      
      {panels.inventory && (
        <DraggablePanel 
          title="背包" 
          onClose={() => closePanel('inventory')}
          initialPosition={{ x: 300, y: 200 }}
        >
          <div className="text-white text-center py-8">
            <ShoppingOutlined className="text-4xl mb-4 text-gray-400" />
            <p>背包功能开发中...</p>
          </div>
        </DraggablePanel>
      )}
      
      {panels.guild && (
        <DraggablePanel 
          title="公会" 
          onClose={() => closePanel('guild')}
          initialPosition={{ x: 400, y: 250 }}
        >
          <div className="text-white text-center py-8">
            <TeamOutlined className="text-4xl mb-4 text-gray-400" />
            <p>公会功能开发中...</p>
          </div>
        </DraggablePanel>
      )}
      
      {panels.settings && (
        <DraggablePanel 
          title="设置" 
          onClose={() => closePanel('settings')}
          initialPosition={{ x: 500, y: 300 }}
        >
          <div className="text-white text-center py-8">
            <SettingOutlined className="text-4xl mb-4 text-gray-400" />
            <p>设置功能开发中...</p>
          </div>
        </DraggablePanel>
      )}
    </div>
  );
}

export default DashboardPage