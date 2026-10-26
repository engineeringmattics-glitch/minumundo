import React, { useState } from 'react';
import { playPop, playStarSparkle } from '../utils/audio';

interface KidsCharactersProps {
  onInteract?: (who: 'boy' | 'girl') => void;
  interactive?: boolean;
}

export const KidsCharacters: React.FC<KidsCharactersProps> = ({
  onInteract,
  interactive = true,
}) => {
  const [boyMood, setBoyMood] = useState<'normal' | 'wave' | 'wink'>('normal');
  const [girlMood, setGirlMood] = useState<'normal' | 'giggle' | 'wink'>('normal');

  const handleBoyClick = () => {
    if (!interactive) return;
    playPop(520);
    setBoyMood((prev) => (prev === 'normal' ? 'wave' : 'normal'));
    if (onInteract) onInteract('boy');
    setTimeout(() => setBoyMood('normal'), 1800);
  };

  const handleGirlClick = () => {
    if (!interactive) return;
    playStarSparkle();
    setGirlMood((prev) => (prev === 'normal' ? 'giggle' : 'normal'));
    if (onInteract) onInteract('girl');
    setTimeout(() => setGirlMood('normal'), 1800);
  };

  return (
    <div className="relative w-full max-w-[340px] h-[190px] mx-auto select-none">
      {/* Interactive tip if hovered */}
      {interactive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-white/90 text-purple-700 text-[11px] font-bold px-2 py-0.5 rounded-full shadow pointer-events-none whitespace-nowrap z-30">
          ¡Tócanos para saludarnos! 👋
        </div>
      )}

      {/* SVG Container for the characters and grass */}
      <svg
        viewBox="0 0 340 190"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="boyShirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#438EFF" />
            <stop offset="100%" stopColor="#2F6FE4" />
          </linearGradient>

          <linearGradient id="girlShirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6BB2" />
            <stop offset="100%" stopColor="#EB4595" />
          </linearGradient>

          <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7CD97D" />
            <stop offset="60%" stopColor="#67C668" />
            <stop offset="100%" stopColor="#52B053" />
          </linearGradient>

          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.12" floodColor="#1e3a1e" />
          </filter>
        </defs>

        {/* ----------------- BOY (Left) ----------------- */}
        <g
          className={`cursor-pointer transition-transform duration-300 origin-bottom ${
            boyMood === 'wave' ? 'scale-105 -rotate-2' : 'hover:scale-[1.02]'
          }`}
          onClick={handleBoyClick}
        >
          {/* Boy Body / Blue T-Shirt */}
          <path
            d="M90 120 C90 92 110 88 135 88 C160 88 180 92 180 120 C180 145 180 155 180 155 L90 155 Z"
            fill="url(#boyShirt)"
            className="transition-colors"
          />

          {/* Boy Collar Accent */}
          <path
            d="M125 90 C130 96 140 96 145 90"
            stroke="#2756B8"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Boy Head */}
          <g>
            {/* Ears */}
            <circle cx="98" cy="68" r="9" fill="#FFCFB0" />
            <circle cx="172" cy="68" r="9" fill="#FFCFB0" />
            <circle cx="98" cy="68" r="5" fill="#F4B792" />
            <circle cx="172" cy="68" r="5" fill="#F4B792" />

            {/* Face base */}
            <circle cx="135" cy="68" r="38" fill="#FFD7BC" />

            {/* Hair base (brown) */}
            <path
              d="M97 65 C97 32 115 24 135 24 C158 24 173 34 173 65 C165 42 145 40 135 43 C120 46 108 52 97 65 Z"
              fill="#6A412A"
            />
            {/* Hair fringe parted left */}
            <path
              d="M102 54 C112 40 130 40 142 46 C124 50 114 60 102 54 Z"
              fill="#52311F"
            />

            {/* Cheerful Eyebrows */}
            <path
              d="M116 54 C120 52 125 53 128 55"
              stroke="#52311F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M142 55 C145 53 150 52 154 54"
              stroke="#52311F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Eyes */}
            {boyMood === 'wink' ? (
              <>
                <path
                  d="M117 65 Q122 71 127 65"
                  stroke="#2D1F17"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="149" cy="65" r="4.5" fill="#2D1F17" />
                <circle cx="147" cy="63" r="1.5" fill="white" />
              </>
            ) : (
              <>
                <circle cx="122" cy="65" r="4.5" fill="#2D1F17" />
                <circle cx="120" cy="63" r="1.5" fill="white" />
                <circle cx="148" cy="65" r="4.5" fill="#2D1F17" />
                <circle cx="146" cy="63" r="1.5" fill="white" />
              </>
            )}

            {/* Rosy Cheeks */}
            <ellipse cx="113" cy="72" rx="7" ry="4.5" fill="#FF8BA7" opacity="0.65" />
            <ellipse cx="157" cy="72" rx="7" ry="4.5" fill="#FF8BA7" opacity="0.65" />

            {/* Smiling Mouth */}
            <path
              d="M129 74 Q135 81 141 74"
              stroke="#A83928"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Waving hand when clicked */}
          {boyMood === 'wave' && (
            <g className="animate-bounce">
              <path
                d="M85 105 C75 92 68 85 64 78 C60 72 65 67 72 70 C78 73 84 85 90 95"
                stroke="#FFCFB0"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <circle cx="64" cy="74" r="7" fill="#FFCFB0" />
            </g>
          )}
        </g>

        {/* ----------------- GIRL (Right) ----------------- */}
        <g
          className={`cursor-pointer transition-transform duration-300 origin-bottom ${
            girlMood === 'giggle' ? 'scale-105 rotate-2' : 'hover:scale-[1.02]'
          }`}
          onClick={handleGirlClick}
        >
          {/* Girl Back Hair (long hair framing shoulders) */}
          <path
            d="M182 70 C175 95 178 135 184 146 C186 148 194 148 196 140 C200 125 198 90 196 70 Z"
            fill="#3F271D"
          />
          <path
            d="M268 70 C275 95 272 135 266 146 C264 148 256 148 254 140 C250 125 252 90 254 70 Z"
            fill="#3F271D"
          />

          {/* Girl Body / Pink Shirt */}
          <path
            d="M188 122 C188 95 206 90 228 90 C250 90 268 95 268 122 C268 145 268 155 268 155 L188 155 Z"
            fill="url(#girlShirt)"
          />

          {/* Girl Collar Accent */}
          <path
            d="M218 92 C223 98 233 98 238 92"
            stroke="#BD2169"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Girl Head */}
          <g>
            {/* Ears */}
            <circle cx="192" cy="70" r="8" fill="#FFCFB0" />
            <circle cx="264" cy="70" r="8" fill="#FFCFB0" />

            {/* Face base */}
            <circle cx="228" cy="70" r="37" fill="#FFD7BC" />

            {/* Girl Hair base */}
            <path
              d="M191 68 C191 35 208 26 228 26 C248 26 265 35 265 68 C256 46 242 42 228 42 C214 42 200 46 191 68 Z"
              fill="#4A2E20"
            />

            {/* Pink Headband */}
            <path
              d="M192 56 C202 38 254 38 264 56"
              stroke="#FF4F99"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Headband cute yellow flower */}
            <g transform="translate(254, 46)">
              <circle cx="0" cy="0" r="5" fill="#FBBF24" />
              <circle cx="0" cy="0" r="2.5" fill="#F59E0B" />
              {/* Petals */}
              <circle cx="-5" cy="0" r="2.5" fill="#FEF08A" />
              <circle cx="5" cy="0" r="2.5" fill="#FEF08A" />
              <circle cx="0" cy="-5" r="2.5" fill="#FEF08A" />
              <circle cx="0" cy="5" r="2.5" fill="#FEF08A" />
            </g>

            {/* Front bangs */}
            <path
              d="M198 52 C210 44 222 44 230 48 C238 44 248 44 258 52 C248 48 238 48 228 50 C218 48 208 48 198 52 Z"
              fill="#3A2317"
            />

            {/* Cheerful Eyebrows */}
            <path
              d="M211 56 C215 54 219 55 222 57"
              stroke="#4A2E20"
              strokeWidth="2.3"
              strokeLinecap="round"
            />
            <path
              d="M234 57 C237 55 241 54 245 56"
              stroke="#4A2E20"
              strokeWidth="2.3"
              strokeLinecap="round"
            />

            {/* Eyes */}
            {girlMood === 'giggle' ? (
              <>
                <path
                  d="M213 67 Q218 61 223 67"
                  stroke="#2D1F17"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <path
                  d="M233 67 Q238 61 243 67"
                  stroke="#2D1F17"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <circle cx="218" cy="67" r="4.5" fill="#2D1F17" />
                <circle cx="216" cy="65" r="1.5" fill="white" />
                <circle cx="238" cy="67" r="4.5" fill="#2D1F17" />
                <circle cx="236" cy="65" r="1.5" fill="white" />
              </>
            )}

            {/* Rosy Cheeks */}
            <ellipse cx="209" cy="74" rx="7" ry="4.5" fill="#FF8BA7" opacity="0.68" />
            <ellipse cx="247" cy="74" rx="7" ry="4.5" fill="#FF8BA7" opacity="0.68" />

            {/* Smiling Mouth */}
            <path
              d="M223 75 Q228 82 233 75"
              stroke="#A83928"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>

        {/* ----------------- GRASSY HILL (Foreground) ----------------- */}
        <g filter="url(#shadowFilter)">
          {/* Main green curved mound */}
          <path
            d="M50 152 Q170 144 310 152 C295 159 280 162 170 162 C60 162 55 159 50 152 Z"
            fill="url(#grassGrad)"
          />

          {/* Wildflower dots on the grass */}
          {/* Pink flower dot */}
          <circle cx="75" cy="151" r="3.2" fill="#FF69B4" />
          <circle cx="75" cy="151" r="1.2" fill="#FFF" />

          {/* White flower dot */}
          <circle cx="170" cy="154" r="3" fill="#FFFFFF" />
          <circle cx="170" cy="154" r="1" fill="#FBBF24" />

          {/* Yellow flower dot */}
          <circle cx="275" cy="151" r="3.2" fill="#FDE047" />
          <circle cx="275" cy="151" r="1.2" fill="#F59E0B" />

          {/* Small pastel dots */}
          <circle cx="115" cy="154" r="2" fill="#E0E7FF" opacity="0.7" />
          <circle cx="225" cy="154" r="2.2" fill="#FBCFE8" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};
