import React, { useState } from 'react'
import { Card, Row, Col, Tabs, Button, Modal, Input, Select, Tag, Tooltip, Badge, Empty, Pagination } from 'antd'
import {
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  DeleteOutlined,
  StarOutlined,
  ShopOutlined,
  GiftOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Search } = Input
const { Option } = Select

interface InventoryItem {
  id: string
  name: string
  type: 'weapon' | 'armor' | 'consumable' | 'material' | 'treasure'
  quality: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic'
  level?: number
  quantity: number
  description: string
  value: number
  canUse: boolean
  canSell: boolean
}

const InventoryPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterQuality, setFilterQuality] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showItemDetail, setShowItemDetail] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  // 模拟背包数据
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: '青云剑',
      type: 'weapon',
      quality: 'rare',
      level: 15,
      quantity: 1,
      description: '传说中的仙剑，蕴含强大的灵力，攻击力+245',
      value: 5000,
      canUse: true,
      canSell: true,
    },
    {
      id: '2',
      name: '回灵丹',
      type: 'consumable',
      quality: 'uncommon',
      quantity: 25,
      description: '恢复灵力的丹药，使用后立即恢复500点灵力',
      value: 100,
      canUse: true,
      canSell: true,
    },
    {
      id: '3',
      name: '玄铁矿石',
      type: 'material',
      quality: 'common',
      quantity: 50,
      description: '炼器的基础材料，可用于制作武器和防具',
      value: 10,
      canUse: false,
      canSell: true,
    },
    {
      id: '4',
      name: '龙鳞护甲',
      type: 'armor',
      quality: 'epic',
      level: 20,
      quantity: 1,
      description: '用真龙鳞片制成的护甲，防御力+380，附带火焰抗性',
      value: 15000,
      canUse: true,
      canSell: true,
    },
    {
      id: '5',
      name: '九转金丹',
      type: 'consumable',
      quality: 'legendary',
      quantity: 3,
      description: '传说中的仙丹，服用后可直接提升一个小境界',
      value: 50000,
      canUse: true,
      canSell: false,
    },
    {
      id: '6',
      name: '凤凰羽毛',
      type: 'treasure',
      quality: 'mythic',
      quantity: 1,
      description: '神兽凤凰的羽毛，蕴含重生之力，极其珍贵',
      value: 100000,
      canUse: false,
      canSell: false,
    },
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

  const getTypeIcon = (type: string) => {
    const icons = {
      weapon: '⚔️',
      armor: '🛡️',
      consumable: '🧪',
      material: '⛏️',
      treasure: '💎',
    }
    return icons[type as keyof typeof icons] || '📦'
  }

  const getQualityText = (quality: string) => {
    const texts = {
      common: '普通',
      uncommon: '优秀',
      rare: '稀有',
      epic: '史诗',
      legendary: '传说',
      mythic: '神话',
    }
    return texts[quality as keyof typeof texts] || '未知'
  }

  const getTypeText = (type: string) => {
    const texts = {
      weapon: '武器',
      armor: '防具',
      consumable: '消耗品',
      material: '材料',
      treasure: '珍宝',
    }
    return texts[type as keyof typeof texts] || '其他'
  }

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase())
    const matchesTab = selectedTab === 'all' || item.type === selectedTab
    const matchesQuality = !filterQuality || item.quality === filterQuality
    return matchesSearch && matchesTab && matchesQuality
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'quality':
        const qualityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic']
        return qualityOrder.indexOf(b.quality) - qualityOrder.indexOf(a.quality)
      case 'value':
        return b.value - a.value
      case 'quantity':
        return b.quantity - a.quantity
      default:
        return 0
    }
  })

  const paginatedItems = sortedItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleItemClick = (item: InventoryItem) => {
    setSelectedItem(item)
    setShowItemDetail(true)
  }

  const handleUseItem = (item: InventoryItem) => {
    console.log('使用物品:', item.name)
    setShowItemDetail(false)
  }

  const handleSellItem = (item: InventoryItem) => {
    console.log('出售物品:', item.name)
    setShowItemDetail(false)
  }

  const tabItems = [
    { key: 'all', label: '全部' },
    { key: 'weapon', label: '武器' },
    { key: 'armor', label: '防具' },
    { key: 'consumable', label: '消耗品' },
    { key: 'material', label: '材料' },
    { key: 'treasure', label: '珍宝' },
  ]

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-text bg-clip-text text-transparent">
                背包系统
              </h1>
              <p className="text-text-secondary">
                管理你的装备、道具和珍宝
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{inventoryItems.length}</div>
              <div className="text-sm text-text-secondary">物品总数</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 搜索和筛选 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="mb-6">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8}>
              <Search
                placeholder="搜索物品名称"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col xs={12} sm={4}>
              <Select
                placeholder="品质筛选"
                value={filterQuality}
                onChange={setFilterQuality}
                allowClear
                className="w-full"
              >
                <Option value="common">普通</Option>
                <Option value="uncommon">优秀</Option>
                <Option value="rare">稀有</Option>
                <Option value="epic">史诗</Option>
                <Option value="legendary">传说</Option>
                <Option value="mythic">神话</Option>
              </Select>
            </Col>
            <Col xs={12} sm={4}>
              <Select
                placeholder="排序方式"
                value={sortBy}
                onChange={setSortBy}
                className="w-full"
              >
                <Option value="name">名称</Option>
                <Option value="quality">品质</Option>
                <Option value="value">价值</Option>
                <Option value="quantity">数量</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8}>
              <div className="flex space-x-2">
                <Button icon={<FilterOutlined />}>高级筛选</Button>
                <Button icon={<SortAscendingOutlined />}>批量操作</Button>
              </div>
            </Col>
          </Row>
        </Card>
      </motion.div>

      {/* 物品分类标签 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="mb-6">
          <Tabs
            activeKey={selectedTab}
            onChange={setSelectedTab}
            items={tabItems}
            size="large"
          />
        </Card>
      </motion.div>

      {/* 物品网格 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          {paginatedItems.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {paginatedItems.map((item) => (
                  <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        size="small"
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => handleItemClick(item)}
                        style={{ borderColor: getQualityColor(item.quality) }}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{getTypeIcon(item.type)}</div>
                          <div className="font-medium mb-1 truncate" title={item.name}>
                            {item.name}
                          </div>
                          <div className="flex justify-center mb-2">
                            <Tag color={getQualityColor(item.quality)} className="text-xs">
                              {getQualityText(item.quality)}
                            </Tag>
                          </div>
                          {item.level && (
                            <div className="text-xs text-text-secondary mb-1">
                              等级 {item.level}
                            </div>
                          )}
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-text-secondary">数量</span>
                            <Badge count={item.quantity} showZero className="text-xs" />
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
              
              {sortedItems.length > pageSize && (
                <div className="mt-6 text-center">
                  <Pagination
                    current={currentPage}
                    total={sortedItems.length}
                    pageSize={pageSize}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                    showQuickJumper
                    showTotal={(total, range) => `第 ${range[0]}-${range[1]} 项，共 ${total} 项`}
                  />
                </div>
              )}
            </>
          ) : (
            <Empty
              description="暂无物品"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </Card>
      </motion.div>

      {/* 物品详情弹窗 */}
      <Modal
        title="物品详情"
        open={showItemDetail}
        onCancel={() => setShowItemDetail(false)}
        footer={null}
        width={500}
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-2">{getTypeIcon(selectedItem.type)}</div>
              <h3 className="text-xl font-bold mb-2">{selectedItem.name}</h3>
              <div className="flex justify-center space-x-2 mb-4">
                <Tag color={getQualityColor(selectedItem.quality)}>
                  {getQualityText(selectedItem.quality)}
                </Tag>
                <Tag>{getTypeText(selectedItem.type)}</Tag>
                {selectedItem.level && <Tag>等级 {selectedItem.level}</Tag>}
              </div>
            </div>
            
            <div className="bg-bg-secondary p-4 rounded-lg">
              <p className="text-text-secondary">{selectedItem.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-bg-secondary rounded-lg">
                <div className="text-lg font-bold">{selectedItem.quantity}</div>
                <div className="text-sm text-text-secondary">数量</div>
              </div>
              <div className="text-center p-3 bg-bg-secondary rounded-lg">
                <div className="text-lg font-bold text-warning-500">{selectedItem.value}</div>
                <div className="text-sm text-text-secondary">价值</div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {selectedItem.canUse && (
                <Button
                  type="primary"
                  className="flex-1"
                  onClick={() => handleUseItem(selectedItem)}
                >
                  使用
                </Button>
              )}
              {selectedItem.canSell && (
                <Button
                  className="flex-1"
                  icon={<ShopOutlined />}
                  onClick={() => handleSellItem(selectedItem)}
                >
                  出售
                </Button>
              )}
              <Button icon={<StarOutlined />}>收藏</Button>
              <Button icon={<DeleteOutlined />} danger>丢弃</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default InventoryPage