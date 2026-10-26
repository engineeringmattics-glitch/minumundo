import React from 'react';
import { playStarSparkle } from '../utils/audio';

interface RainbowAndTitleProps {
  onStarClick?: () => void;
}

export const RainbowAndTitle: React.FC<RainbowAndTitleProps> = ({ onStarClick }) => {
  const handleStarClick = () => {
    playStarSparkle();
    if (onStarClick) onStarClick();
  };

  return (
    <div className="relative w-full flex flex-col items-center pt-2 select-none">
      {/* Background Soft Glow */}
      <div className="absolute top-0 w-72 h-36 bg-white/40 rounded-full blur-xl pointer-events-none" />

      {/* Rainbow Arc SVG */}
      <div className="relative w-[280px] h-[130px] flex items-center justify-center">
        <svg
          viewBox="0 0 280 140"
          className="w-full h-full overflow-visible drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Glow Halo */}
          <path
            d="M 30 135 A 110 110 0 0 1 250 135"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="38"
            strokeLinecap="round"
          />

          {/* Rainbow Rings (concentric smooth arcs matching screenshot) */}
          {/* 1. Pink Arch */}
          <path
            d="M 40 135 A 100 100 0 0 1 240 135"
            stroke="#FF7B90"
            strokeWidth="11"
            strokeLinecap="round"
          />

          {/* 2. Soft Peach/Yellow Arch */}
          <path
            d="M 52 135 A 88 88 0 0 1 228 135"
            stroke="#FFA767"
            strokeWidth="11"
            strokeLinecap="round"
          />

          {/* 3. Fresh Mint Turquoise Arch */}
          <path
            d="M 64 135 A 76 76 0 0 1 216 135"
            stroke="#00C4B4"
            strokeWidth="11"
            strokeLinecap="round"
          />

          {/* 4. Baby Blue Arch */}
          <path
            d="M 76 135 A 64 64 0 0 1 204 135"
            stroke="#7CB5FF"
            strokeWidth="11"
            strokeLinecap="round"
          />

          {/* Smiling Star Mascot (placed at center-left) */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-115 active:scale-95 group origin-center"
            transform="translate(108, 68)"
            onClick={handleStarClick}
          >
            {/* Star Body */}
            <path
              d="M 0 -18 
                 L 4.5 -6 
                 L 17 -5 
                 L 7.5 3 
                 L 11 15 
                 L 0 8 
                 L -11 15 
                 L -7.5 3 
                 L -17 -5 
                 L -4.5 -6 Z"
              fill="#FDC02F"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinejoin="round"
              className="drop-shadow-md"
            />
            {/* Soft Star Highlight */}
            <path
              d="M 0 -14 L 3 -5 L 12 -4 L 5 2 Z"
              fill="#FEE685"
              opacity="0.8"
            />
            {/* Cute Little Face */}
            <circle cx="-3" cy="-1" r="1.3" fill="#37271E" />
            <circle cx="3" cy="-1" r="1.3" fill="#37271E" />
            {/* Blushing cheeks */}
            <circle cx="-5" cy="1.5" r="1.2" fill="#F43F5E" opacity="0.75" />
            <circle cx="5" cy="1.5" r="1.2" fill="#F43F5E" opacity="0.75" />
            {/* Smile */}
            <path
              d="M -2 1.8 Q 0 3.8 2 1.8"
              stroke="#A1431A"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>

        {/* Floating Clouds near the rainbow */}
        <div className="absolute -left-6 top-10 pointer-events-none opacity-85 animate-float-slow">
          <svg width="68" height="36" viewBox="0 0 68 36" fill="none">
            <path
              d="M10 28 C6 28 2 24 2 20 C2 16 6 13 10 13 C12 7 19 3 27 3 C36 3 43 8 45 15 C49 14 55 17 56 21 C62 21 66 24 66 28 C66 32 62 35 57 35 L12 35 C7 35 10 28 10 28 Z"
              fill="white"
              fillOpacity="0.85"
            />
          </svg>
        </div>

        <div className="absolute -right-4 top-4 pointer-events-none opacity-90 animate-float">
          <svg width="74" height="40" viewBox="0 0 74 40" fill="none">
            <path
              d="M12 32 C7 32 3 27 3 22 C3 17 8 14 13 14 C15 8 23 4 32 4 C42 4 50 10 52 17 C56 16 63 19 64 24 C71 24 75 28 75 32 C75 37 70 40 65 40 L15 40 C9 40 12 32 12 32 Z"
              fill="white"
              fillOpacity="0.88"
            />
          </svg>
        </div>
      </div>

      {/* Main 3D Title "Mini Mundos!" matching the screenshot */}
      <div className="relative -mt-11 flex flex-col items-center z-10">
        {/* "Mini" */}
        <span
          className="font-kids font-bold text-[34px] tracking-tight leading-none text-[#FF4988] drop-shadow-sm select-none"
          style={{
            textShadow: '0 2px 0 #FFF, 0 -2px 0 #FFF, 2px 0 0 #FFF, -2px 0 0 #FFF, 0 3px 6px rgba(235, 68, 149, 0.35)',
            transform: 'rotate(-2deg) translateX(12px)',
          }}
        >
          Mini
        </span>

        {/* "Mundos!" in Bubbly Purple */}
        <span
          className="font-kids font-bold text-[48px] sm:text-[52px] tracking-tight leading-none text-[#6A40D6] select-none"
          style={{
            textShadow: `
              0 2px 0 #FFFFFF,
              0 -2px 0 #FFFFFF,
              2px 0 0 #FFFFFF,
              -2px 0 0 #FFFFFF,
              2px 2px 0 #FFFFFF,
              -2px -2px 0 #FFFFFF,
              0 5px 0 #4C1D95,
              0 8px 14px rgba(76, 29, 149, 0.32)
            `,
          }}
        >
          Mundos!
        </span>
      </div>

      {/* Pill subtitle: "Pequeños juegos, grandes descubrimientos" */}
      <div className="mt-2.5 z-10 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs shadow-purple-900/5 max-w-[90%] text-center">
        <p className="font-kids font-semibold text-[13px] sm:text-[14px] text-[#7E57C2] tracking-tight whitespace-nowrap">
          Pequeños juegos, grandes descubrimientos
        </p>
      </div>
    </div>
  );
};
