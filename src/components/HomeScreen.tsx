import React from 'react';
import { RainbowAndTitle } from './RainbowAndTitle';
import { KidsCharacters } from './KidsCharacters';
import { playPop, playCelebration } from '../utils/audio';
import { ArrowRight, Sparkles, Smartphone, Code2, Shield } from 'lucide-react';

interface HomeScreenProps {
  onStart: () => void;
  onOpenExpoCode: () => void;
  onOpenParents: () => void;
  onSelectPillar: (gameId: 'memory' | 'creative' | 'logic' | 'concentration' | 'autonomy') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStart,
  onOpenExpoCode,
  onOpenParents,
  onSelectPillar,
}) => {
  const handleStartClick = () => {
    playCelebration();
    onStart();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* ======================================================== */}
      {/* 1. IPHONE SCREEN CONTAINER (Exact replica from the image) */}
      {/* ======================================================== */}
      <div className="relative w-full max-w-[390px] h-[780px] sm:h-[810px] rounded-[48px] bg-black p-3.5 shadow-2xl shadow-purple-950/20 ring-1 ring-slate-800/80 transition-all select-none">
        {/* Inner Phone Bezel Screen */}
        <div className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#C5EDFF] via-[#DCF6FE] via-75% to-[#B7EAB9]">
          
          {/* Subtle Sky Elements */}
          {/* Sun with warm halo in top left */}
          <div className="absolute -top-3 -left-3 pointer-events-none">
            {/* Outer blur glow */}
            <div className="w-36 h-36 rounded-full bg-yellow-200/50 blur-2xl" />
            {/* Core warm sun */}
            <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 opacity-90 shadow-lg shadow-yellow-400/30" />
          </div>

          {/* Drifting Clouds in Background */}
          <div className="absolute top-16 -left-8 pointer-events-none opacity-80 animate-float-slow">
            <svg width="120" height="50" viewBox="0 0 120 50" fill="none">
              <path
                d="M20 40 C10 40 4 34 4 28 C4 22 10 18 16 18 C20 9 32 3 45 3 C58 3 70 10 73 21 C79 19 88 24 90 30 C99 30 105 35 105 40 C105 46 99 50 92 50 L20 50 Z"
                fill="white"
                fillOpacity="0.85"
              />
            </svg>
          </div>

          <div className="absolute top-10 right-2 pointer-events-none opacity-85 animate-float">
            <svg width="110" height="48" viewBox="0 0 110 48" fill="none">
              <path
                d="M18 38 C9 38 3 32 3 26 C3 20 9 17 15 17 C18 8 29 2 41 2 C53 2 64 9 67 19 C72 17 80 22 82 27 C90 27 96 32 96 38 C96 43 90 47 84 47 L18 47 Z"
                fill="white"
                fillOpacity="0.88"
              />
            </svg>
          </div>

          {/* ----------------- TOP STATUS BAR ----------------- */}
          <div className="relative z-30 pt-3 px-7 flex items-center justify-between text-slate-900 font-semibold text-xs select-none">
            {/* Time */}
            <span className="font-bold tracking-tight text-[13px]">9:41</span>

            {/* Dynamic Island / Notch */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2.5 space-x-1 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950" />
            </div>

            {/* Battery & Signal Icons */}
            <div className="flex items-center gap-1.5">
              {/* Signal bars */}
              <div className="flex items-end gap-0.5 h-3">
                <div className="w-0.5 h-1 bg-slate-900 rounded-full" />
                <div className="w-0.5 h-1.5 bg-slate-900 rounded-full" />
                <div className="w-0.5 h-2 bg-slate-900 rounded-full" />
                <div className="w-0.5 h-2.5 bg-slate-900 rounded-full" />
              </div>
              {/* Battery */}
              <div className="w-5 h-2.5 rounded-[4px] border border-slate-900 p-[1px] flex items-center">
                <div className="w-full h-full bg-slate-900 rounded-[2px]" />
              </div>
            </div>
          </div>

          {/* ----------------- UPPER SECTION: RAINBOW & TITLE ----------------- */}
          <div className="relative z-20 mt-1">
            <RainbowAndTitle />
          </div>

          {/* ----------------- MIDDLE SECTION: CHARACTERS ON LAWN ----------------- */}
          <div className="relative z-20 flex-1 flex flex-col justify-center items-center -my-2">
            <KidsCharacters />
          </div>

          {/* ----------------- BOTTOM SECTION: CTA BUTTON ----------------- */}
          <div className="relative z-20 pb-8 px-6 flex flex-col items-center">
            {/* Purple Glowing ¡Comenzar! Button */}
            <button
              onClick={handleStartClick}
              className="w-full max-w-[280px] h-14 rounded-full bg-[#7C4DFF] hover:bg-[#6E3DF5] active:scale-95 text-white font-kids font-bold text-xl sm:text-2xl shadow-lg shadow-purple-600/35 flex items-center justify-center gap-2 border-2 border-purple-300/40 transition-all duration-200 cursor-pointer group hover:shadow-purple-500/50"
            >
              <span>¡Comenzar!</span>
              <ArrowRight className="w-6 h-6 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* iOS Home Indicator Bar */}
            <div className="w-32 h-1 bg-slate-900/40 rounded-full mt-4" />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. BELOW-THE-PHONE CARD (Exact replica from screenshot) */}
      {/* ======================================================== */}
      <div className="w-full max-w-[390px] mt-5 bg-white/95 backdrop-blur-md rounded-[32px] p-5 shadow-xl shadow-purple-900/5 border border-purple-100 flex flex-col items-center">
        {/* Yellow Golden Pill Badge */}
        <div className="w-full max-w-[320px] py-2 px-4 rounded-full bg-[#FCE276] text-[#78350F] font-kids font-bold text-center text-sm shadow-xs flex items-center justify-center gap-1.5 mb-5 select-none">
          <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
          <span>¡Aprender también es divertido!</span>
        </div>

        {/* 5 Cognitive Areas / Developmental Pillars Grid */}
        <div className="w-full space-y-4 mb-5">
          {/* Top Row: 3 items */}
          <div className="grid grid-cols-3 gap-2 text-center">
            {/* 1. Mejora la memoria */}
            <button
              onClick={() => {
                playPop(480);
                onSelectPillar('memory');
              }}
              className="group flex flex-col items-center p-2 rounded-2xl hover:bg-purple-50/80 transition-all cursor-pointer active:scale-95"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🧠</span>
              <span className="font-kids font-bold text-[11px] leading-tight text-slate-800 group-hover:text-purple-700">
                Mejora la memoria
              </span>
            </button>

            {/* 2. Estimula la creatividad */}
            <button
              onClick={() => {
                playPop(520);
                onSelectPillar('creative');
              }}
              className="group flex flex-col items-center p-2 rounded-2xl hover:bg-amber-50/80 transition-all cursor-pointer active:scale-95"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">💡</span>
              <span className="font-kids font-bold text-[11px] leading-tight text-slate-800 group-hover:text-amber-700">
                Estimula la creatividad
              </span>
            </button>

            {/* 3. Pensamiento lógico */}
            <button
              onClick={() => {
                playPop(500);
                onSelectPillar('logic');
              }}
              className="group flex flex-col items-center p-2 rounded-2xl hover:bg-emerald-50/80 transition-all cursor-pointer active:scale-95"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🧩</span>
              <span className="font-kids font-bold text-[11px] leading-tight text-slate-800 group-hover:text-emerald-700">
                Pensamiento lógico
              </span>
            </button>
          </div>

          {/* Bottom Row: 2 items centered */}
          <div className="flex items-center justify-around px-2 text-center">
            {/* 4. Aumenta la concentración */}
            <button
              onClick={() => {
                playPop(540);
                onSelectPillar('concentration');
              }}
              className="group flex flex-col items-center p-2 rounded-2xl hover:bg-rose-50/80 transition-all cursor-pointer active:scale-95 max-w-[130px]"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">💖</span>
              <span className="font-kids font-bold text-[11px] leading-tight text-slate-800 group-hover:text-rose-700">
                Aumenta la concentración
              </span>
            </button>

            {/* 5. Fomenta la autonomía */}
            <button
              onClick={() => {
                playPop(560);
                onSelectPillar('autonomy');
              }}
              className="group flex flex-col items-center p-2 rounded-2xl hover:bg-blue-50/80 transition-all cursor-pointer active:scale-95 max-w-[130px]"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">⭐</span>
              <span className="font-kids font-bold text-[11px] leading-tight text-slate-800 group-hover:text-blue-700">
                Fomenta la autonomía
              </span>
            </button>
          </div>
        </div>

        {/* Expo / React Native Code Button (matching screenshot pill) */}
        <button
          onClick={() => {
            playPop(480);
            onOpenExpoCode();
          }}
          className="w-full max-w-[280px] py-2.5 px-4 rounded-2xl bg-[#7C4DFF] hover:bg-[#6E3DF5] active:scale-95 text-white font-kids font-bold text-xs sm:text-sm shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>📱</span>
          <span>Código Expo / React Native</span>
        </button>
      </div>
    </div>
  );
};
