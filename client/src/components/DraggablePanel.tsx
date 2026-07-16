import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface DraggablePanelProps {
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  onClose: () => void;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
}

const DraggablePanel: React.FC<DraggablePanelProps> = ({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  onClose,
  width = 400,
  height = 500,
  minWidth = 300,
  minHeight = 200
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width, height });
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // 拖拽处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-handle')) {
      setIsDragging(true);
      const rect = panelRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  // 调整大小处理
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y));
        setPosition({ x: newX, y: newY });
      }
      
      if (isResizing) {
        const rect = panelRef.current?.getBoundingClientRect();
        if (rect) {
          const newWidth = Math.max(minWidth, e.clientX - rect.left);
          const newHeight = Math.max(minHeight, e.clientY - rect.top);
          setSize({ width: newWidth, height: newHeight });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, size.width, size.height, minWidth, minHeight]);

  return (
    <div
      ref={panelRef}
      className="fixed bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl z-40 overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* 标题栏 */}
      <div
        className="drag-handle flex items-center justify-between p-3 bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-b border-gray-700 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          {title}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white hover:bg-red-600/20 p-1 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* 内容区域 */}
      <div className="p-4 h-full overflow-auto" style={{ height: size.height - 60 }}>
        {children}
      </div>

      {/* 调整大小手柄 */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-600/50 hover:bg-gray-500/70 transition-colors"
        onMouseDown={handleResizeMouseDown}
      >
        <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400"></div>
      </div>

      {/* 边框发光效果 */}
      <div className="absolute inset-0 rounded-lg border border-blue-500/20 pointer-events-none"></div>
    </div>
  );
};

export default DraggablePanel;