import { apiClient } from './apiClient'
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  RefreshTokenResponse,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePasswordRequest,
  UpdateProfileRequest,
} from '@/types/auth'

class AuthService {
  private readonly endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
    changePassword: '/auth/change-password',
    resetPassword: '/auth/reset-password',
    resetPasswordConfirm: '/auth/reset-password/confirm',
    verifyEmail: '/auth/verify-email',
  }

  /**
   * 用户登录
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      this.endpoints.login,
      credentials
    )
    
    // 保存令牌到本地存储
    if (response.token) {
      this.setAuthToken(response.token)
    }
    
    return response
  }

  /**
   * 用户注册
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      this.endpoints.register,
      credentials
    )
    
    // 保存令牌到本地存储
    if (response.token) {
      this.setAuthToken(response.token)
    }
    
    return response
  }

  /**
   * 用户登出
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(this.endpoints.logout)
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      // 清除本地存储的令牌
      this.clearAuthToken()
    }
  }

  /**
   * 刷新访问令牌
   */
  async refreshToken(token: string): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(
      this.endpoints.refresh,
      { token }
    )
    
    // 更新令牌
    if (response.token) {
      this.setAuthToken(response.token)
    }
    
    return response
  }

  /**
   * 获取用户资料
   */
  async getProfile(): Promise<User> {
    return await apiClient.get<User>(this.endpoints.profile)
  }

  /**
   * 更新用户资料
   */
  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    return await apiClient.put<User>(this.endpoints.profile, data)
  }

  /**
   * 修改密码
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await apiClient.post(this.endpoints.changePassword, data)
  }

  /**
   * 请求密码重置
   */
  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    await apiClient.post(this.endpoints.resetPassword, data)
  }

  /**
   * 确认密码重置
   */
  async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    await apiClient.post(this.endpoints.resetPasswordConfirm, data)
  }

  /**
   * 验证邮箱
   */
  async verifyEmail(token: string): Promise<void> {
    await apiClient.post(this.endpoints.verifyEmail, { token })
  }

  /**
   * 设置认证令牌
   */
  private setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token)
    // 设置 API 客户端的默认认证头
    apiClient.setAuthToken(token)
  }

  /**
   * 清除认证令牌
   */
  private clearAuthToken(): void {
    localStorage.removeItem('auth_token')
    // 清除 API 客户端的认证头
    apiClient.clearAuthToken()
  }

  /**
   * 获取存储的认证令牌
   */
  getStoredToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  /**
   * 检查是否已认证
   */
  isAuthenticated(): boolean {
    const token = this.getStoredToken()
    if (!token) return false
    
    try {
      // 简单检查令牌是否过期
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Date.now() / 1000
      return payload.exp > now
    } catch {
      return false
    }
  }

  /**
   * 初始化认证状态
   */
  initializeAuth(): void {
    const token = this.getStoredToken()
    if (token && this.isAuthenticated()) {
      this.setAuthToken(token)
    } else {
      this.clearAuthToken()
    }
  }
}

export const authService = new AuthService()