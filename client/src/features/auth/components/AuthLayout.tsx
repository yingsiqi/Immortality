import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const AuthLayout: React.FC = () => {
  const location = useLocation()
  const isLogin = location.pathname.includes('login')

  return (
    <div className="min-h-screen bg-gradient-cultivation flex items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 浮动的修仙元素 */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-40 h-40 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* 星光效果 */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo 和标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">永生</h1>
          <p className="text-white/80 text-sm">踏上修仙之路，追求永恒不朽</p>
        </motion.div>

        {/* 认证表单卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl"
        >
          {/* 标签页切换 */}
          <div className="flex mb-6 bg-white/5 rounded-lg p-1">
            <Link
              to="/auth/login"
              className={`flex-1 py-2 px-4 text-center text-sm font-medium rounded-md transition-all duration-200 ${
                isLogin
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              登录
            </Link>
            <Link
              to="/auth/register"
              className={`flex-1 py-2 px-4 text-center text-sm font-medium rounded-md transition-all duration-200 ${
                !isLogin
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              注册
            </Link>
          </div>

          {/* 表单内容 */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </motion.div>

        {/* 底部链接 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6"
        >
          <div className="flex items-center justify-center space-x-4 text-white/60 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              服务条款
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              隐私政策
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              帮助中心
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout