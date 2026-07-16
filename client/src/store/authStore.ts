import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '@/services/authService'
import type { User, LoginCredentials, RegisterCredentials } from '@/types/auth'

interface AuthState {
  // 状态
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // 操作
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
  setLoading: (loading: boolean) => void
  refreshToken: () => Promise<void>
  updateUser: (user: Partial<User>) => void
  // 临时模拟登录（用于演示）
  mockLogin: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 登录
      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await authService.login(credentials)
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : '登录失败',
          })
        }
      },

      // 注册
      register: async (credentials: RegisterCredentials) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await authService.register(credentials)
          
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : '注册失败',
          })
        }
      },

      // 登出
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      },

      // 清除错误
      clearError: () => {
        set({ error: null })
      },

      // 设置加载状态
      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      // 刷新令牌
      refreshToken: async () => {
        try {
          const { token } = get()
          if (!token) return
          
          set({ isLoading: true })
          
          const response = await authService.refreshToken(token)
          
          set({
            token: response.token,
            isLoading: false,
          })
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : '令牌刷新失败',
          })
        }
      },

      // 更新用户信息
      updateUser: (userData: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({
            user: { ...user, ...userData },
          })
        }
      },

      // 临时模拟登录功能（用于演示，无需后端）
      mockLogin: () => {
        const mockUser: User = {
          id: 'demo-user-001',
          username: 'DemoPlayer',
          email: 'demo@immortality.game',
          avatar: null,
          roles: ['player'],
          isEmailVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        
        set({
          user: mockUser,
          token: 'demo-token-' + Date.now(),
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)