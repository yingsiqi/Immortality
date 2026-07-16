import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary to-bg-secondary">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Result
          status="404"
          title="404"
          subTitle="抱歉，您访问的页面不存在"
          extra={
            <div className="space-x-4">
              <Button type="primary" onClick={() => navigate('/')}>
                返回首页
              </Button>
              <Button onClick={() => navigate(-1)}>
                返回上页
              </Button>
            </div>
          }
        />
        
        <div className="mt-8 text-text-secondary">
          <p>或许这个页面正在仙界修炼中...</p>
          <p className="text-sm mt-2">🌟 道路千万条，安全第一条 🌟</p>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage