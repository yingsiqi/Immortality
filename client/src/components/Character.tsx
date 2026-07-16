import React, { useState, useEffect } from 'react';

interface CharacterProps {
  isMoving: boolean;
  direction: 'up' | 'down' | 'left' | 'right' | 'idle';
}

const Character: React.FC<CharacterProps> = ({ isMoving, direction }) => {
  const [animationFrame, setAnimationFrame] = useState(0);

  // 动画帧控制
  useEffect(() => {
    if (!isMoving) {
      setAnimationFrame(0);
      return;
    }

    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 4);
    }, 200);

    return () => clearInterval(interval);
  }, [isMoving]);

  // 根据方向和动画帧计算角色朝向
  const getCharacterTransform = () => {
    const baseTransform = 'translate(-50%, -50%)';
    switch (direction) {
      case 'left':
        return `${baseTransform} scaleX(-1)`;
      case 'right':
        return baseTransform;
      case 'up':
      case 'down':
      default:
        return baseTransform;
    }
  };

  // 获取动画偏移
  const getAnimationOffset = () => {
    if (!isMoving) return 0;
    return Math.sin(animationFrame * Math.PI / 2) * 2;
  };

  return (
    <div 
      className="fixed top-1/2 left-1/2 z-50 pointer-events-none"
      style={{
        transform: getCharacterTransform(),
        marginTop: `${getAnimationOffset()}px`
      }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80">
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700"/>
            <stop offset="50%" stopColor="#ffed4e"/>
            <stop offset="100%" stopColor="#ffc107"/>
          </linearGradient>
          <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a90e2"/>
            <stop offset="50%" stopColor="#357abd"/>
            <stop offset="100%" stopColor="#2c5aa0"/>
          </linearGradient>
          <radialGradient id="glowEffect" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* 阴影 */}
        <ellipse cx="40" cy="75" rx="25" ry="5" fill="#000000" opacity="0.2"/>
        
        {/* 发光效果 */}
        <circle cx="40" cy="40" r="35" fill="url(#glowEffect)"/>
        
        {/* 身体 */}
        <ellipse cx="40" cy="50" rx="18" ry="25" fill="url(#robeGrad)"/>
        
        {/* 腰带 */}
        <rect x="25" y="45" width="30" height="4" fill="#8b4513" rx="2"/>
        <circle cx="40" cy="47" r="3" fill="#ffd700"/>
        
        {/* 手臂 */}
        <ellipse 
          cx={isMoving && (direction === 'left' || direction === 'right') ? "32" : "30"} 
          cy="42" 
          rx="6" 
          ry="15" 
          fill="url(#robeGrad)"
          transform={`rotate(${isMoving ? animationFrame * 10 - 20 : -10} 30 42)`}
        />
        <ellipse 
          cx={isMoving && (direction === 'left' || direction === 'right') ? "48" : "50"} 
          cy="42" 
          rx="6" 
          ry="15" 
          fill="url(#robeGrad)"
          transform={`rotate(${isMoving ? -animationFrame * 10 + 20 : 10} 50 42)`}
        />
        
        {/* 手 */}
        <circle 
          cx={isMoving && (direction === 'left' || direction === 'right') ? "28" : "26"} 
          cy={isMoving ? "52" : "50"} 
          r="4" 
          fill="url(#bodyGrad)"
        />
        <circle 
          cx={isMoving && (direction === 'left' || direction === 'right') ? "52" : "54"} 
          cy={isMoving ? "52" : "50"} 
          r="4" 
          fill="url(#bodyGrad)"
        />
        
        {/* 腿部 */}
        <ellipse 
          cx="35" 
          cy={isMoving ? "65" : "63"} 
          rx="5" 
          ry="12" 
          fill="url(#robeGrad)"
          transform={`rotate(${isMoving ? animationFrame * 15 - 7.5 : 0} 35 63)`}
        />
        <ellipse 
          cx="45" 
          cy={isMoving ? "65" : "63"} 
          rx="5" 
          ry="12" 
          fill="url(#robeGrad)"
          transform={`rotate(${isMoving ? -animationFrame * 15 + 7.5 : 0} 45 63)`}
        />
        
        {/* 脚 */}
        <ellipse cx="33" cy="72" rx="4" ry="6" fill="#654321"/>
        <ellipse cx="47" cy="72" rx="4" ry="6" fill="#654321"/>
        
        {/* 头部 */}
        <circle cx="40" cy="25" r="12" fill="url(#bodyGrad)"/>
        
        {/* 头发 */}
        <path d="M28,20 Q40,10 52,20 Q50,15 45,12 Q40,8 35,12 Q30,15 28,20" fill="#8b4513"/>
        
        {/* 眼睛 */}
        <circle cx="36" cy="23" r="2" fill="#000000"/>
        <circle cx="44" cy="23" r="2" fill="#000000"/>
        <circle cx="36.5" cy="22.5" r="0.5" fill="#ffffff"/>
        <circle cx="44.5" cy="22.5" r="0.5" fill="#ffffff"/>
        
        {/* 嘴巴 */}
        <path d="M38,28 Q40,30 42,28" stroke="#000000" strokeWidth="1" fill="none"/>
        
        {/* 武器 - 法杖 */}
        <line x1="60" y1="20" x2="60" y2="55" stroke="#8b4513" strokeWidth="3"/>
        <circle cx="60" cy="18" r="5" fill="#4169e1" opacity="0.8"/>
        <circle cx="60" cy="18" r="3" fill="#87ceeb" opacity="0.6"/>
        
        {/* 魔法光效 */}
        {isMoving && (
          <g opacity="0.7">
            <circle cx="60" cy="18" r="8" fill="none" stroke="#4169e1" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1s" repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="18" r="6" fill="none" stroke="#87ceeb" strokeWidth="1" opacity="0.7">
              <animate attributeName="r" values="6;10;6" dur="0.8s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="0.8s" repeatCount="indefinite"/>
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
};

export default Character;