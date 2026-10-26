import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playNote, playCelebration, playErrorBuzz, playStarSparkle } from '../../utils/audio';
import { ArrowLeft, RotateCcw, Trophy, Sparkles, Star, Volume2 } from 'lucide-react';

interface ConcentrationGameProps {
  onBack: () => void;
  onEarnStar?: () => void;
}

interface Bell {
  id: number;
  name: string;
  color: string;
  activeColor: string;
  noteFreq: number; // Hz
  icon: string;
}

const BELLS: Bell[] = [
  { id: 0, name: 'Roja', color: 'bg-rose-400 hover:bg-rose-500 text-rose-950', activeColor: 'bg-rose-200 ring-4 ring-rose-300 scale-110 shadow-lg', noteFreq: 261.63, icon: '🔔' }, // C4
  { id: 1, name: 'Azul', color: 'bg-sky-400 hover:bg-sky-500 text-sky-950', activeColor: 'bg-sky-200 ring-4 ring-sky-300 scale-110 shadow-lg', noteFreq: 329.63, icon: '🔔' }, // E4
  { id: 2, name: 'Amarilla', color: 'bg-amber-400 hover:bg-amber-500 text-amber-950', activeColor: 'bg-amber-200 ring-4 ring-amber-300 scale-110 shadow-lg', noteFreq: 392.00, icon: '🔔' }, // G4
  { id: 3, name: 'Verde', color: 'bg-emerald-400 hover:bg-emerald-500 text-emerald-950', activeColor: 'bg-emerald-200 ring-4 ring-emerald-300 scale-110 shadow-lg', noteFreq: 523.25, icon: '🔔' }, // C5
];

export const ConcentrationGame: React.FC<ConcentrationGameProps> = ({ onBack, onEarnStar }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerStep, setPlayerStep] = useState(0);
  const [round, setRound] = useState(1);
  const [activeBellId, setActiveBellId] = useState<number | null>(null);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startNewGame = () => {
    setSequence([]);
    setPlayerStep(0);
    setRound(1);
    setIsWon(false);
    setHasStarted(true);
    // start first round
    addNewStepToSequence([]);
  };

  const addNewStepToSequence = (currentSeq: number[]) => {
    const nextItem = Math.floor(Math.random() * 4);
    const updated = [...currentSeq, nextItem];
    setSequence(updated);
    setPlayerStep(0);
    playSequenceAnimation(updated);
  };

  const playSequenceAnimation = async (seqToPlay: number[]) => {
    setIsPlayingSequence(true);
    for (let i = 0; i < seqToPlay.length; i++) {
      await new Promise((res) => setTimeout(res, 400));
      const bellId = seqToPlay[i];
      const bell = BELLS[bellId];
      setActiveBellId(bellId);
      playNote(bell.noteFreq, 0.4);
      await new Promise((res) => setTimeout(res, 450));
      setActiveBellId(null);
    }
    setIsPlayingSequence(false);
  };

  const handleBellClick = (bell: Bell) => {
    if (isPlayingSequence || isWon || !hasStarted) return;

    // Flash bell & play note
    setActiveBellId(bell.id);
    playNote(bell.noteFreq, 0.35);
    setTimeout(() => setActiveBellId(null), 300);

    // Verify player step
    if (sequence[playerStep] === bell.id) {
      const nextStep = playerStep + 1;
      setPlayerStep(nextStep);

      // Completed full sequence for this round?
      if (nextStep === sequence.length) {
        if (round >= 5) {
          // WON ENTIRE GAME!
          setIsWon(true);
          playCelebration();
          confetti({ particleCount: 80, spread: 70 });
          if (onEarnStar) onEarnStar();
        } else {
          // Next round!
          playStarSparkle();
          setRound((r) => r + 1);
          setTimeout(() => {
            addNewStepToSequence(sequence);
          }, 900);
        }
      }
    } else {
      // Mistake!
      playErrorBuzz();
      setTimeout(() => {
        // Replay sequence for kid without punishing
        playSequenceAnimation(sequence);
        setPlayerStep(0);
      }, 700);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50 p-4 sm:p-6 overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-purple-700 font-kids text-sm font-semibold shadow-xs hover:bg-white active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <span className="font-kids text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
          💖 Aumenta la concentración
        </span>

        <button
          onClick={startNewGame}
          title="Reiniciar"
          className="p-1.5 rounded-full bg-white text-slate-600 hover:text-rose-600 shadow-xs active:rotate-180 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Title & Instructions */}
      <div className="text-center mb-3">
        <h2 className="font-kids text-2xl font-bold text-rose-950 tracking-tight">
          🔔 Campanitas Musicales
        </h2>
        <p className="text-xs text-rose-700 font-medium mt-0.5">
          {isPlayingSequence
            ? '¡Escucha y mira atentamente la melodía!'
            : '¡Toca las campanitas en el mismo orden!'}
        </p>

        {/* Round Progress indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div
              key={lvl}
              className={`w-6 h-6 rounded-full flex items-center justify-center font-kids text-xs font-bold transition-all ${
                round >= lvl
                  ? 'bg-rose-500 text-white scale-110 shadow-xs'
                  : 'bg-white/80 text-rose-300'
              }`}
            >
              {lvl}
            </div>
          ))}
        </div>
      </div>

      {/* Main Bell Arena */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-xs mx-auto w-full">
        {!hasStarted ? (
          <div className="bg-white/90 rounded-3xl p-6 text-center border-2 border-rose-200 shadow-md">
            <div className="text-5xl mb-3 animate-bounce">🎶</div>
            <h3 className="font-kids text-lg font-bold text-rose-900 mb-1">¿Listo para afinar tu oído?</h3>
            <p className="text-xs text-slate-600 mb-4 font-medium">
              Mira cuáles campanas brillan y suenan, luego tócalas tú en el mismo orden.
            </p>
            <button
              onClick={startNewGame}
              className="w-full py-3 px-6 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-kids font-bold text-sm shadow-md active:scale-95 transition-all"
            >
              ¡Comenzar Melodía!
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 w-full">
            {BELLS.map((bell) => {
              const isActive = activeBellId === bell.id;
              return (
                <button
                  key={bell.id}
                  onClick={() => handleBellClick(bell)}
                  disabled={isPlayingSequence}
                  className={`aspect-square rounded-3xl p-4 flex flex-col items-center justify-center transition-all duration-200 border-4 border-white select-none ${
                    isActive ? bell.activeColor : `${bell.color} shadow-md hover:scale-105 active:scale-95`
                  } ${isPlayingSequence ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <span className={`text-4xl sm:text-5xl drop-shadow-xs transition-transform ${isActive ? 'scale-125' : ''}`}>
                    {bell.icon}
                  </span>
                  <span className="font-kids text-xs font-bold mt-1 text-white/90">
                    {bell.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Win Banner */}
      {isWon && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl border-4 border-rose-300 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Trophy className="w-9 h-9 text-rose-600" />
            </div>
            <h3 className="font-kids text-2xl font-bold text-rose-950">¡Concentración Total!</h3>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              ¡Completaste las 5 rondas de campanitas musicales con gran atención y memoria sonora!
            </p>
            <div className="flex items-center justify-center gap-1.5 my-4">
              <Star className="w-7 h-7 fill-amber-400 text-amber-500 animate-bounce" />
              <Star className="w-8 h-8 fill-amber-400 text-amber-500 animate-bounce delay-100" />
              <Star className="w-7 h-7 fill-amber-400 text-amber-500 animate-bounce delay-200" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={startNewGame}
                className="flex-1 py-2.5 px-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-kids font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Jugar otra vez
              </button>
              <button
                onClick={onBack}
                className="py-2.5 px-4 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 font-kids font-bold text-sm active:scale-95 transition-all"
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
