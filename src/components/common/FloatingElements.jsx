import React, { useMemo } from 'react';

/**
 * 🌸 Ambient Floating Hearts, Sparkles & Bows
 * Renders subtle, lightweight floating elements in background
 */
export default function FloatingElements() {
  const elements = useMemo(() => {
    const items = [];
    const symbols = ['♡', '✨', '🌸', '🎀', '⋆', '💕'];
    
    // 16 gentle floating items spread across screen
    for (let i = 0; i < 16; i++) {
      items.push({
        id: i,
        symbol: symbols[i % symbols.length],
        left: `${(i * 6.2 + 3) % 96}%`,
        top: `${(i * 11 + 5) % 92}%`,
        size: 14 + (i % 4) * 6,
        delay: (i * 0.7) % 5,
        duration: 7 + (i % 5) * 2,
        opacity: 0.25 + (i % 3) * 0.15,
      });
    }
    return items;
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0" 
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      {elements.map((el) => (
        <span
          key={el.id}
          style={{
            position: 'absolute',
            left: el.left,
            top: el.top,
            fontSize: `${el.size}px`,
            opacity: el.opacity,
            color: '#E88EAD',
            animation: `floatGentle ${el.duration}s ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
            textShadow: '0 0 10px rgba(248, 200, 220, 0.8)',
            transformOrigin: 'center center',
          }}
        >
          {el.symbol}
        </span>
      ))}
    </div>
  );
}
