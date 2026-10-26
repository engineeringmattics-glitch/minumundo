import React, { useState } from 'react';
import { X, Award, ShieldCheck, Heart, Sparkles, BookOpen, Clock, RefreshCw } from 'lucide-react';
import { playPop } from '../utils/audio';

interface ParentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  starsCount: number;
  onResetProgress: () => void;
}

export const ParentsModal: React.FC<ParentsModalProps> = ({
  isOpen,
  onClose,
  starsCount,
  onResetProgress,
}) => {
  const [passedGate, setPassedGate] = useState(false);
  const [answer, setAnswer] = useState('');
  const [gateQuestion] = useState({ q: '¿Cuánto es 4 + 3?', expected: '7' });

  if (!isOpen) return null;

  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() === gateQuestion.expected) {
      setPassedGate(true);
      playPop(520);
    } else {
      alert('Respuesta incorrecta. Intenta nuevamente.');
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-purple-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-purple-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            <h3 className="font-kids font-bold text-lg text-purple-950">Zona de Padres y Educadores</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-purple-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!passedGate ? (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3 text-2xl">
              🔒
            </div>
            <h4 className="font-kids text-xl font-bold text-purple-950 mb-2">Control Parental</h4>
            <p className="text-xs text-slate-600 mb-4">
              Para acceder al panel de progreso y configuración, por favor resuelve esta pequeña operación:
            </p>
            <form onSubmit={handleVerifyGate} className="max-w-xs mx-auto">
              <label className="block font-kids text-base font-semibold text-purple-800 mb-2">
                {gateQuestion.q}
              </label>
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Escribe el resultado"
                className="w-full text-center px-4 py-2 border-2 border-purple-200 rounded-xl text-lg font-bold text-purple-900 focus:outline-hidden focus:border-purple-500 mb-3"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-kids font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Entrar al Panel
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-4">
            {/* Stars & Progress Summary */}
            <div className="bg-gradient-to-r from-amber-50 to-purple-50 rounded-2xl p-4 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Progreso Global</span>
                <span className="font-kids text-2xl font-bold text-purple-900">{starsCount} Estrellas Ganadas</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-xl shadow-md">
                ⭐
              </div>
            </div>

            {/* Cognitive Pillars Breakdown */}
            <div>
              <h4 className="font-kids text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                Áreas de Desarrollo Estimuladas
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">🧠 Memoria de trabajo y retención</span>
                  <span className="font-bold text-purple-600 font-kids">Parejas Animales</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">💡 Creatividad y motricidad fina</span>
                  <span className="font-bold text-amber-600 font-kids">Lienzo y Sellos</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">🧩 Pensamiento lógico y clasificación</span>
                  <span className="font-bold text-emerald-600 font-kids">Formas y Series</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">💖 Concentración y atención sostenida</span>
                  <span className="font-bold text-rose-600 font-kids">Campanas Musicales</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">⭐ Autonomía y rutinas cotidianas</span>
                  <span className="font-bold text-blue-600 font-kids">Vestimenta y Salud</span>
                </div>
              </div>
            </div>

            {/* Pedagogical Guidance */}
            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
              <h5 className="font-kids font-bold text-sky-950 text-xs flex items-center gap-1.5 mb-1">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span>Consejo Pedagógico de Mini Mundos</span>
              </h5>
              <p className="text-xs text-sky-800 leading-relaxed">
                Complementa las actividades digitales en el mundo real: invita al niño a ordenar sus juguetes por color (lógica), contar una pequeña historia sobre su dibujo (creatividad) o practicar cepillarse los dientes juntos frente al espejo (autonomía).
              </p>
            </div>

            {/* Reset button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  if (confirm('¿Deseas reiniciar las estrellas acumuladas?')) {
                    onResetProgress();
                    alert('Progreso reiniciado correctamente.');
                  }
                }}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reiniciar progreso de estrellas</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
