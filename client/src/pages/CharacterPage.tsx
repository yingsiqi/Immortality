import React from 'react'
import { Card, Row, Col, Avatar, Progress, Tabs, Button, Tag, Divider } from 'antd'
import {
  UserOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  BulbOutlined,
  HeartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { CultivationRealmNames } from '@/types/auth'

const CharacterPage: React.FC = () => {
  const { user } = useAuthStore()

  // 模拟角色属性数据
  const characterStats = {
    health: { current: 850, max: 1000 },
    mana: { current: 650, max: 800 },
    attack: 245,
    defense: 180,
    speed: 120,
    luck: 85,
  }

  const equipment = {
    weapon: { name: '青云剑', quality: 'rare', level: 15 },
    armor: { name: '玄铁护甲', quality: 'uncommon', level: 12 },
    accessory: { name: '灵力护符', quality: 'epic', level: 8 },
  }

  const skills = [
    { name: '九转玄功', level: 8, progress: 75, type: 'cultivation' },
    { name: '御剑术', level: 5, progress: 40, type: 'combat' },
    { name: '炼丹术', level: 3, progress: 20, type: 'crafting' },
  ]

  const getQualityColor = (quality: string) => {
    const colors = {
      common: '#95a5a6',
      uncommon: '#27ae60',
      rare: '#3498db',
      epic: '#9b59b6',
      legendary: '#f39c12',
      mythic: '#e74c3c',
    }
    return colors[quality as keyof typeof colors] || colors.common
  }

  const tabItems = [
    {
      key: 'attributes',
      label: '属性面板',
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="基础属性" size="small">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <HeartOutlined className="text-error-500 mr-2" />
                    生命值
                  </span>
                  <span className="font-medium">
                    {characterStats.health.current} / {characterStats.health.max}
                  </span>
                </div>
                <Progress
                  percent={(characterStats.health.current / characterStats.health.max) * 100}
                  strokeColor="#e74c3c"
                  showInfo={false}
                />
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <ThunderboltOutlined className="text-primary-500 mr-2" />
                    灵力值
                  </span>
                  <span className="font-medium">
                    {characterStats.mana.current} / {characterStats.mana.max}
                  </span>
                </div>
                <Progress
                  percent={(characterStats.mana.current / characterStats.mana.max) * 100}
                  strokeColor="#4a90e2"
                  showInfo={false}
                />
              </div>
            </Card>
          </Col>
          
          <Col xs={24} md={12}>
            <Card title="战斗属性" size="small">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-bg-secondary rounded-lg">
                  <BulbOutlined className="text-error-500 text-xl mb-2" />
                  <div className="text-lg font-bold">{characterStats.attack}</div>
                  <div className="text-xs text-text-secondary">攻击力</div>
                </div>
                <div className="text-center p-3 bg-bg-secondary rounded-lg">
                  <SafetyOutlined className="text-primary-500 text-xl mb-2" />
                  <div className="text-lg font-bold">{characterStats.defense}</div>
                  <div className="text-xs text-text-secondary">防御力</div>
                </div>
                <div className="text-center p-3 bg-bg-secondary rounded-lg">
                  <ThunderboltOutlined className="text-warning-500 text-xl mb-2" />
                  <div className="text-lg font-bold">{characterStats.speed}</div>
                  <div className="text-xs text-text-secondary">敏捷</div>
                </div>
                <div className="text-center p-3 bg-bg-secondary rounded-lg">
                  <StarOutlined className="text-success-500 text-xl mb-2" />
                  <div className="text-lg font-bold">{characterStats.luck}</div>
                  <div className="text-xs text-text-secondary">幸运</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'equipment',
      label: '装备信息',
      children: (
        <Row gutter={[16, 16]}>
          {Object.entries(equipment).map(([slot, item]) => (
            <Col xs={24} sm={8} key={slot}>
              <Card size="small" className="text-center">
                <div className="mb-3">
                  <div className="w-16 h-16 mx-auto bg-bg-secondary rounded-lg flex items-center justify-center mb-2">
                    {slot === 'weapon' && <BulbOutlined className="text-2xl" style={{ color: getQualityColor(item.quality) }} />}
                    {slot === 'armor' && <SafetyOutlined className="text-2xl" style={{ color: getQualityColor(item.quality) }} />}
                    {slot === 'accessory' && <StarOutlined className="text-2xl" style={{ color: getQualityColor(item.quality) }} />}
                  </div>
                  <Tag color={getQualityColor(item.quality)} className="mb-1">
                    {item.quality.toUpperCase()}
                  </Tag>
                </div>
                <div className="font-medium mb-1">{item.name}</div>
                <div className="text-sm text-text-secondary">等级 {item.level}</div>
              </Card>
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: 'skills',
      label: '技能修炼',
      children: (
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <Card key={index} size="small">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{skill.name}</span>
                  <Tag color={skill.type === 'cultivation' ? 'blue' : skill.type === 'combat' ? 'red' : 'green'}>
                    {skill.type === 'cultivation' ? '修炼' : skill.type === 'combat' ? '战斗' : '生活'}
                  </Tag>
                </div>
                <span className="text-sm text-text-secondary">等级 {skill.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress
                  percent={skill.progress}
                  size="small"
                  className="flex-1"
                  strokeColor={{
                    '0%': '#4A90E2',
                    '100%': '#8E44AD',
                  }}
                />
                <Button size="small" type="primary">
                  修炼
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      {/* 角色基本信息 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="mb-6">
          <div className="flex items-center space-x-6">
            <Avatar
              size={100}
              src={user?.avatar}
              className="bg-gradient-cultivation"
            >
              {user?.nickname?.[0] || user?.username?.[0]}
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">
                {user?.nickname || user?.username}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-text-secondary">境界</div>
                  <div className="font-medium text-primary-500">
                    {CultivationRealmNames[user?.realm as keyof typeof CultivationRealmNames] || '凡人'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">等级</div>
                  <div className="font-medium">{user?.level || 1}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">灵力</div>
                  <div className="font-medium text-secondary-500">{user?.spiritual_power || 0}</div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">经验</div>
                  <div className="font-medium text-warning-500">{user?.experience || 0}</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button type="primary">修改资料</Button>
                <Button>重置属性</Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 详细信息标签页 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <Tabs items={tabItems} size="large" />
        </Card>
      </motion.div>
    </div>
  )
}

export default CharacterPage