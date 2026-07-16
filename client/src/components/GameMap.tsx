import React, { useState, useRef, useEffect } from 'react';

interface GameMapProps {
  onMapClick: (x: number, y: number) => void;
}

const GameMap: React.FC<GameMapProps> = ({ onMapClick }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  // 处理鼠标滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  // 处理地图点击
  const handleMapClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / scale;
    const y = (e.clientY - rect.top - rect.height / 2) / scale;
    onMapClick(x, y);
  };

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const moveSpeed = 20;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setPosition(prev => ({ ...prev, y: prev.y + moveSpeed }));
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setPosition(prev => ({ ...prev, y: prev.y - moveSpeed }));
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setPosition(prev => ({ ...prev, x: prev.x + moveSpeed }));
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setPosition(prev => ({ ...prev, x: prev.x - moveSpeed }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      ref={mapRef}
      className="fixed inset-0 overflow-hidden cursor-crosshair"
      onWheel={handleWheel}
      onClick={handleMapClick}
    >
      <div 
        className="absolute inset-0 transition-transform duration-200"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {/* 2.5D 俯视角地图 SVG */}
        <svg 
          width="2000" 
          height="2000" 
          viewBox="0 0 2000 2000"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          {/* 地面基础层 */}
          <defs>
            <pattern id="grassPattern" patternUnits="userSpaceOnUse" width="40" height="40">
              <rect width="40" height="40" fill="#4a7c59"/>
              <circle cx="10" cy="10" r="2" fill="#5a8c69"/>
              <circle cx="30" cy="25" r="1.5" fill="#6a9c79"/>
              <circle cx="20" cy="35" r="1" fill="#5a8c69"/>
            </pattern>
            <pattern id="stonePattern" patternUnits="userSpaceOnUse" width="60" height="60">
              <rect width="60" height="60" fill="#8b7355"/>
              <polygon points="10,10 20,5 30,10 25,20 15,20" fill="#9b8365"/>
              <polygon points="35,25 45,20 55,25 50,35 40,35" fill="#7b6345"/>
            </pattern>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b5b73"/>
              <stop offset="50%" stopColor="#5b4b63"/>
              <stop offset="100%" stopColor="#4b3b53"/>
            </linearGradient>
          </defs>

          {/* 地面 */}
          <rect width="2000" height="2000" fill="url(#grassPattern)"/>
          
          {/* 石头路径 */}
          <path d="M200,200 Q500,300 800,200 T1400,300 L1600,500 Q1500,700 1200,800 T600,900 L400,700 Z" 
                fill="url(#stonePattern)" opacity="0.8"/>
          
          {/* 山脉背景 */}
          <polygon points="0,0 300,0 400,200 200,300 0,200" fill="url(#mountainGrad)" opacity="0.6"/>
          <polygon points="1600,0 2000,0 2000,400 1700,300 1500,100" fill="url(#mountainGrad)" opacity="0.7"/>
          <polygon points="0,1600 200,1400 400,1500 300,1800 0,2000" fill="url(#mountainGrad)" opacity="0.5"/>
          
          {/* 树木 */}
          {Array.from({ length: 50 }, (_, i) => {
            const x = (i * 137.5) % 1800 + 100;
            const y = (i * 234.7) % 1800 + 100;
            const size = 20 + (i % 15);
            return (
              <g key={i} transform={`translate(${x}, ${y})`}>
                {/* 树干 */}
                <rect x="-3" y="10" width="6" height="15" fill="#8b4513"/>
                {/* 树冠 */}
                <circle cx="0" cy="0" r={size} fill="#228b22" opacity="0.8"/>
                <circle cx="-5" cy="-5" r={size * 0.7} fill="#32cd32" opacity="0.6"/>
                <circle cx="5" cy="-3" r={size * 0.5} fill="#90ee90" opacity="0.4"/>
              </g>
            );
          })}
          
          {/* 建筑物 */}
          <g transform="translate(800, 600)">
            {/* 城堡 */}
            <rect x="-60" y="-40" width="120" height="80" fill="#696969" stroke="#2f4f4f" strokeWidth="2"/>
            <polygon points="-60,-40 0,-80 60,-40" fill="#8b0000"/>
            <rect x="-50" y="-30" width="20" height="30" fill="#2f4f4f"/>
            <rect x="30" y="-30" width="20" height="30" fill="#2f4f4f"/>
            <rect x="-10" y="-20" width="20" height="40" fill="#654321"/>
          </g>
          
          <g transform="translate(400, 1200)">
            {/* 村庄 */}
            <rect x="-30" y="-20" width="60" height="40" fill="#daa520" stroke="#8b4513" strokeWidth="1"/>
            <polygon points="-30,-20 0,-40 30,-20" fill="#8b4513"/>
            <rect x="-5" y="-10" width="10" height="20" fill="#654321"/>
          </g>
          
          {/* 水域 */}
          <ellipse cx="1200" cy="1400" rx="200" ry="100" fill="#4682b4" opacity="0.7"/>
          <ellipse cx="1180" cy="1380" rx="150" ry="70" fill="#87ceeb" opacity="0.5"/>
          
          {/* 装饰性元素 */}
          {Array.from({ length: 20 }, (_, i) => {
            const x = (i * 89.3) % 1900 + 50;
            const y = (i * 156.7) % 1900 + 50;
            return (
              <circle key={`rock-${i}`} cx={x} cy={y} r="8" fill="#708090" opacity="0.6"/>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default GameMap;