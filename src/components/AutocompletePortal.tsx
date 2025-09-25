'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface AutocompletePortalProps {
  children: React.ReactNode;
  show: boolean;
  anchorRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
}

export default function AutocompletePortal({
  children,
  show,
  anchorRef,
  onClose
}: AutocompletePortalProps) {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  // 确保只在客户端运行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 创建和清理 portal 容器
  useEffect(() => {
    if (!isClient) return;

    // 创建 portal 容器
    if (!portalRef.current) {
      portalRef.current = document.createElement('div');
      portalRef.current.style.position = 'fixed';
      portalRef.current.style.top = '0';
      portalRef.current.style.left = '0';
      portalRef.current.style.width = '100%';
      portalRef.current.style.height = '100%';
      portalRef.current.style.pointerEvents = 'none';
      portalRef.current.style.zIndex = '9999';
      portalRef.current.setAttribute('data-portal', 'autocomplete');
      document.body.appendChild(portalRef.current);
    }

    // 组件卸载时清理
    return () => {
      if (portalRef.current && document.body.contains(portalRef.current)) {
        try {
          document.body.removeChild(portalRef.current);
        } catch (error) {
          console.warn('Portal cleanup error:', error);
        }
        portalRef.current = null;
      }
    };
  }, [isClient]);

  // 处理点击外部关闭
  useEffect(() => {
    if (!show || !isClient) return;

    const handleMouseDownOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // 检查点击是否在输入框或下拉列表内
      if (anchorRef.current && anchorRef.current.contains(target)) {
        return;
      }
      
      if (portalRef.current && portalRef.current.contains(target)) {
        return;
      }
      
      onClose();
    };

    const handleTouchStartOutside = (event: TouchEvent) => {
      const target = event.target as Node;
      
      if (anchorRef.current && anchorRef.current.contains(target)) {
        return;
      }
      
      if (portalRef.current && portalRef.current.contains(target)) {
        return;
      }
      
      onClose();
    };

    // 延迟添加事件监听器，避免立即触发
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleMouseDownOutside);
      document.addEventListener('touchstart', handleTouchStartOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleMouseDownOutside);
      document.removeEventListener('touchstart', handleTouchStartOutside);
    };
  }, [show, anchorRef, onClose, isClient]);

  // 计算位置
  useEffect(() => {
    if (!show || !anchorRef.current || !isClient) return;

    const updatePosition = () => {
      if (!anchorRef.current) return;

      const inputRect = anchorRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let top = inputRect.bottom + 4; // 4px间距
      let left = inputRect.left;
      const width = inputRect.width;

      // 检查是否会超出视窗底部
      const dropdownHeight = 300; // 预估高度
      if (top + dropdownHeight > viewportHeight) {
        // 如果上方空间足够，显示在输入框上方
        if (inputRect.top > dropdownHeight + 4) {
          top = inputRect.top - dropdownHeight - 4;
        }
      }

      // 确保不超出左右边界
      if (left < 10) {
        left = 10;
      } else if (left + width > viewportWidth - 10) {
        left = viewportWidth - width - 10;
      }

      setPosition({
        top: top + window.scrollY,
        left: left + window.scrollX,
        width
      });
    };

    updatePosition();

    // 使用 requestAnimationFrame 优化性能
    let rafId: number;
    const throttledUpdate = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    // 监听滚动和窗口大小变化
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('resize', throttledUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('resize', throttledUpdate);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [show, anchorRef, isClient]);

  // 如果不在客户端或不显示，返回 null
  if (!isClient || !show || !portalRef.current) {
    return null;
  }

  // 创建定位容器
  const positionedContainer = (
    <div
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        pointerEvents: 'auto',
        zIndex: 999999
      }}
    >
      {children}
    </div>
  );

  return createPortal(positionedContainer, portalRef.current);
}