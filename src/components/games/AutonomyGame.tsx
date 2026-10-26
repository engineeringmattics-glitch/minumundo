import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playSuccessMatch, playCelebration, playStarSparkle } from '../../utils/audio';
import { ArrowLeft, RotateCcw, Trophy, Sparkles, Check, Star } from 'lucide-react';

interface AutonomyGameProps {
  onBack: () => void;
  onEarnStar?: () => void;
}

const HATS = ['🧢', '👑', '🎩', '🎀', '🦁', '🧑‍🚀'];
const SHIRTS = [
  { id: 'blue', color: 'bg-blue-500', name: 'Azul' },
  { id: 'pink', color: 'bg-pink-500', name: 'Rosa' },
  { id: 'yellow', color: 'bg-amber-400', name: 'Amarilla' },
  { id: 'green', color: 'bg-emerald-500', name: 'Verde' },
  { id: 'purple', color: 'bg-purple-600', name: 'Morada' },
];
const GLASSES = ['🕶️', '👓', '⭐', 'None'];

export const AutonomyGame: React.FC<AutonomyGameProps> = ({ onBack, onEarnStar }) => {
  const [activeTab, setActiveTab] = useState<'dress' | 'teeth' | 'breakfast'>('dress');
  const [character, setCharacter] = useState<'boy' | 'girl'>('boy');

  // Dress Up State
  const [selectedHat, setSelectedHat] = useState<string>('🧢');
  const [selectedShirt, setSelectedShirt] = useState(SHIRTS[0]);
  const [selectedGlasses, setSelectedGlasses] = useState<string>('None');

  // Teeth Brushing State
  const [teethCleaned, setTeethCleaned] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [brushingDone, setBrushingDone] = useState(false);

  // Healthy Breakfast State
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [breakfastDone, setBreakfastDone] = useState(false);

  // Teeth brushing click
  const handleBrushTooth = (toothId: number) => {
    playPop(520);
    const updated = teethCleaned.filter((id) => id !== toothId);
    setTeethCleaned(updated);
    if (updated.length === 0) {
      setBrushingDone(true);
      playSuccessMatch();
      confetti({ particleCount: 50, spread: 60 });
      if (onEarnStar) onEarnStar();
    }
  };

  // Food toggle
  const FOOD_ITEMS = [
    { id: 'apple', icon: '🍎', name: 'Manzana' },
    { id: 'banana', icon: '🍌', name: 'Plátano' },
    { id: 'milk', icon: '🥛', name: 'Leche' },
    { id: 'egg', icon: '🍳', name: 'Huevo' },
    { id: 'toast', icon: '🍞', name: 'Tostada' },
    { id: 'orange', icon: '🍊', name: 'Naranja' },
  ];

  const handleSelectFood = (foodId: string) => {
    playPop(460);
    if (selectedFoods.includes(foodId)) {
      setSelectedFoods(selectedFoods.filter((f) => f !== foodId));
    } else {
      const updated = [...selectedFoods, foodId];
      setSelectedFoods(updated);
      if (updated.length >= 3 && !breakfastDone) {
        setBreakfastDone(true);
        playSuccessMatch();
        confetti({ particleCount: 50, spread: 60 });
        if (onEarnStar) onEarnStar();
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-amber-50 via-orange-50 to-purple-50 p-4 sm:p-6 overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-purple-700 font-kids text-sm font-semibold shadow-xs hover:bg-white active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <span className="font-kids text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
          ⭐ Fomenta la autonomía
        </span>

        <button
          onClick={() => {
            setTeethCleaned([1, 2, 3, 4, 5, 6]);
            setBrushingDone(false);
            setSelectedFoods([]);
            setBreakfastDone(false);
            playPop(340);
          }}
          title="Reiniciar"
          className="p-1.5 rounded-full bg-white text-slate-600 hover:text-amber-600 shadow-xs active:rotate-180 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Routine Selector Tabs */}
      <div className="flex items-center justify-center gap-1.5 mb-4 overflow-x-auto py-1">
        <button
          onClick={() => {
            setActiveTab('dress');
            playPop(440);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-kids font-bold flex items-center gap-1 transition-all ${
            activeTab === 'dress'
              ? 'bg-amber-500 text-white shadow-xs scale-105'
              : 'bg-white/80 text-amber-900 hover:bg-white'
          }`}
        >
          <span>👕</span>
          <span>Vestirse Solito</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('teeth');
            playPop(480);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-kids font-bold flex items-center gap-1 transition-all ${
            activeTab === 'teeth'
              ? 'bg-amber-500 text-white shadow-xs scale-105'
              : 'bg-white/80 text-amber-900 hover:bg-white'
          }`}
        >
          <span>🪥</span>
          <span>Cepillarse</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('breakfast');
            playPop(520);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-kids font-bold flex items-center gap-1 transition-all ${
            activeTab === 'breakfast'
              ? 'bg-amber-500 text-white shadow-xs scale-105'
              : 'bg-white/80 text-amber-900 hover:bg-white'
          }`}
        >
          <span>🍎</span>
          <span>Desayuno Sano</span>
        </button>
      </div>

      {/* TAB 1: DRESS UP */}
      {activeTab === 'dress' && (
        <div className="flex-1 flex flex-col items-center justify-around max-w-sm mx-auto w-full">
          {/* Character Preview */}
          <div className="relative w-44 h-48 bg-white/80 rounded-3xl p-3 shadow-md border-2 border-amber-200 flex flex-col items-center justify-center select-none">
            {/* Hat */}
            <div className="text-4xl absolute -top-4 z-20 animate-bounce">
              {selectedHat}
            </div>

            {/* Glasses */}
            {selectedGlasses !== 'None' && (
              <div className="text-2xl absolute top-14 z-20">
                {selectedGlasses}
              </div>
            )}

            {/* Face */}
            <div className="w-20 h-20 rounded-full bg-[#FFD7BC] relative border-2 border-amber-300 shadow-inner flex flex-col items-center justify-center">
              {/* Hair */}
              <div
                className={`w-full h-8 absolute top-0 rounded-t-full ${
                  character === 'boy' ? 'bg-[#52311F]' : 'bg-[#3A2317]'
                }`}
              />
              {/* Eyes */}
              <div className="flex gap-4 mt-2 z-10">
                <div className="w-2 h-2 rounded-full bg-[#2D1F17]" />
                <div className="w-2 h-2 rounded-full bg-[#2D1F17]" />
              </div>
              {/* Cheeks */}
              <div className="flex gap-6 mt-1 z-10">
                <div className="w-3 h-1.5 rounded-full bg-rose-400 opacity-60" />
                <div className="w-3 h-1.5 rounded-full bg-rose-400 opacity-60" />
              </div>
              {/* Smile */}
              <div className="w-4 h-2 border-b-2 border-rose-600 rounded-full" />
            </div>

            {/* Shirt Body */}
            <div
              className={`w-24 h-16 rounded-b-2xl mt-1 flex items-center justify-center text-white font-kids text-xs font-bold shadow-sm transition-colors ${selectedShirt.color}`}
            >
              <span>Mini Mundos</span>
            </div>
          </div>

          {/* Wardrobe Controls */}
          <div className="w-full mt-4 bg-white/90 rounded-2xl p-3 border border-amber-100 flex flex-col gap-2">
            {/* Character toggle */}
            <div className="flex items-center justify-center gap-2 pb-2 border-b border-slate-100">
              <button
                onClick={() => setCharacter('boy')}
                className={`px-3 py-1 rounded-full text-xs font-kids font-bold ${
                  character === 'boy' ? 'bg-blue-600 text-white' : 'bg-slate-100'
                }`}
              >
                👦 Niño
              </button>
              <button
                onClick={() => setCharacter('girl')}
                className={`px-3 py-1 rounded-full text-xs font-kids font-bold ${
                  character === 'girl' ? 'bg-pink-500 text-white' : 'bg-slate-100'
                }`}
              >
                👧 Niña
              </button>
            </div>

            {/* Hats */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 block mb-1">Sombreros / Accesorios:</span>
              <div className="flex gap-1.5 justify-center">
                {HATS.map((hat) => (
                  <button
                    key={hat}
                    onClick={() => {
                      setSelectedHat(hat);
                      playPop(480);
                    }}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all ${
                      selectedHat === hat ? 'bg-amber-100 ring-2 ring-amber-400 scale-110' : 'bg-slate-50'
                    }`}
                  >
                    {hat}
                  </button>
                ))}
              </div>
            </div>

            {/* Shirts */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 block mb-1">Color de Camiseta:</span>
              <div className="flex gap-2 justify-center">
                {SHIRTS.map((sh) => (
                  <button
                    key={sh.id}
                    onClick={() => {
                      setSelectedShirt(sh);
                      playPop(440);
                    }}
                    className={`w-7 h-7 rounded-full transition-transform ${sh.color} ${
                      selectedShirt.id === sh.id ? 'ring-3 ring-amber-400 scale-120' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TEETH BRUSHING */}
      {activeTab === 'teeth' && (
        <div className="flex-1 flex flex-col items-center justify-around max-w-sm mx-auto w-full">
          <div className="text-center">
            <h3 className="font-kids text-xl font-bold text-amber-950">¡Limpia todos los dientitos!</h3>
            <p className="text-xs text-amber-700 font-medium">Toca cada manchita para cepillarla con espuma limpia 🪥</p>
          </div>

          {/* Big smiling mouth */}
          <div className="w-56 h-40 bg-rose-200 rounded-full border-4 border-rose-400 flex flex-col items-center justify-center p-3 shadow-inner relative">
            <div className="text-xs font-kids font-bold text-rose-800 mb-2">¡Sonrisa Sana!</div>
            <div className="grid grid-cols-6 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((id) => {
                const hasStain = teethCleaned.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => handleBrushTooth(id)}
                    className={`w-7 h-10 rounded-lg flex flex-col items-center justify-center border-2 transition-all ${
                      hasStain
                        ? 'bg-amber-100 border-amber-400 hover:scale-110 active:scale-95'
                        : 'bg-white border-sky-300 shadow-xs'
                    }`}
                  >
                    {hasStain ? (
                      <span className="text-[10px] animate-pulse">🦠</span>
                    ) : (
                      <span className="text-[10px]">✨</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {brushingDone ? (
            <div className="bg-emerald-100 text-emerald-800 font-kids text-sm font-bold px-4 py-2 rounded-full border border-emerald-300 animate-bounce">
              ¡Dientitos relucientes y limpios! ⭐
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-kids">
              Faltan {teethCleaned.length} dientitos por cepillar
            </p>
          )}
        </div>
      )}

      {/* TAB 3: BREAKFAST */}
      {activeTab === 'breakfast' && (
        <div className="flex-1 flex flex-col items-center justify-around max-w-sm mx-auto w-full">
          <div className="text-center">
            <h3 className="font-kids text-xl font-bold text-amber-950">¡Prepara tu Desayuno Nutritivo!</h3>
            <p className="text-xs text-amber-700 font-medium">Elige 3 alimentos saludables para empezar el día con energía</p>
          </div>

          {/* Plate */}
          <div className="w-52 h-52 rounded-full bg-white border-8 border-sky-100 shadow-md flex items-center justify-center p-4 relative">
            {selectedFoods.length === 0 ? (
              <span className="text-xs font-kids text-slate-400 text-center">
                El plato está vacío.<br />¡Elige comiditas ricas abajo!
              </span>
            ) : (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {selectedFoods.map((fId) => {
                  const food = FOOD_ITEMS.find((item) => item.id === fId);
                  return (
                    <span key={fId} className="text-4xl animate-bounce">
                      {food?.icon}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Food Options */}
          <div className="grid grid-cols-3 gap-2 w-full mt-2">
            {FOOD_ITEMS.map((item) => {
              const isSelected = selectedFoods.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectFood(item.id)}
                  className={`p-2 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                    isSelected
                      ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 scale-105'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[10px] font-kids font-bold text-slate-700 mt-0.5">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
