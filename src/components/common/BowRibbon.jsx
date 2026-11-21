import React from 'react';

/**
 * 🎀 Delicate Coquette Ribbon Bow SVG Component
 */
export default function BowRibbon({ 
  className = "", 
  size = 48, 
  color = "#E88EAD",
  accentColor = "#9D4268" 
}) {
  return (
    <svg 
      width={size} 
      height={size * 0.75} 
      viewBox="0 0 100 75" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block transition-transform hover:scale-110 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8C8DC" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
        <filter id="bowShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#9D4268" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Left Tail */}
      <path 
        d="M 44 42 C 38 52 28 66 18 72 C 24 64 26 56 28 46 Z" 
        fill="url(#bowGrad)" 
        filter="url(#bowShadow)"
      />
      {/* Right Tail */}
      <path 
        d="M 56 42 C 62 52 72 66 82 72 C 76 64 74 56 72 46 Z" 
        fill="url(#bowGrad)" 
        filter="url(#bowShadow)"
      />

      {/* Left Loop */}
      <path 
        d="M 48 38 C 30 20 6 12 10 32 C 14 46 36 42 48 40 Z" 
        fill="url(#bowGrad)" 
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.2"
        filter="url(#bowShadow)"
      />
      {/* Left Loop Inner Fold */}
      <path 
        d="M 40 36 C 28 28 18 24 16 32 C 15 37 25 39 36 38" 
        stroke="rgba(157, 66, 104, 0.45)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />

      {/* Right Loop */}
      <path 
        d="M 52 38 C 70 20 94 12 90 32 C 86 46 64 42 52 40 Z" 
        fill="url(#bowGrad)" 
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.2"
        filter="url(#bowShadow)"
      />
      {/* Right Loop Inner Fold */}
      <path 
        d="M 60 36 C 72 28 82 24 84 32 C 85 37 75 39 64 38" 
        stroke="rgba(157, 66, 104, 0.45)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />

      {/* Center Knot */}
      <ellipse 
        cx="50" 
        cy="39" 
        rx="7" 
        ry="8.5" 
        fill={accentColor}
        stroke="#FFF"
        strokeWidth="1.2"
      />
      {/* Center highlight */}
      <ellipse 
        cx="49" 
        cy="37" 
        rx="3" 
        ry="4" 
        fill="rgba(255, 255, 255, 0.45)" 
      />
    </svg>
  );
}
