// 用户基础信息
export interface User {
  id: string
  username: string
  email: string
  nickname: string
  avatar?: string
  level: number
  experience: number
  cultivation_level: string
  realm: string
  spiritual_power: number
  created_at: string
  updated_at: string
  last_login_at?: string
  is_active: boolean
  is_verified: boolean
}

// 登录凭据
export interface LoginCredentials {
  username: string
  password: string
  remember_me?: boolean
}

// 注册凭据
export interface RegisterCredentials {
  username: string
  email: string
  password: string
  confirm_password: string
  nickname: string
  agree_terms: boolean
}

// 认证响应
export interface AuthResponse {
  user: User
  token: string
  refresh_token: string
  expires_in: number
}

// 令牌刷新响应
export interface RefreshTokenResponse {
  token: string
  user: User
  expires_in: number
}

// 密码重置请求
export interface PasswordResetRequest {
  email: string
}

// 密码重置确认
export interface PasswordResetConfirm {
  token: string
  new_password: string
  confirm_password: string
}

// 修改密码
export interface ChangePasswordRequest {
  current_password: string
  new_password: string
  confirm_password: string
}

// 用户资料更新
export interface UpdateProfileRequest {
  nickname?: string
  email?: string
  avatar?: string
}

// 认证错误类型
export interface AuthError {
  code: string
  message: string
  details?: Record<string, string[]>
}

// JWT 令牌载荷
export interface JWTPayload {
  user_id: string
  username: string
  exp: number
  iat: number
  type: 'access' | 'refresh'
}

// 认证状态枚举
export enum AuthStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  ERROR = 'error',
}

// 用户角色枚举
export enum UserRole {
  PLAYER = 'player',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

// 修炼境界枚举
export enum CultivationRealm {
  MORTAL = 'mortal',
  QI_REFINING = 'qi_refining',
  FOUNDATION = 'foundation',
  CORE_FORMATION = 'core_formation',
  NASCENT_SOUL = 'nascent_soul',
  SOUL_TRANSFORMATION = 'soul_transformation',
  VOID_REFINEMENT = 'void_refinement',
  BODY_INTEGRATION = 'body_integration',
  MAHAYANA = 'mahayana',
  TRIBULATION = 'tribulation',
  IMMORTAL = 'immortal',
}

// 修炼境界显示名称映射
export const CultivationRealmNames: Record<CultivationRealm, string> = {
  [CultivationRealm.MORTAL]: '凡人',
  [CultivationRealm.QI_REFINING]: '练气期',
  [CultivationRealm.FOUNDATION]: '筑基期',
  [CultivationRealm.CORE_FORMATION]: '结丹期',
  [CultivationRealm.NASCENT_SOUL]: '元婴期',
  [CultivationRealm.SOUL_TRANSFORMATION]: '化神期',
  [CultivationRealm.VOID_REFINEMENT]: '炼虚期',
  [CultivationRealm.BODY_INTEGRATION]: '合体期',
  [CultivationRealm.MAHAYANA]: '大乘期',
  [CultivationRealm.TRIBULATION]: '渡劫期',
  [CultivationRealm.IMMORTAL]: '仙人',
}