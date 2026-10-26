import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { WorldsHub } from './components/WorldsHub';
import { MemoryGame } from './components/games/MemoryGame';
import { CreativeGame } from './components/games/CreativeGame';
import { LogicGame } from './components/games/LogicGame';
import { ConcentrationGame } from './components/games/ConcentrationGame';
import { AutonomyGame } from './components/games/AutonomyGame';
import { ExpoCodeModal } from './components/ExpoCodeModal';
import { ParentsModal } from './components/ParentsModal';
import { setMuted, getMuted, playPop, playStarSparkle } from './utils/audio';
import {
  Volume2,
  VolumeX,
  Smartphone,
  Maximize2,
  Shield,
  Star,
  Eye,
  X,
  Code2,
} from 'lucide-react';

type ScreenView =
  | 'home'
  | 'worlds'
  | 'game_memory'
  | 'game_creative'
  | 'game_logic'
  | 'game_concentration'
  | 'game_autonomy';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('home');
  const [isExpoModalOpen, setIsExpoModalOpen] = useState(false);
  const [isParentsModalOpen, setIsParentsModalOpen] = useState(false);
  const [showOriginalImageModal, setShowOriginalImageModal] = useState(false);
  const [starsCount, setStarsCount] = useState<number>(() => {
    const saved = localStorage.getItem('mini_mundos_stars');
    return saved ? parseInt(saved, 10) : 12;
  });
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => getMuted());
  const [viewMode, setViewMode] = useState<'mobile' | 'fullscreen'>('mobile');

  useEffect(() => {
    localStorage.setItem('mini_mundos_stars', starsCount.toString());
  }, [starsCount]);

  const handleEarnStar = () => {
    setStarsCount((prev) => prev + 1);
    playStarSparkle();
  };

  const toggleSound = () => {
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    setMuted(nextState);
    if (!nextState) playPop(500);
  };

  const handleSelectPillar = (
    gameId: 'memory' | 'creative' | 'logic' | 'concentration' | 'autonomy'
  ) => {
    if (gameId === 'memory') setCurrentScreen('game_memory');
    else if (gameId === 'creative') setCurrentScreen('game_creative');
    else if (gameId === 'logic') setCurrentScreen('game_logic');
    else if (gameId === 'concentration') setCurrentScreen('game_concentration');
    else if (gameId === 'autonomy') setCurrentScreen('game_autonomy');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-purple-200">
      {/* ---------------------------------------------------- */}
      {/* GLOBAL TOP NAVIGATION & TOOLBAR                     */}
      {/* ---------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100/80 px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Brand mark */}
          <div
            onClick={() => {
              playPop(480);
              setCurrentScreen('home');
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C4DFF] to-[#FF4988] flex items-center justify-center text-white text-lg font-kids font-bold shadow-xs group-hover:scale-105 transition-transform">
              ✨
            </div>
            <div>
              <span className="font-kids font-bold text-lg sm:text-xl text-purple-900 group-hover:text-purple-700 transition-colors">
                Mini Mundos!
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-purple-600 font-medium">
                · Pequeños juegos, grandes descubrimientos
              </span>
            </div>
          </div>

          {/* Quick Actions & Toggles */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stars Count Badge */}
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-kids text-xs font-bold shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{starsCount}</span>
            </div>

            {/* View Mode Toggle (Mobile Mockup vs Full Screen) */}
            <button
              onClick={() => {
                playPop(460);
                setViewMode((prev) => (prev === 'mobile' ? 'fullscreen' : 'mobile'));
              }}
              title={viewMode === 'mobile' ? 'Ver en Pantalla Completa' : 'Ver en Maqueta Móvil'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-kids bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              {viewMode === 'mobile' ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden md:inline">Pantalla Completa</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-purple-600" />
                  <span className="hidden md:inline">Vista Móvil</span>
                </>
              )}
            </button>

            {/* Inspect Original Image Button */}
            <button
              onClick={() => {
                playPop(480);
                setShowOriginalImageModal(true);
              }}
              title="Comparar con la imagen de referencia"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold font-kids bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Ver Original</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isAudioMuted ? 'Activar Sonidos' : 'Silenciar'}
              className={`p-2 rounded-full transition-colors ${
                isAudioMuted
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Parents Area */}
            <button
              onClick={() => {
                playPop(420);
                setIsParentsModalOpen(true);
              }}
              title="Zona de Padres y Educadores"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold font-kids bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-xs active:scale-95"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Padres</span>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* MAIN VIEWPORT CANVAS                                */}
      {/* ---------------------------------------------------- */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {viewMode === 'mobile' ? (
          /* Phone Frame Container */
          <div className="w-full max-w-md flex flex-col items-center py-2 animate-in fade-in duration-300">
            {currentScreen === 'home' && (
              <HomeScreen
                onStart={() => setCurrentScreen('worlds')}
                onOpenExpoCode={() => setIsExpoModalOpen(true)}
                onOpenParents={() => setIsParentsModalOpen(true)}
                onSelectPillar={handleSelectPillar}
              />
            )}

            {currentScreen !== 'home' && (
              <div className="relative w-full max-w-[390px] h-[780px] sm:h-[810px] rounded-[48px] bg-black p-3.5 shadow-2xl shadow-purple-950/20 ring-1 ring-slate-800/80 transition-all select-none">
                <div className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col bg-white">
                  {/* Status Bar */}
                  <div className="pt-3 px-7 pb-2 flex items-center justify-between text-slate-800 font-semibold text-xs select-none bg-white/70 backdrop-blur-xs">
                    <span className="font-bold tracking-tight text-[13px]">9:41</span>
                    <div className="w-24 h-5 bg-black rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <div className="w-0.5 h-2 bg-slate-800" />
                      <div className="w-4 h-2 rounded-xs border border-slate-800 bg-slate-800" />
                    </div>
                  </div>

                  {/* Active Screen inside mobile frame */}
                  <div className="flex-1 overflow-hidden">
                    {currentScreen === 'worlds' && (
                      <WorldsHub
                        onBack={() => setCurrentScreen('home')}
                        onSelectGame={handleSelectPillar}
                        onOpenParents={() => setIsParentsModalOpen(true)}
                        starsCount={starsCount}
                      />
                    )}
                    {currentScreen === 'game_memory' && (
                      <MemoryGame
                        onBack={() => setCurrentScreen('worlds')}
                        onEarnStar={handleEarnStar}
                      />
                    )}
                    {currentScreen === 'game_creative' && (
                      <CreativeGame
                        onBack={() => setCurrentScreen('worlds')}
                        onEarnStar={handleEarnStar}
                      />
                    )}
                    {currentScreen === 'game_logic' && (
                      <LogicGame
                        onBack={() => setCurrentScreen('worlds')}
                        onEarnStar={handleEarnStar}
                      />
                    )}
                    {currentScreen === 'game_concentration' && (
                      <ConcentrationGame
                        onBack={() => setCurrentScreen('worlds')}
                        onEarnStar={handleEarnStar}
                      />
                    )}
                    {currentScreen === 'game_autonomy' && (
                      <AutonomyGame
                        onBack={() => setCurrentScreen('worlds')}
                        onEarnStar={handleEarnStar}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Full Screen Responsive Experience (Ideal for classroom/playroom desktop & tablet) */
          <div className="w-full max-w-4xl min-h-[680px] bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden flex flex-col animate-in fade-in duration-300">
            {currentScreen === 'home' && (
              <div className="p-6 flex flex-col items-center">
                <HomeScreen
                  onStart={() => setCurrentScreen('worlds')}
                  onOpenExpoCode={() => setIsExpoModalOpen(true)}
                  onOpenParents={() => setIsParentsModalOpen(true)}
                  onSelectPillar={handleSelectPillar}
                />
              </div>
            )}
            {currentScreen === 'worlds' && (
              <WorldsHub
                onBack={() => setCurrentScreen('home')}
                onSelectGame={handleSelectPillar}
                onOpenParents={() => setIsParentsModalOpen(true)}
                starsCount={starsCount}
              />
            )}
            {currentScreen === 'game_memory' && (
              <MemoryGame
                onBack={() => setCurrentScreen('worlds')}
                onEarnStar={handleEarnStar}
              />
            )}
            {currentScreen === 'game_creative' && (
              <CreativeGame
                onBack={() => setCurrentScreen('worlds')}
                onEarnStar={handleEarnStar}
              />
            )}
            {currentScreen === 'game_logic' && (
              <LogicGame
                onBack={() => setCurrentScreen('worlds')}
                onEarnStar={handleEarnStar}
              />
            )}
            {currentScreen === 'game_concentration' && (
              <ConcentrationGame
                onBack={() => setCurrentScreen('worlds')}
                onEarnStar={handleEarnStar}
              />
            )}
            {currentScreen === 'game_autonomy' && (
              <AutonomyGame
                onBack={() => setCurrentScreen('worlds')}
                onEarnStar={handleEarnStar}
              />
            )}
          </div>
        )}
      </main>

      {/* ---------------------------------------------------- */}
      {/* EXPO / REACT NATIVE CODE MODAL                      */}
      {/* ---------------------------------------------------- */}
      <ExpoCodeModal
        isOpen={isExpoModalOpen}
        onClose={() => setIsExpoModalOpen(false)}
      />

      {/* ---------------------------------------------------- */}
      {/* PARENTS & EDUCATORS MODAL                           */}
      {/* ---------------------------------------------------- */}
      <ParentsModal
        isOpen={isParentsModalOpen}
        onClose={() => setIsParentsModalOpen(false)}
        starsCount={starsCount}
        onResetProgress={() => setStarsCount(0)}
      />

      {/* ---------------------------------------------------- */}
      {/* ORIGINAL REFERENCE IMAGE INSPECTION MODAL           */}
      {/* ---------------------------------------------------- */}
      {showOriginalImageModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-4 flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-kids font-bold text-sm text-purple-950">
                Imagen de Referencia Original
              </h3>
              <button
                onClick={() => setShowOriginalImageModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="my-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 flex items-center justify-center max-h-[70vh]">
              <img
                src="/assets/aistudio/Image_1_e650e5ad.png"
                alt="Mini Mundos Original Screenshot"
                className="max-h-[68vh] w-auto object-contain rounded-xl"
              />
            </div>
            <p className="text-[11px] text-slate-500 text-center font-medium">
              Esta es la captura original subida por el usuario para fidelidad visual.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
