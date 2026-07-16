import React, { useState } from 'react';

interface ExperienceBarProps {
  currentExp: number;
  maxExp: number;
  level: number;
}

const ExperienceBar: React.FC<ExperienceBarProps> = ({ currentExp, maxExp, level }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const expPercentage = (currentExp / maxExp) * 100;
  const filledSegments = Math.floor((currentExp / maxExp) * 10);
  const partialSegment = ((currentExp / maxExp) * 10) % 1;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 悬浮提示 */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-white text-sm shadow-xl">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-400">等级</div>
              <div className="text-lg font-bold text-yellow-400">{level}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">当前经验</div>
              <div className="text-sm font-semibold text-blue-400">{currentExp.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">升级所需</div>
              <div className="text-sm font-semibold text-green-400">{maxExp.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">还需经验</div>
              <div className="text-sm font-semibold text-red-400">{(maxExp - currentExp).toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">进度</div>
              <div className="text-sm font-semibold text-purple-400">{expPercentage.toFixed(1)}%</div>
            </div>
          </div>
          {/* 箭头 */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700"></div>
        </div>
      )}

      {/* 经验条容器 */}
      <div className="relative h-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-full overflow-hidden border border-gray-700/50">
        {/* 10个分段 */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: 10 }, (_, index) => {
            let segmentFill = 0;
            
            if (index < filledSegments) {
              segmentFill = 100;
            } else if (index === filledSegments) {
              segmentFill = partialSegment * 100;
            }

            return (
              <div key={index} className="flex-1 relative">
                {/* 分段背景 */}
                <div className="absolute inset-0 bg-gray-800/50"></div>
                
                {/* 分段进度 */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 transition-all duration-300 ease-out"
                  style={{ width: `${segmentFill}%` }}
                >
                  {/* 发光效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 via-purple-400/50 to-yellow-400/50 animate-pulse"></div>
                </div>
                
                {/* 分段分隔线 */}
                {index < 9 && (
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-600/80"></div>
                )}
                
                {/* 分段数字（仅在悬浮时显示） */}
                {isHovered && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/80">
                    {index + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 流光效果 */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"
            style={{
              left: `${expPercentage - 4}%`,
              animationDuration: '2s',
              animationDelay: '0.5s'
            }}
          ></div>
        </div>

        {/* 边框发光 */}
        <div className="absolute inset-0 rounded-full border border-blue-400/30 shadow-lg shadow-blue-500/20"></div>
      </div>

      {/* 等级显示 */}
      <div className="absolute left-4 bottom-2 transform -translate-y-1/2">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          Lv.{level}
        </div>
      </div>

      {/* 下一级显示 */}
      <div className="absolute right-4 bottom-2 transform -translate-y-1/2">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          Lv.{level + 1}
        </div>
      </div>
    </div>
  );
};

export default ExperienceBar;