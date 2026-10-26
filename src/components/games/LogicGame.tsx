import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playSuccessMatch, playCelebration, playErrorBuzz } from '../../utils/audio';
import { ArrowLeft, RotateCcw, Trophy, CheckCircle, Sparkles, Star } from 'lucide-react';

interface LogicGameProps {
  onBack: () => void;
  onEarnStar?: () => void;
}

interface ShapeItem {
  id: string;
  name: string;
  symbol: string;
  color: string;
  slotColor: string;
}

const SHAPES: ShapeItem[] = [
  { id: 'star', name: 'Estrella', symbol: '⭐', color: 'bg-amber-400 text-amber-950', slotColor: 'border-amber-400' },
  { id: 'heart', name: 'Corazón', symbol: '💖', color: 'bg-rose-400 text-rose-950', slotColor: 'border-rose-400' },
  { id: 'circle', name: 'Círculo', symbol: '🟡', color: 'bg-yellow-400 text-yellow-950', slotColor: 'border-yellow-400' },
  { id: 'diamond', name: 'Rombo', symbol: '🔷', color: 'bg-blue-400 text-blue-950', slotColor: 'border-blue-400' },
  { id: 'square', name: 'Cuadrado', symbol: '🟩', color: 'bg-emerald-400 text-emerald-950', slotColor: 'border-emerald-400' },
  { id: 'clover', name: 'Trébol', symbol: '🍀', color: 'bg-teal-400 text-teal-950', slotColor: 'border-teal-400' },
];

const PATTERNS = [
  { sequence: ['🍎', '🍌', '🍎', '🍌'], options: ['🍎', '🍌', '🍇'], answer: '🍎' },
  { sequence: ['🚗', '✈️', '🚗', '✈️'], options: ['✈️', '🚗', '🚀'], answer: '🚗' },
  { sequence: ['🐶', '🐱', '🐶', '🐱'], options: ['🐶', '🐱', '🐰'], answer: '🐶' },
  { sequence: ['⭐', '⭐', '🌙', '⭐', '⭐'], options: ['🌙', '⭐', '☀️'], answer: '🌙' },
];

export const LogicGame: React.FC<LogicGameProps> = ({ onBack, onEarnStar }) => {
  const [mode, setMode] = useState<'shapes' | 'patterns'>('shapes');

  // Shapes Game State
  const [selectedShape, setSelectedShape] = useState<ShapeItem | null>(null);
  const [placedShapes, setPlacedShapes] = useState<Record<string, boolean>>({});

  // Patterns Game State
  const [patternStep, setPatternStep] = useState(0);
  const [patternScore, setPatternScore] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const resetShapes = () => {
    setPlacedShapes({});
    setSelectedShape(null);
    setIsWon(false);
  };

  const resetPatterns = () => {
    setPatternStep(0);
    setPatternScore(0);
    setIsWon(false);
  };

  const handleShapeSlotClick = (shape: ShapeItem) => {
    if (placedShapes[shape.id]) return;

    if (selectedShape?.id === shape.id) {
      // Correct!
      playSuccessMatch();
      const updated = { ...placedShapes, [shape.id]: true };
      setPlacedShapes(updated);
      setSelectedShape(null);

      if (Object.keys(updated).length === SHAPES.length) {
        setIsWon(true);
        playCelebration();
        confetti({ particleCount: 70, spread: 70 });
        if (onEarnStar) onEarnStar();
      }
    } else if (selectedShape) {
      playErrorBuzz();
    }
  };

  const handlePatternChoice = (choice: string) => {
    const current = PATTERNS[patternStep];
    if (choice === current.answer) {
      playSuccessMatch();
      const nextStep = patternStep + 1;
      setPatternScore((s) => s + 1);

      if (nextStep >= PATTERNS.length) {
        setIsWon(true);
        playCelebration();
        confetti({ particleCount: 75, spread: 75 });
        if (onEarnStar) onEarnStar();
      } else {
        setPatternStep(nextStep);
      }
    } else {
      playErrorBuzz();
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-emerald-50 via-teal-50 to-blue-50 p-4 sm:p-6 overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-purple-700 font-kids text-sm font-semibold shadow-xs hover:bg-white active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <span className="font-kids text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
          🧩 Pensamiento lógico
        </span>

        <button
          onClick={mode === 'shapes' ? resetShapes : resetPatterns}
          title="Reiniciar"
          className="p-1.5 rounded-full bg-white text-slate-600 hover:text-emerald-600 shadow-xs active:rotate-180 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => {
            setMode('shapes');
            playPop(480);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-kids font-bold transition-all ${
            mode === 'shapes'
              ? 'bg-emerald-600 text-white shadow-sm scale-105'
              : 'bg-white/80 text-emerald-800 hover:bg-white'
          }`}
        >
          Encajar Formas
        </button>
        <button
          onClick={() => {
            setMode('patterns');
            playPop(520);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-kids font-bold transition-all ${
            mode === 'patterns'
              ? 'bg-emerald-600 text-white shadow-sm scale-105'
              : 'bg-white/80 text-emerald-800 hover:bg-white'
          }`}
        >
          Completar Patrones
        </button>
      </div>

      {/* MODE 1: SHAPES MATCH */}
      {mode === 'shapes' && (
        <div className="flex-1 flex flex-col items-center justify-around max-w-md mx-auto w-full">
          <div className="text-center mb-2">
            <h3 className="font-kids text-xl font-bold text-emerald-950">
              {selectedShape ? `Ahora toca la silueta de ${selectedShape.name}` : 'Toca una ficha y luego su silueta'}
            </h3>
            <p className="text-xs text-emerald-700">
              {Object.keys(placedShapes).length} de {SHAPES.length} encajadas
            </p>
          </div>

          {/* Slots / Silhouettes */}
          <div className="grid grid-cols-3 gap-3 w-full bg-white/70 backdrop-blur-xs p-4 rounded-3xl border-2 border-emerald-200">
            {SHAPES.map((shape) => {
              const isPlaced = placedShapes[shape.id];
              return (
                <button
                  key={shape.id}
                  onClick={() => handleShapeSlotClick(shape)}
                  className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                    isPlaced
                      ? 'border-emerald-500 bg-emerald-100 shadow-sm'
                      : selectedShape?.id === shape.id
                      ? 'border-emerald-600 bg-emerald-50 animate-pulse scale-105'
                      : 'border-slate-300 bg-slate-50/50 hover:bg-slate-100'
                  }`}
                >
                  {isPlaced ? (
                    <div className="text-3xl animate-bounce leading-none">{shape.symbol}</div>
                  ) : (
                    <div className="opacity-25 grayscale text-3xl">{shape.symbol}</div>
                  )}
                  <span className="text-[10px] font-bold font-kids mt-1 text-slate-500">
                    {isPlaced ? '¡Listo!' : shape.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pickable Pieces */}
          <div className="mt-4 w-full">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block text-center mb-2">
              Tus Fichas para Colocar:
            </span>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {SHAPES.map((shape) => {
                const isPlaced = placedShapes[shape.id];
                const isSelected = selectedShape?.id === shape.id;
                if (isPlaced) return null;
                return (
                  <button
                    key={shape.id}
                    onClick={() => {
                      setSelectedShape(shape);
                      playPop(460);
                    }}
                    className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border-2 shadow-sm transition-all ${
                      isSelected
                        ? 'border-purple-600 ring-4 ring-purple-300 scale-110 bg-white'
                        : 'border-white bg-white hover:scale-105'
                    }`}
                  >
                    <span className="text-2xl leading-none">{shape.symbol}</span>
                    <span className="text-[9px] font-bold font-kids text-slate-600 mt-0.5">{shape.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: PATTERNS */}
      {mode === 'patterns' && (
        <div className="flex-1 flex flex-col items-center justify-around max-w-md mx-auto w-full">
          <div className="text-center mb-2">
            <h3 className="font-kids text-xl font-bold text-teal-950">¿Qué sigue en la serie?</h3>
            <p className="text-xs text-teal-700">Pregunta {patternStep + 1} de {PATTERNS.length}</p>
          </div>

          {/* Sequence Display */}
          <div className="bg-white/80 rounded-3xl p-5 border-2 border-teal-200 shadow-sm w-full text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {PATTERNS[patternStep].sequence.map((item, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-2xl sm:text-3xl shadow-xs"
                >
                  {item}
                </div>
              ))}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-100 border-2 border-dashed border-amber-400 flex items-center justify-center text-xl font-kids font-bold text-amber-600 animate-pulse">
                ?
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="w-full mt-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block text-center mb-2">
              Elige la respuesta correcta:
            </span>
            <div className="grid grid-cols-3 gap-3">
              {PATTERNS[patternStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePatternChoice(opt)}
                  className="h-16 rounded-2xl bg-white hover:bg-teal-50 border-2 border-teal-200 hover:border-teal-400 flex items-center justify-center text-3xl shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Win Banner Modal */}
      {isWon && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl border-4 border-emerald-300 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Trophy className="w-9 h-9 text-emerald-600" />
            </div>
            <h3 className="font-kids text-2xl font-bold text-emerald-950">¡Pensador Brillante!</h3>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Completaste los desafíos de lógica y formas con éxito total.
            </p>
            <div className="flex items-center justify-center gap-1.5 my-4">
              <Star className="w-7 h-7 fill-amber-400 text-amber-500 animate-bounce" />
              <Star className="w-8 h-8 fill-amber-400 text-amber-500 animate-bounce delay-100" />
              <Star className="w-7 h-7 fill-amber-400 text-amber-500 animate-bounce delay-200" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={mode === 'shapes' ? resetShapes : resetPatterns}
                className="flex-1 py-2.5 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-kids font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Jugar otra vez
              </button>
              <button
                onClick={onBack}
                className="py-2.5 px-4 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-kids font-bold text-sm active:scale-95 transition-all"
              >
                Menú
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
