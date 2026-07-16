import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import type { LoginCredentials } from '@/types/auth'

const LoginPage: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { login, isLoading, error, clearError, mockLogin } = useAuthStore()
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (values: LoginCredentials & { remember_me: boolean }) => {
    try {
      clearError()
      await login({
        username: values.username,
        password: values.password,
        remember_me: values.remember_me,
      })
      
      message.success('登录成功！')
      navigate('/game', { replace: true })
    } catch (error) {
      message.error(error instanceof Error ? error.message : '登录失败')
    }
  }

  const handleForgotPassword = () => {
    message.info('密码重置功能即将上线')
  }

  const handleMockLogin = () => {
    mockLogin()
    message.success('演示登录成功！')
    navigate('/game', { replace: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">欢迎回来</h2>
        <p className="text-white/70 text-sm">继续你的修仙之旅</p>
      </div>

      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        autoComplete="off"
        size="large"
        className="space-y-4"
      >
        {/* 用户名输入框 */}
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名或邮箱' },
            { min: 3, message: '用户名至少3个字符' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-white/50" />}
            placeholder="用户名或邮箱"
            className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:border-white/40 focus:border-primary-400"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        </Form.Item>

        {/* 密码输入框 */}
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="密码"
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone className="text-white/50" />
              ) : (
                <EyeInvisibleOutlined className="text-white/50" />
              )
            }
            className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:border-white/40 focus:border-primary-400"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        </Form.Item>

        {/* 记住我和忘记密码 */}
        <div className="flex items-center justify-between">
          <Form.Item name="remember_me" valuePropName="checked" className="mb-0">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="text-white/70"
            >
              <span className="text-white/70 text-sm">记住我</span>
            </Checkbox>
          </Form.Item>
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-primary-300 hover:text-primary-200 text-sm transition-colors"
          >
            忘记密码？
          </button>
        </div>

        {/* 错误提示 */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-error-500/20 border border-error-500/30 rounded-lg p-3"
          >
            <p className="text-error-200 text-sm">{error}</p>
          </motion.div>
        )}

        {/* 登录按钮 */}
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full h-12 bg-primary-500 hover:bg-primary-600 border-none text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
            }}
          >
            {isLoading ? '登录中...' : '登录'}
          </Button>
        </Form.Item>

        {/* 演示登录按钮 */}
        <Form.Item className="mb-0 mt-3">
          <Button
            type="default"
            onClick={handleMockLogin}
            className="w-full h-12 bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/50 text-amber-200 font-medium rounded-lg transition-all duration-200"
          >
            🎮 演示登录（无需后端）
          </Button>
        </Form.Item>
      </Form>

      {/* 注册链接 */}
      <div className="text-center mt-6">
        <span className="text-white/60 text-sm">还没有账号？</span>
        <Link
          to="/auth/register"
          className="text-primary-300 hover:text-primary-200 text-sm ml-1 transition-colors"
        >
          立即注册
        </Link>
      </div>

      {/* 第三方登录 */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/60">或者使用</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg bg-white/5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
            onClick={() => message.info('微信登录即将上线')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18z"/>
            </svg>
            <span className="ml-2">微信</span>
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-lg bg-white/5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
            onClick={() => message.info('QQ登录即将上线')}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
            <span className="ml-2">QQ</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default LoginPage