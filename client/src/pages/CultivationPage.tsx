import React, { useState } from 'react'
import { Card, Row, Col, Button, Progress, Tabs, Modal, Slider, message, Statistic, Tag } from 'antd'
import {
  ThunderboltOutlined,
  FireOutlined,
  CloudOutlined,
  StarOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  TrophyOutlined,
  GiftOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { CultivationRealmNames } from '@/types/auth'

const CultivationPage: React.FC = () => {
  const { user } = useAuthStore()
  const [isCultivating, setIsCultivating] = useState(false)
  const [cultivationTime, setCultivationTime] = useState(0)
  const [selectedTechnique, setSelectedTechnique] = useState('basic')
  const [showTechniqueModal, setShowTechniqueModal] = useState(false)

  // 模拟修炼数据
  const cultivationData = {
    currentRealm: user?.realm || 'mortal',
    currentLevel: user?.level || 1,
    currentExp: user?.experience || 0,
    expToNext: 1000,
    spiritualPower: user?.spiritual_power || 100,
    maxSpiritualPower: 500,
    cultivationSpeed: 1.2,
    todayCultivationTime: 120, // 分钟
    totalCultivationTime: 2400, // 分钟
  }

  const techniques = [
    {
      id: 'basic',
      name: '基础吐纳术',
      level: 8,
      efficiency: 1.0,
      description: '最基础的修炼功法，适合初学者',
      requirements: '无',
      unlocked: true,
    },
    {
      id: 'advanced',
      name: '九转玄功',
      level: 3,
      efficiency: 1.5,
      description: '高级修炼功法，修炼效率更高',
      requirements: '筑基期以上',
      unlocked: user?.realm !== 'mortal',
    },
    {
      id: 'supreme',
      name: '太上忘情诀',
      level: 1,
      efficiency: 2.0,
      description: '顶级修炼功法，需要极高的悟性',
      requirements: '金丹期以上',
      unlocked: false,
    },
  ]

  const achievements = [
    { name: '初入仙途', description: '完成第一次修炼', completed: true, reward: '灵石 x10' },
    { name: '勤修不辍', description: '连续修炼7天', completed: true, reward: '修炼加速符 x1' },
    { name: '境界突破', description: '成功突破到筑基期', completed: false, reward: '筑基丹 x1' },
    { name: '修炼大师', description: '累计修炼100小时', completed: false, reward: '神秘宝箱 x1' },
  ]

  const handleStartCultivation = () => {
    if (cultivationData.spiritualPower < 10) {
      message.warning('灵力不足，无法开始修炼')
      return
    }
    setIsCultivating(true)
    message.success('开始修炼，愿道友修为精进！')
  }

  const handleStopCultivation = () => {
    setIsCultivating(false)
    message.info(`本次修炼结束，共修炼 ${cultivationTime} 分钟`)
    setCultivationTime(0)
  }

  const tabItems = [
    {
      key: 'cultivation',
      label: '修炼面板',
      children: (
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="修炼状态" className="mb-4">
              <div className="text-center py-8">
                <div className="relative inline-block">
                  <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-4 ${
                    isCultivating 
                      ? 'border-primary-500 bg-primary-50 cultivation-glow' 
                      : 'border-border-color bg-bg-secondary'
                  }`}>
                    {isCultivating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <ThunderboltOutlined className="text-4xl text-primary-500" />
                      </motion.div>
                    ) : (
                      <CloudOutlined className="text-4xl text-text-secondary" />
                    )}
                  </div>
                  {isCultivating && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Tag color="processing">修炼中...</Tag>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="text-lg font-medium">
                    当前功法: {techniques.find(t => t.id === selectedTechnique)?.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    修炼效率: {techniques.find(t => t.id === selectedTechnique)?.efficiency}x
                  </div>
                </div>
                
                <div className="mt-6 space-x-4">
                  {!isCultivating ? (
                    <Button
                      type="primary"
                      size="large"
                      icon={<PlayCircleOutlined />}
                      onClick={handleStartCultivation}
                      className="bg-gradient-cultivation"
                    >
                      开始修炼
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      icon={<PauseCircleOutlined />}
                      onClick={handleStopCultivation}
                    >
                      停止修炼
                    </Button>
                  )}
                  <Button
                    size="large"
                    onClick={() => setShowTechniqueModal(true)}
                  >
                    切换功法
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card title="修炼进度">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>境界进度</span>
                    <span>{cultivationData.currentExp} / {cultivationData.expToNext}</span>
                  </div>
                  <Progress
                    percent={(cultivationData.currentExp / cultivationData.expToNext) * 100}
                    strokeColor={{
                      '0%': '#4A90E2',
                      '100%': '#8E44AD',
                    }}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>灵力值</span>
                    <span>{cultivationData.spiritualPower} / {cultivationData.maxSpiritualPower}</span>
                  </div>
                  <Progress
                    percent={(cultivationData.spiritualPower / cultivationData.maxSpiritualPower) * 100}
                    strokeColor="#52c41a"
                  />
                </div>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            <Card title="修炼统计" className="mb-4">
              <div className="space-y-4">
                <Statistic
                  title="今日修炼时长"
                  value={cultivationData.todayCultivationTime}
                  suffix="分钟"
                  prefix={<FireOutlined />}
                />
                <Statistic
                  title="总修炼时长"
                  value={cultivationData.totalCultivationTime}
                  suffix="分钟"
                  prefix={<StarOutlined />}
                />
                <Statistic
                  title="修炼效率"
                  value={cultivationData.cultivationSpeed}
                  suffix="x"
                  precision={1}
                  prefix={<ThunderboltOutlined />}
                />
              </div>
            </Card>
            
            <Card title="境界信息">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500 mb-2">
                  {CultivationRealmNames[cultivationData.currentRealm as keyof typeof CultivationRealmNames]}
                </div>
                <div className="text-lg mb-4">第 {cultivationData.currentLevel} 层</div>
                <div className="text-sm text-text-secondary">
                  距离下一境界还需 {cultivationData.expToNext - cultivationData.currentExp} 经验
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'techniques',
      label: '功法秘籍',
      children: (
        <Row gutter={[16, 16]}>
          {techniques.map((technique) => (
            <Col xs={24} md={8} key={technique.id}>
              <Card
                className={`${selectedTechnique === technique.id ? 'border-primary-500' : ''} ${
                  !technique.unlocked ? 'opacity-50' : 'cursor-pointer'
                }`}
                onClick={() => technique.unlocked && setSelectedTechnique(technique.id)}
              >
                <div className="text-center">
                  <div className="text-lg font-bold mb-2">{technique.name}</div>
                  <div className="text-sm text-text-secondary mb-3">{technique.description}</div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>等级:</span>
                      <span className="font-medium">{technique.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>效率:</span>
                      <span className="font-medium text-primary-500">{technique.efficiency}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>需求:</span>
                      <span className="text-sm">{technique.requirements}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    {technique.unlocked ? (
                      selectedTechnique === technique.id ? (
                        <Tag color="success">当前使用</Tag>
                      ) : (
                        <Button size="small" type="primary" ghost>
                          选择功法
                        </Button>
                      )
                    ) : (
                      <Tag color="default">未解锁</Tag>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: 'achievements',
      label: '修炼成就',
      children: (
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <Card key={index} size="small">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.completed ? 'bg-success-500' : 'bg-bg-secondary'
                  }`}>
                    <TrophyOutlined className={achievement.completed ? 'text-white' : 'text-text-secondary'} />
                  </div>
                  <div>
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-text-secondary">{achievement.description}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <GiftOutlined className="text-warning-500" />
                    <span className="text-sm">{achievement.reward}</span>
                  </div>
                  <Tag color={achievement.completed ? 'success' : 'default'}>
                    {achievement.completed ? '已完成' : '未完成'}
                  </Tag>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="mb-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-text bg-clip-text text-transparent">
              修炼系统
            </h1>
            <p className="text-text-secondary">
              道法自然，修身养性，追求长生不老之道
            </p>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <Tabs items={tabItems} size="large" />
        </Card>
      </motion.div>

      {/* 功法选择弹窗 */}
      <Modal
        title="选择修炼功法"
        open={showTechniqueModal}
        onCancel={() => setShowTechniqueModal(false)}
        footer={null}
        width={600}
      >
        <div className="space-y-4">
          {techniques.map((technique) => (
            <Card
              key={technique.id}
              size="small"
              className={`${selectedTechnique === technique.id ? 'border-primary-500' : ''} ${
                !technique.unlocked ? 'opacity-50' : 'cursor-pointer'
              }`}
              onClick={() => {
                if (technique.unlocked) {
                  setSelectedTechnique(technique.id)
                  setShowTechniqueModal(false)
                  message.success(`已切换到 ${technique.name}`)
                }
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{technique.name}</div>
                  <div className="text-sm text-text-secondary">{technique.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-primary-500 font-medium">{technique.efficiency}x</div>
                  <div className="text-xs text-text-secondary">效率</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default CultivationPage