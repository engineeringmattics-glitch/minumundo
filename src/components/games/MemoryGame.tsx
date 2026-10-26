import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playSuccessMatch, playCelebration, playCardFlip } from '../../utils/audio';
import { ArrowLeft, RotateCcw, Trophy, Sparkles, Volume2, Star } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  name: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const ANIMAL_PAIRS = [
  { emoji: '🦁', name: 'León', color: 'bg-amber-100 text-amber-600 border-amber-300' },
  { emoji: '🐶', name: 'Perrito', color: 'bg-orange-100 text-orange-600 border-orange-300' },
  { emoji: '🐱', name: 'Gatito', color: 'bg-rose-100 text-rose-600 border-rose-300' },
  { emoji: '🐸', name: 'Ranita', color: 'bg-emerald-100 text-emerald-600 border-emerald-300' },
  { emoji: '🐼', name: 'Panda', color: 'bg-slate-100 text-slate-700 border-slate-300' },
  { emoji: '🦊', name: 'Zorrito', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { emoji: '🐰', name: 'Conejito', color: 'bg-pink-100 text-pink-600 border-pink-300' },
  { emoji: '🐧', name: 'Pingüino', color: 'bg-cyan-100 text-cyan-600 border-cyan-300' },
];

interface MemoryGameProps {
  onBack: () => void;
  onEarnStar?: () => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ onBack, onEarnStar }) => {
  const [difficulty, setDifficulty] = useState<4 | 6 | 8>(6);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const initGame = (pairsCount: 4 | 6 | 8 = difficulty) => {
    const selectedAnimals = ANIMAL_PAIRS.slice(0, pairsCount);
    const deck: Card[] = [];

    selectedAnimals.forEach((animal, index) => {
      // First copy
      deck.push({
        id: index * 2,
        emoji: animal.emoji,
        name: animal.name,
        color: animal.color,
        isFlipped: false,
        isMatched: false,
      });
      // Second copy
      deck.push({
        id: index * 2 + 1,
        emoji: animal.emoji,
        name: animal.name,
        color: animal.color,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle deck
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
    setIsLocked(false);
  };

  useEffect(() => {
    initGame(difficulty);
  }, [difficulty]);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    const clicked = cards[index];
    if (clicked.isFlipped || clicked.isMatched) return;

    playCardFlip();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.emoji === secondCard.emoji) {
        // MATCH!
        setTimeout(() => {
          playSuccessMatch();
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards([...newCards]);
          setFlippedIndices([]);
          setIsLocked(false);

          const newMatches = matches + 1;
          setMatches(newMatches);

          if (newMatches === difficulty) {
            // GAME WON!
            setIsWon(true);
            playCelebration();
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
            if (onEarnStar) onEarnStar();
          }
        }, 400);
      } else {
        // NO MATCH -> Flip back
        setTimeout(() => {
          playPop(260);
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 850);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-sky-100 via-purple-50 to-emerald-50 p-4 sm:p-6 overflow-y-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-purple-700 font-kids text-sm font-semibold shadow-xs hover:bg-white active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-kids text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
            🧠 Mejora la memoria
          </span>
          <button
            onClick={() => initGame()}
            title="Reiniciar"
            className="p-1.5 rounded-full bg-white text-slate-600 hover:text-purple-600 shadow-xs active:rotate-180 transition-transform"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Game Title & Difficulty */}
      <div className="text-center mb-3">
        <h2 className="font-kids text-2xl font-bold text-purple-900 tracking-tight flex items-center justify-center gap-2">
          <span>🐾 Parejas de Animalitos</span>
        </h2>
        <p className="text-xs text-purple-600 font-medium mt-0.5">
          ¡Encuentra los dos animalitos iguales para ganar estrellas!
        </p>

        {/* Difficulty Selector */}
        <div className="flex items-center justify-center gap-2 mt-2.5">
          {([4, 6, 8] as const).map((level) => (
            <button
              key={level}
              onClick={() => {
                setDifficulty(level);
                playPop(480);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold font-kids transition-all ${
                difficulty === level
                  ? 'bg-purple-600 text-white shadow-sm scale-105'
                  : 'bg-white/80 text-purple-700 hover:bg-white'
              }`}
            >
              {level === 4 ? 'Facilito (4)' : level === 6 ? 'Divertido (6)' : 'Campeón (8)'}
            </button>
          ))}
        </div>
      </div>

      {/* Score Tracker */}
      <div className="flex items-center justify-around bg-white/80 backdrop-blur-xs rounded-2xl p-2.5 mb-4 shadow-xs border border-purple-100 max-w-sm mx-auto w-full">
        <div className="text-center">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Intentos</span>
          <span className="font-kids text-lg font-bold text-purple-700">{moves}</span>
        </div>
        <div className="h-6 w-px bg-purple-200" />
        <div className="text-center">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Parejas</span>
          <span className="font-kids text-lg font-bold text-emerald-600">
            {matches} / {difficulty}
          </span>
        </div>
        <div className="h-6 w-px bg-purple-200" />
        <div className="text-center">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">Estrellas</span>
          <div className="flex items-center gap-0.5 justify-center">
            <Star className={`w-4 h-4 fill-amber-400 text-amber-500`} />
            <Star className={`w-4 h-4 ${moves <= difficulty * 2.2 ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} />
            <Star className={`w-4 h-4 ${moves <= difficulty * 1.5 ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className={`grid gap-2.5 sm:gap-3 mx-auto w-full max-w-md flex-1 items-center justify-center ${
          difficulty === 4
            ? 'grid-cols-4 max-w-xs'
            : difficulty === 6
            ? 'grid-cols-3 sm:grid-cols-4'
            : 'grid-cols-4'
        }`}
      >
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            disabled={card.isMatched || isLocked}
            className={`aspect-square rounded-2xl border-2 transition-all duration-300 transform perspective-1000 flex flex-col items-center justify-center p-1.5 sm:p-2 select-none relative shadow-sm ${
              card.isFlipped || card.isMatched
                ? `${card.color} rotate-y-0 scale-100 shadow-md`
                : 'bg-white hover:bg-purple-50 border-purple-200 hover:border-purple-300 hover:scale-105 active:scale-95'
            } ${card.isMatched ? 'opacity-85 ring-2 ring-emerald-400' : ''}`}
          >
            {card.isFlipped || card.isMatched ? (
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl animate-bounce leading-none drop-shadow-xs">
                  {card.emoji}
                </span>
                <span className="text-[10px] font-bold font-kids mt-1 opacity-90 truncate max-w-[60px]">
                  {card.name}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center opacity-70">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-[10px] font-bold font-kids text-purple-500 mt-0.5">?</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Win Banner Modal */}
      {isWon && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 text-center max-w-xs w-full shadow-2xl border-4 border-amber-300 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Trophy className="w-9 h-9 text-amber-500" />
            </div>
            <h3 className="font-kids text-2xl font-bold text-purple-900">¡Genial! ¡Lo lograste!</h3>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Completaste todas las parejas en {moves} movimientos. ¡Tu memoria es fantástica!
            </p>
            <div className="flex items-center justify-center gap-1.5 my-4">
              <Star className="w-7 h-7 fill-amber-400 text-amber-500 animate-bounce" />
              <Star className="w-8 h-8 fill-amber-400 text-amber-500 animate-bounce delay-100" />
              <Star className="w-7 h-7 fill-amber-400 text-amber-500 animate-bounce delay-200" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => initGame()}
                className="flex-1 py-2.5 px-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-kids font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Jugar otra vez
              </button>
              <button
                onClick={onBack}
                className="py-2.5 px-4 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-kids font-bold text-sm active:scale-95 transition-all"
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
