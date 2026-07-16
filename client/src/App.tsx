import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useAuthStore } from '@/store/authStore'
import AuthLayout from '@/features/auth/components/AuthLayout'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import GameLayout from '@/components/layout/GameLayout'
import DashboardPage from '@/pages/DashboardPage'
import CharacterPage from '@/pages/CharacterPage'
import CultivationPage from '@/pages/CultivationPage'
import InventoryPage from '@/pages/InventoryPage'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import JianghuPage from '@/pages/JianghuPage'

// Ant Design 主题配置
const antdTheme = {
  token: {
    colorPrimary: '#4A90E2',
    colorSuccess: '#27AE60',
    colorWarning: '#F39C12',
    colorError: '#E74C3C',
    borderRadius: 8,
    fontFamily: 'PingFang SC, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, SimSun, 宋体, sans-serif',
  },
}

function App() {
  const { isAuthenticated, isLoading } = useAuthStore()

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-cultivation">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <div className="h-full">
        <Routes>
          {/* 认证相关路由 */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route index element={<Navigate to="login" replace />} />
          </Route>

          {/* 游戏主界面路由 */}
          <Route
            path="/game"
            element={
              isAuthenticated ? (
                <GameLayout />
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="character" element={<CharacterPage />} />
            <Route path="cultivation" element={<CultivationPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="jianghu" element={<JianghuPage />} />
          </Route>

          {/* 默认重定向 */}
          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated ? "/game" : "/auth/login"}
                replace
              />
            }
          />

          {/* 404 页面 */}
          <Route
            path="*"
            element={
              <div className="h-full flex items-center justify-center bg-gradient-cultivation">
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-lg mb-8">页面未找到</p>
                  <button
                    onClick={() => window.history.back()}
                    className="btn-primary"
                  >
                    返回上一页
                  </button>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </ConfigProvider>
  )
}

export default App