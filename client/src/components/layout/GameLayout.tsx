import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Progress, Button, Tooltip, Modal } from 'antd'
import {
  UserOutlined,
  ThunderboltOutlined,
  ShopOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  TeamOutlined,
  BookOutlined,
  TrophyOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  SoundOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { CultivationRealmNames } from '@/types/auth'

const GameLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [settingsVisible, setSettingsVisible] = useState(false)

  // 功能按钮配置
  const functionButtons = [
    {
      key: 'character',
      icon: <UserOutlined />,
      label: '角色',
      path: '/game/character',
      color: '#4A90E2',
    },
    {
      key: 'cultivation',
      icon: <ThunderboltOutlined />,
      label: '修炼',
      path: '/game/cultivation',
      color: '#9B59B6',
    },
    {
      key: 'inventory',
      icon: <ShopOutlined />,
      label: '背包',
      path: '/game/inventory',
      color: '#E67E22',
    },
    {
      key: 'jianghu',
      icon: <MessageOutlined />,
      label: '江湖',
      path: '/game/jianghu',
      color: '#1ABC9C',
    },
    {
      key: 'skills',
      icon: <BookOutlined />,
      label: '技能',
      path: '/game/skills',
      color: '#27AE60',
    },
    {
      key: 'guild',
      icon: <TeamOutlined />,
      label: '宗门',
      path: '/game/guild',
      color: '#E74C3C',
    },
    {
      key: 'achievements',
      icon: <TrophyOutlined />,
      label: '成就',
      path: '/game/achievements',
      color: '#F39C12',
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: '帮助',
      path: '/game/help',
      color: '#95A5A6',
    },
  ]

  function handleLogout() {
    logout()
    navigate('/auth/login', { replace: true })
  }

  const handleFunctionClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="h-full w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-purple-900/20 to-blue-900/30 opacity-50"></div>
      
      {/* 左上角角色信息面板 */}
      <div className="absolute top-4 left-4 z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/60 backdrop-blur-sm rounded-lg p-4 border border-white/10 min-w-[280px]"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Avatar
              size={48}
              src={user?.avatar}
              className="bg-gradient-cultivation border-2 border-white/20"
            >
              {user?.nickname?.[0] || user?.username?.[0]}
            </Avatar>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">
                {user?.nickname || user?.username}
              </div>
              <div className="text-yellow-400 text-xs">
                {CultivationRealmNames[user?.realm as keyof typeof CultivationRealmNames] || '凡人'}
              </div>
              <div className="text-cyan-400 text-xs">
                等级 {user?.level || 1}
              </div>
            </div>
          </div>
          
          {/* 血量条 */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>生命值</span>
              <span>1000/1000</span>
            </div>
            <Progress
              percent={100}
              strokeColor="#ef4444"
              trailColor="rgba(239, 68, 68, 0.2)"
              showInfo={false}
              size="small"
            />
          </div>
          
          {/* 法力条 */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>灵力值</span>
              <span>{user?.spiritual_power || 0}/500</span>
            </div>
            <Progress
              percent={((user?.spiritual_power || 0) / 500) * 100}
              strokeColor="#3b82f6"
              trailColor="rgba(59, 130, 246, 0.2)"
              showInfo={false}
              size="small"
            />
          </div>
        </motion.div>
      </div>
      
      {/* 右上角设置和通知 */}
      <div className="absolute top-4 right-4 z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-2"
        >
          <Tooltip title="通知">
            <Button
              type="text"
              icon={<BellOutlined />}
              className="bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10"
              size="large"
            />
          </Tooltip>
          <Tooltip title="音效">
            <Button
              type="text"
              icon={<SoundOutlined />}
              className="bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10"
              size="large"
            />
          </Tooltip>
          <Tooltip title="设置">
            <Button
              type="text"
              icon={<SettingOutlined />}
              onClick={() => setSettingsVisible(true)}
              className="bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10"
              size="large"
            />
          </Tooltip>
          <Tooltip title="退出游戏">
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="bg-black/60 backdrop-blur-sm border border-white/10 text-red-400 hover:bg-red-500/20"
              size="large"
            />
          </Tooltip>
        </motion.div>
      </div>
      
      {/* 右侧功能面板 */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10"
        >
          <div className="grid grid-cols-2 gap-3">
            {functionButtons.map((button, index) => (
              <motion.div
                key={button.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Tooltip title={button.label} placement="left">
                  <Button
                    type="text"
                    icon={button.icon}
                    onClick={() => handleFunctionClick(button.path)}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/10 transition-all duration-200 ${
                      location.pathname === button.path ? 'bg-white/20 border-white/30' : ''
                    }`}
                    style={{
                      backgroundColor: location.pathname === button.path ? `${button.color}20` : undefined,
                      borderColor: location.pathname === button.path ? `${button.color}60` : undefined,
                      color: location.pathname === button.path ? button.color : undefined,
                    }}
                  />
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* 底部经验条 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10"
        >
          <div className="flex justify-between text-xs text-white/80 mb-2">
            <span>经验值</span>
            <span>{user?.experience || 0} / 1000</span>
          </div>
          <Progress
            percent={((user?.experience || 0) / 1000) * 100}
            strokeColor={{
              '0%': '#fbbf24',
              '100%': '#f59e0b',
            }}
            trailColor="rgba(251, 191, 36, 0.2)"
            showInfo={false}
            strokeWidth={8}
          />
          <div className="text-center text-xs text-yellow-400 mt-1">
            距离下一级还需 {1000 - (user?.experience || 0)} 经验
          </div>
        </motion.div>
      </div>
      
      {/* 中央主画面区域 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl max-h-[600px] bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
      
      {/* 设置面板 */}
      <Modal
        title="游戏设置"
        open={settingsVisible}
        onCancel={() => setSettingsVisible(false)}
        footer={null}
        width={600}
        className="game-settings-modal"
      >
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-medium mb-2">画面设置</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>画质</span>
                <select className="border rounded px-2 py-1">
                  <option>高</option>
                  <option>中</option>
                  <option>低</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span>特效</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-medium mb-2">音效设置</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>主音量</span>
                <input type="range" min="0" max="100" defaultValue="80" className="w-32" />
              </div>
              <div className="flex justify-between items-center">
                <span>音效音量</span>
                <input type="range" min="0" max="100" defaultValue="60" className="w-32" />
              </div>
              <div className="flex justify-between items-center">
                <span>背景音乐</span>
                <input type="range" min="0" max="100" defaultValue="40" className="w-32" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">游戏设置</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>自动战斗</span>
                <input type="checkbox" />
              </div>
              <div className="flex justify-between items-center">
                <span>显示伤害数字</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex justify-between items-center">
                <span>自动拾取</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default GameLayout