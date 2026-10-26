import React from 'react';
import { ArrowLeft, Star, Sparkles, ChevronRight, Volume2, Shield } from 'lucide-react';
import { playPop, playStarSparkle } from '../utils/audio';

interface WorldsHubProps {
  onBack: () => void;
  onSelectGame: (gameId: 'memory' | 'creative' | 'logic' | 'concentration' | 'autonomy') => void;
  onOpenParents: () => void;
  starsCount: number;
}

const WORLDS = [
  {
    id: 'memory' as const,
    title: 'Mundo Memoria',
    badge: '🧠 Mejora la memoria',
    desc: 'Empareja los tiernos animalitos y entrena tu mente',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-900',
    icon: '🐾',
    actionText: 'Jugar Parejas',
  },
  {
    id: 'creative' as const,
    title: 'Mundo Creativo',
    badge: '💡 Estimula la creatividad',
    desc: 'Pinta arcoíris mágicos, estrellas y pega sellos',
    color: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-950',
    icon: '🎨',
    actionText: 'Crear Arte',
  },
  {
    id: 'logic' as const,
    title: 'Mundo Lógica',
    badge: '🧩 Pensamiento lógico',
    desc: 'Encaja las figuras geométricas y descubre patrones',
    color: 'from-emerald-400 to-teal-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    textColor: 'text-emerald-950',
    icon: '🧩',
    actionText: 'Armar Formas',
  },
  {
    id: 'concentration' as const,
    title: 'Mundo Concentración',
    badge: '💖 Aumenta la concentración',
    desc: 'Escucha y repite la melodía de las campanitas',
    color: 'from-rose-400 to-pink-600',
    bgColor: 'bg-rose-50 border-rose-200',
    textColor: 'text-rose-950',
    icon: '🔔',
    actionText: 'Tocar Campanas',
  },
  {
    id: 'autonomy' as const,
    title: 'Mundo Autonomía',
    badge: '⭐ Fomenta la autonomía',
    desc: 'Viste a tus amigos, limpia dientes y prepara desayunos',
    color: 'from-blue-400 to-cyan-600',
    bgColor: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-950',
    icon: '🌟',
    actionText: 'Mis Rutinas',
  },
];

export const WorldsHub: React.FC<WorldsHubProps> = ({
  onBack,
  onSelectGame,
  onOpenParents,
  starsCount,
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-sky-100 via-purple-50 to-emerald-50 p-4 sm:p-5 overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-4 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-purple-700 font-kids text-sm font-semibold shadow-xs hover:bg-white active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Inicio</span>
        </button>

        {/* Stars Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-kids font-bold text-xs shadow-xs">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span>{starsCount} Estrellas</span>
        </div>

        {/* Parents Gate Button */}
        <button
          onClick={onOpenParents}
          className="p-2 rounded-full bg-white text-slate-600 hover:text-purple-600 shadow-xs active:scale-95 transition-transform"
          title="Zona de Padres"
        >
          <Shield className="w-4 h-4" />
        </button>
      </div>

      {/* Title */}
      <div className="text-center mb-4 shrink-0">
        <h2 className="font-kids text-2xl sm:text-3xl font-bold text-purple-900 tracking-tight">
          ¡Explora los Mini Mundos!
        </h2>
        <p className="text-xs text-purple-600 font-medium mt-0.5">
          Elige una aventura para aprender y divertirte hoy:
        </p>
      </div>

      {/* Worlds List Cards */}
      <div className="space-y-3 max-w-md mx-auto w-full pb-4">
        {WORLDS.map((world) => (
          <div
            key={world.id}
            onClick={() => {
              playPop(480);
              onSelectGame(world.id);
            }}
            className={`cursor-pointer rounded-3xl p-3.5 border-2 ${world.bgColor} shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between gap-3 group`}
          >
            <div className="flex items-center gap-3">
              {/* World Round Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${world.color} flex items-center justify-center text-3xl shadow-sm text-white shrink-0 group-hover:scale-105 transition-transform`}
              >
                {world.icon}
              </div>

              {/* World Info */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                  {world.badge}
                </span>
                <h3 className={`font-kids text-lg font-bold ${world.textColor} leading-tight`}>
                  {world.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                  {world.desc}
                </p>
              </div>
            </div>

            {/* Play Button Trigger */}
            <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-purple-600 shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
