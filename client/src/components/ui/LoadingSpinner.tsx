import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large'
  tip?: string
  spinning?: boolean
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'default',
  tip,
  spinning = true,
  children,
  className = '',
  style,
}) => {
  // 自定义加载图标
  const customIcon = (
    <LoadingOutlined
      style={{
        fontSize: size === 'small' ? 16 : size === 'large' ? 32 : 24,
        color: '#4A90E2',
      }}
      spin
    />
  )

  // 如果有子元素，使用 Spin 包装
  if (children) {
    return (
      <Spin
        spinning={spinning}
        indicator={customIcon}
        tip={tip}
        size={size}
        className={className}
        style={style}
      >
        {children}
      </Spin>
    )
  }

  // 独立的加载指示器
  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      style={style}
    >
      <Spin
        indicator={customIcon}
        size={size}
      />
      {tip && (
        <div className="mt-3 text-sm text-text-secondary">
          {tip}
        </div>
      )}
    </div>
  )
}

// 修仙主题的加载动画组件
export const CultivationSpinner: React.FC<{
  size?: 'small' | 'default' | 'large'
  tip?: string
}> = ({ size = 'default', tip }) => {
  const sizeMap = {
    small: 'w-6 h-6',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeMap[size]} relative`}>
        {/* 外圈 */}
        <div className="absolute inset-0 border-2 border-primary-200 rounded-full animate-spin">
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-primary-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        {/* 内圈 */}
        <div className="absolute inset-1 border-2 border-secondary-200 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
          <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-secondary-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        {/* 中心点 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      {tip && (
        <div className="mt-3 text-sm text-text-secondary text-center">
          {tip}
        </div>
      )}
    </div>
  )
}

// 页面级加载组件
export const PageLoading: React.FC<{ tip?: string }> = ({ tip = '加载中...' }) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-cultivation">
      <div className="text-center">
        <CultivationSpinner size="large" />
        <div className="mt-4 text-white text-lg font-medium">
          {tip}
        </div>
      </div>
    </div>
  )
}

// 内容加载组件
export const ContentLoading: React.FC<{ tip?: string }> = ({ tip = '加载中...' }) => {
  return (
    <div className="py-12 flex items-center justify-center">
      <CultivationSpinner tip={tip} />
    </div>
  )
}

export default LoadingSpinner