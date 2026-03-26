import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const updateHoverState = (e) => {
      // Scale up when hovering over any text, link, or button
      const hoverElement = e.target.closest('h1, h2, h3, h4, p, span, a, button, li, input, textarea');
      setIsHovering(!!hoverElement);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      document.body.style.cursor = 'auto';
      if (document.head.contains(style)) document.head.removeChild(style);
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <>
      <div className="hidden md:block pointer-events-none z-[9999]">
        <div 
          className={`fixed top-0 left-0 rounded-full transition-all duration-300 ease-out mix-blend-difference bg-white pointer-events-none`}
          style={{ 
            width: isHovering ? '80px' : '16px',
            height: isHovering ? '80px' : '16px',
            transform: `translate(${position.x - (isHovering ? 40 : 8)}px, ${position.y - (isHovering ? 40 : 8)}px)`,
            opacity: position.x === 0 && position.y === 0 ? 0 : 1
          }}
        ></div>
      </div>
    </>
  );
}
