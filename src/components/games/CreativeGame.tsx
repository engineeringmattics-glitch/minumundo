import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPop, playChime, playStarSparkle, playCelebration } from '../../utils/audio';
import { ArrowLeft, RotateCcw, Download, Sparkles, Paintbrush, Eraser, Undo, Stamp } from 'lucide-react';

interface CreativeGameProps {
  onBack: () => void;
  onEarnStar?: () => void;
}

const PALETTE = [
  '#FF4B72', // Strawberry Pink
  '#FF7E36', // Bright Tangerine
  '#FFD21F', // Sunshine Yellow
  '#4ADE80', // Mint Green
  '#22D3EE', // Sky Blue
  '#3B82F6', // Royal Blue
  '#8B5CF6', // Magic Purple
  '#EC4899', // Cotton Candy
  '#A855F7', // Deep Violet
  '#78350F', // Warm Brown
  '#0F172A', // Midnight Black
  '#FFFFFF', // Pure White
];

const STAMPS = ['⭐', '🌈', '🌸', '🚀', '🐱', '👑', '🎈', '💖'];

const TEMPLATES = [
  { id: 'rainbow', name: 'Arcoíris', icon: '🌈' },
  { id: 'star', name: 'Estrellita', icon: '⭐' },
  { id: 'dino', name: 'Dino Amigo', icon: '🦕' },
  { id: 'rocket', name: 'Cohete', icon: '🚀' },
  { id: 'blank', name: 'Lienzo Libre', icon: '✨' },
];

export const CreativeGame: React.FC<CreativeGameProps> = ({ onBack, onEarnStar }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [brushSize, setBrushSize] = useState<number>(10);
  const [activeTool, setActiveTool] = useState<'brush' | 'eraser' | 'stamp'>('brush');
  const [selectedStamp, setSelectedStamp] = useState(STAMPS[0]);
  const [activeTemplate, setActiveTemplate] = useState('rainbow');
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution backing store
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    loadTemplate(activeTemplate);
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), state]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    playPop(300);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    ctx.putImageData(previousState, 0, 0);
  };

  const loadTemplate = (templateId: string) => {
    setActiveTemplate(templateId);
    playPop(480);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width / 2;
    const height = canvas.height / 2;

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (templateId === 'rainbow') {
      // Draw template rainbow arc outlines
      ctx.beginPath();
      ctx.arc(width / 2, height * 0.8, 120, Math.PI, 0, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, height * 0.8, 100, Math.PI, 0, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, height * 0.8, 80, Math.PI, 0, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, height * 0.8, 60, Math.PI, 0, false);
      ctx.stroke();

      // Cloud outlines
      ctx.beginPath();
      ctx.arc(width / 2 - 120, height * 0.78, 25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2 + 120, height * 0.78, 25, 0, Math.PI * 2);
      ctx.stroke();
    } else if (templateId === 'star') {
      // Big friendly star outline
      const cx = width / 2;
      const cy = height / 2;
      ctx.beginPath();
      const points = 5;
      const outerR = 90;
      const innerR = 45;
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Star smile
      ctx.beginPath();
      ctx.arc(cx - 15, cy - 10, 5, 0, Math.PI * 2);
      ctx.arc(cx + 15, cy - 10, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#9CA3AF';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy + 5, 12, 0, Math.PI);
      ctx.stroke();
    } else if (templateId === 'dino') {
      // Cute simple dino silhouette outline
      const cx = width / 2;
      const cy = height / 2;
      ctx.font = '80px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#E5E7EB';
      ctx.fillText('🦕', cx, cy);
    } else if (templateId === 'rocket') {
      const cx = width / 2;
      const cy = height / 2;
      ctx.font = '80px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#E5E7EB';
      ctx.fillText('🚀', cx, cy);
    }
    ctx.restore();

    setHistory([]);
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    saveState();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (activeTool === 'stamp') {
      playStarSparkle();
      ctx.font = `${brushSize * 3.5}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = activeTool === 'eraser' ? '#FFFFFF' : selectedColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool === 'stamp') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      playPop(380);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playCelebration();
    confetti({ particleCount: 50, spread: 60 });
    if (onEarnStar) onEarnStar();

    const link = document.createElement('a');
    link.download = `mi-obra-mini-mundos-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-amber-50 via-rose-50 to-purple-50 p-3 sm:p-5 overflow-y-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-purple-700 font-kids text-sm font-semibold shadow-xs hover:bg-white active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <span className="font-kids text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
          💡 Estimula la creatividad
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            title="Deshacer"
            className="p-1.5 rounded-full bg-white text-slate-600 hover:text-purple-600 shadow-xs disabled:opacity-40 active:scale-90 transition-all"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            title="Guardar Dibujo"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-kids font-bold text-xs shadow-xs active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Guardar</span>
          </button>
        </div>
      </div>

      {/* Template picker */}
      <div className="flex items-center justify-center gap-1.5 mb-2 overflow-x-auto py-1">
        {TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => loadTemplate(tmpl.id)}
            className={`px-2.5 py-1 rounded-full text-xs font-kids font-bold flex items-center gap-1 whitespace-nowrap transition-all ${
              activeTemplate === tmpl.id
                ? 'bg-amber-400 text-amber-950 shadow-xs scale-105'
                : 'bg-white/80 text-slate-600 hover:bg-white'
            }`}
          >
            <span>{tmpl.icon}</span>
            <span>{tmpl.name}</span>
          </button>
        ))}
      </div>

      {/* Canvas Area */}
      <div className="relative flex-1 w-full max-w-lg mx-auto bg-white rounded-3xl p-2 shadow-md border-4 border-amber-200 flex flex-col items-center justify-center min-h-[220px]">
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          className="w-full h-full rounded-2xl touch-none cursor-crosshair bg-white"
        />
      </div>

      {/* Toolbar / Controls */}
      <div className="mt-3 max-w-lg mx-auto w-full bg-white/90 backdrop-blur-xs rounded-2xl p-2.5 shadow-sm border border-amber-100 flex flex-col gap-2">
        {/* Tool modes: Brush, Eraser, Stamps */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setActiveTool('brush');
                playPop(440);
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-kids font-bold transition-all ${
                activeTool === 'brush'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Paintbrush className="w-3.5 h-3.5" />
              <span>Pincel</span>
            </button>

            <button
              onClick={() => {
                setActiveTool('stamp');
                playPop(480);
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-kids font-bold transition-all ${
                activeTool === 'stamp'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Stamp className="w-3.5 h-3.5" />
              <span>Sellos</span>
            </button>

            <button
              onClick={() => {
                setActiveTool('eraser');
                playPop(340);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-kids font-bold transition-all ${
                activeTool === 'eraser'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Borrador</span>
            </button>
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-1">
            {([6, 12, 22] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => {
                  setBrushSize(sz);
                  playPop(520);
                }}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  brushSize === sz ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <div
                  className="rounded-full bg-current"
                  style={{ width: `${sz / 2 + 2}px`, height: `${sz / 2 + 2}px` }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette or Stamp Carousel */}
        {activeTool === 'stamp' ? (
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
            {STAMPS.map((st) => (
              <button
                key={st}
                onClick={() => {
                  setSelectedStamp(st);
                  playPop(500);
                }}
                className={`text-2xl p-1.5 rounded-xl transition-all ${
                  selectedStamp === st
                    ? 'bg-amber-100 ring-2 ring-amber-400 scale-125'
                    : 'hover:bg-slate-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1.5 flex-wrap py-0.5">
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setSelectedColor(c);
                  setActiveTool('brush');
                  playPop(440);
                }}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-transform border-2 border-white shadow-xs ${
                  selectedColor === c && activeTool === 'brush'
                    ? 'scale-125 ring-2 ring-purple-500'
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
