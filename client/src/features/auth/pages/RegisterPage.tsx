import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message, Progress } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import type { RegisterCredentials } from '@/types/auth'

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { register, isLoading, error, clearError } = useAuthStore()
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // 密码强度检测
  const checkPasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return Math.min(strength, 100)
  }

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength < 25) return '#ff4d4f'
    if (strength < 50) return '#faad14'
    if (strength < 75) return '#1890ff'
    return '#52c41a'
  }

  const getPasswordStrengthText = (strength: number): string => {
    if (strength < 25) return '弱'
    if (strength < 50) return '一般'
    if (strength < 75) return '良好'
    return '强'
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setPasswordStrength(checkPasswordStrength(password))
  }

  const handleSubmit = async (values: RegisterCredentials & { agree_terms: boolean }) => {
    try {
      clearError()
      
      if (!values.agree_terms) {
        message.error('请同意服务条款和隐私政策')
        return
      }

      if (values.password !== values.confirm_password) {
        message.error('两次输入的密码不一致')
        return
      }

      await register({
        username: values.username,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
        nickname: values.nickname,
        agree_terms: values.agree_terms,
      })
      
      message.success('注册成功！欢迎加入修仙世界')
      navigate('/game', { replace: true })
    } catch (error) {
      message.error(error instanceof Error ? error.message : '注册失败')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">开始修仙之旅</h2>
        <p className="text-white/70 text-sm">创建你的修仙账号</p>
      </div>

      <Form
        form={form}
        name="register"
        onFinish={handleSubmit}
        autoComplete="off"
        size="large"
        className="space-y-4"
        scrollToFirstError
      >
        {/* 用户名输入框 */}
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, max: 20, message: '用户名长度为3-20个字符' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-white/50" />}
            placeholder="用户名（3-20个字符）"
            className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:border-white/40 focus:border-primary-400"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        </Form.Item>

        {/* 昵称输入框 */}
        <Form.Item
          name="nickname"
          rules={[
            { required: true, message: '请输入昵称' },
            { min: 2, max: 10, message: '昵称长度为2-10个字符' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-white/50" />}
            placeholder="昵称（游戏中显示的名字）"
            className="bg-white/10 border-white/20 text-white placeholder-white/50 hover:border-white/40 focus:border-primary-400"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        </Form.Item>

        {/* 邮箱输入框 */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱地址' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-white/50" />}
            placeholder="邮箱地址"
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
            placeholder="密码（至少6个字符）"
            onChange={handlePasswordChange}
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

        {/* 密码强度指示器 */}
        {passwordStrength > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/60 text-xs">密码强度</span>
              <span className="text-white/60 text-xs">
                {getPasswordStrengthText(passwordStrength)}
              </span>
            </div>
            <Progress
              percent={passwordStrength}
              strokeColor={getPasswordStrengthColor(passwordStrength)}
              trailColor="rgba(255, 255, 255, 0.1)"
              showInfo={false}
              size="small"
            />
          </div>
        )}

        {/* 确认密码输入框 */}
        <Form.Item
          name="confirm_password"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次输入的密码不一致'))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="确认密码"
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

        {/* 同意条款 */}
        <Form.Item
          name="agree_terms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('请同意服务条款')),
            },
          ]}
        >
          <Checkbox
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="text-white/70"
          >
            <span className="text-white/70 text-sm">
              我已阅读并同意
              <Link to="#" className="text-primary-300 hover:text-primary-200 mx-1">
                服务条款
              </Link>
              和
              <Link to="#" className="text-primary-300 hover:text-primary-200 mx-1">
                隐私政策
              </Link>
            </span>
          </Checkbox>
        </Form.Item>

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

        {/* 注册按钮 */}
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full h-12 bg-secondary-500 hover:bg-secondary-600 border-none text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #8E44AD 0%, #732D91 100%)',
            }}
          >
            {isLoading ? '注册中...' : '创建账号'}
          </Button>
        </Form.Item>
      </Form>

      {/* 登录链接 */}
      <div className="text-center mt-6">
        <span className="text-white/60 text-sm">已有账号？</span>
        <Link
          to="/auth/login"
          className="text-primary-300 hover:text-primary-200 text-sm ml-1 transition-colors"
        >
          立即登录
        </Link>
      </div>
    </motion.div>
  )
}

export default RegisterPage