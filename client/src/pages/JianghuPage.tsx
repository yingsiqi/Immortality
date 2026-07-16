import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Card, Tabs, Input, Button, Tag, Select, Badge, Tooltip } from 'antd'
import { SendOutlined, EnvironmentOutlined, RestOutlined, ThunderboltOutlined } from '@ant-design/icons'

// 轻量前端演示版：本页不连接后端，仅用本地状态模拟“江湖聊天室 + 场景行走”
// 后端准备好后，可将本页的状态与事件对接到 Socket/REST

type Channel = 'scene' | 'world'

interface ChatMessage {
  id: string
  channel: Channel
  nickname: string
  content: string
  time: string
  system?: boolean
}

interface Entity {
  id: string
  name: string
  x: number
  y: number
  type: 'player' | 'monster'
}

const scenes = [
  { key: 'luoyang', name: '洛阳城' },
  { key: 'qingyun', name: '青云山' },
  { key: 'wangyou', name: '忘忧谷' },
]

const GRID_W = 20
const GRID_H = 12

const JianghuPage: React.FC = () => {
  // 场景 & 状态
  const [sceneKey, setSceneKey] = useState('luoyang')
  const sceneName = useMemo(() => scenes.find(s => s.key === sceneKey)?.name || '未知', [sceneKey])
  const [state, setState] = useState<'cultivate' | 'rest' | 'idle'>('idle')

  // 聊天
  const [activeChannel, setActiveChannel] = useState<Channel>('scene')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  // 实体（自己/他人/怪物）
  const [player, setPlayer] = useState<Entity>({ id: 'self', name: '你', x: 3, y: 5, type: 'player' })
  const [others, setOthers] = useState<Entity[]>([
    { id: 'p2', name: '剑九', x: 10, y: 4, type: 'player' },
    { id: 'p3', name: '无念', x: 15, y: 8, type: 'player' },
  ])
  const [monsters, setMonsters] = useState<Entity[]>([
    { id: 'm1', name: '野狼', x: 6, y: 2, type: 'monster' },
    { id: 'm2', name: '山贼', x: 12, y: 7, type: 'monster' },
  ])

  // 进入页面的系统欢迎消息
  useEffect(() => {
    pushSystemMsg(`你来到了「${sceneName}」`) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 自动滚动到聊天底部
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 定时让其他人/怪物随机游走（前端假数据）
  useEffect(() => {
    const t = setInterval(() => {
      setOthers(prev => prev.map(e => ({ ...e, x: clamp(e.x + randStep(), 0, GRID_W - 1), y: clamp(e.y + randStep(), 0, GRID_H - 1) })))
      setMonsters(prev => prev.map(e => ({ ...e, x: clamp(e.x + randStep(), 0, GRID_W - 1), y: clamp(e.y + randStep(), 0, GRID_H - 1) })))
    }, 1500)
    return () => clearInterval(t)
  }, [])

  // 切换场景（清少量消息 + 系统提示）
  const handleChangeScene = (key: string) => {
    setSceneKey(key)
    pushSystemMsg(`你来到了「${scenes.find(s => s.key === key)?.name}」`)
  }

  // 发送消息（当前频道）
  const handleSend = () => {
    if (!input.trim()) return
    const msg: ChatMessage = {
      id: `${Date.now()}`,
      channel: activeChannel,
      nickname: '你',
      content: input.trim(),
      time: new Date().toLocaleTimeString(),
    }
    setMessages(prev => [...prev, msg])
    setInput('')
  }

  // 点击地图移动
  const handleMapClick = (x: number, y: number) => {
    if (state === 'cultivate' || state === 'rest') return
    setPlayer(p => ({ ...p, x, y }))
    pushSystemMsg(`你移动到了（${x}, ${y}）`)
  }

  // 状态切换
  const changeState = (s: 'cultivate' | 'rest' | 'idle') => {
    setState(s)
    if (s === 'cultivate') pushSystemMsg('你盘膝入定，开始修炼。')
    if (s === 'rest') pushSystemMsg('你暂歇片刻，恢复精力。')
    if (s === 'idle') pushSystemMsg('你起身活动，四处闲逛。')
  }

  function pushSystemMsg(text: string) {
    setMessages(prev => [
      ...prev,
      { id: `${Date.now()}-sys`, channel: 'scene', nickname: '系统', content: text, time: new Date().toLocaleTimeString(), system: true },
    ])
  }

  return (
    <div className="p-4 h-full grid grid-cols-12 gap-4">
      {/* 左侧：聊天 */}
      <Card className="col-span-4 bg-black/40 border-white/10 text-white h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white/90 font-semibold">江湖聊天室</div>
          <Select
            value={sceneKey}
            onChange={handleChangeScene}
            size="small"
            className="w-32"
            options={scenes.map(s => ({ value: s.key, label: s.name }))}
          />
        </div>
        <Tabs
          activeKey={activeChannel}
          onChange={k => setActiveChannel(k as Channel)}
          items={[
            { key: 'scene', label: '场景频道', children: null },
            { key: 'world', label: '世界频道', children: null },
          ]}
        />
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {messages
            .filter(m => m.channel === activeChannel || m.system && activeChannel === 'scene')
            .slice(-200)
            .map(m => (
              <div key={m.id} className="text-sm">
                <span className="text-white/40">[{m.time}]</span>{' '}
                <span className={m.system ? 'text-amber-300' : 'text-sky-300'}>{m.nickname}:</span>{' '}
                <span className={m.system ? 'text-amber-200' : 'text-white/90'}>{m.content}</span>
              </div>
            ))}
          <div ref={chatEndRef} />
        </div>
        <div className="mt-2 flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onPressEnter={handleSend}
            placeholder={activeChannel === 'scene' ? '在场景中发言...' : '在世界频道发言...'}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>
            发送
          </Button>
        </div>
      </Card>

      {/* 右侧：场景 */}
      <Card className="col-span-8 bg-black/40 border-white/10 text-white h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="space-x-2">
            <Tag color="geekblue">{sceneName}</Tag>
            <Badge status={state === 'cultivate' ? 'processing' : state === 'rest' ? 'warning' : 'default'} text={stateText(state)} />
          </div>
          <div className="space-x-2">
            <Tooltip title="修炼：不允许移动，持续显示系统提示">
              <Button size="small" type={state === 'cultivate' ? 'primary' : 'default'} icon={<ThunderboltOutlined />} onClick={() => changeState('cultivate')}>
                修炼
              </Button>
            </Tooltip>
            <Tooltip title="休息：不允许移动">
              <Button size="small" type={state === 'rest' ? 'primary' : 'default'} icon={<RestOutlined />} onClick={() => changeState('rest')}>
                休息
              </Button>
            </Tooltip>
            <Tooltip title="闲逛：允许点击移动">
              <Button size="small" type={state === 'idle' ? 'primary' : 'default'} icon={<EnvironmentOutlined />} onClick={() => changeState('idle')}>
                闲逛
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* 简易栅格地图 */}
        <div className="relative flex-1 bg-slate-900/60 border border-white/10 rounded-md overflow-hidden">
          {Array.from({ length: GRID_H }).map((_, row) => (
            <div key={row} className="grid" style={{ gridTemplateColumns: `repeat(${GRID_W}, 1fr)` }}>
              {Array.from({ length: GRID_W }).map((__, col) => (
                <div
                  key={`${row}-${col}`}
                  className="h-8 border border-slate-800/60 hover:bg-slate-800/60 transition-colors cursor-pointer"
                  onClick={() => handleMapClick(col, row)}
                />
              ))}
            </div>
          ))}

          {/* 自己 */}
          <EntityDot entity={player} color="#22d3ee" label="你" />
          {/* 他人 */}
          {others.map(e => (
            <EntityDot key={e.id} entity={e} color="#a78bfa" />
          ))}
          {/* 怪物 */}
          {monsters.map(e => (
            <EntityDot key={e.id} entity={e} color="#f87171" />
          ))}
        </div>
      </Card>
    </div>
  )
}

function EntityDot({ entity, color, label }: { entity: Entity; color: string; label?: string }) {
  return (
    <div
      className="absolute text-xs"
      style={{ left: entity.x * 100 / GRID_W + '%', top: entity.y * 100 / GRID_H + '%', transform: 'translate(-50%, -50%)' }}
    >
      <div className="w-4 h-4 rounded-full" style={{ background: color }} />
      <div className="text-white/80 mt-1 text-center whitespace-nowrap">{label || entity.name}</div>
    </div>
  )
}

function randStep() { return Math.floor(Math.random() * 3) - 1 }
function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)) }
function stateText(s: 'cultivate' | 'rest' | 'idle') {
  if (s === 'cultivate') return '修炼中'
  if (s === 'rest') return '休息中'
  return '闲逛中'
}
export default JianghuPage