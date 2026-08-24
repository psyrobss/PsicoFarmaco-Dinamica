import React from 'react';
import { Settings, Type, Contrast, Volume2, X } from 'lucide-react';
import * as motion from 'motion/react-client';
import { useAccessibility } from '../contexts/AccessibilityContext';

export function AccessibilitySettings({ onClose }: { onClose: () => void }) {
  const { 
    fontSize, setFontSize, 
    highContrast, setHighContrast, 
    autoRead, setAutoRead,
    speechRate, setSpeechRate,
    speechVolume, setSpeechVolume
  } = useAccessibility();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-4 top-16 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Acessibilidade
        </h3>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Font Size */}
        <div>
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
            <Type className="w-4 h-4" /> Tamanho da Fonte
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setFontSize('normal')}
              className={`flex-1 py-1 px-2 rounded border text-sm ${fontSize === 'normal' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
            >
              Normal
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`flex-1 py-1 px-2 rounded border text-sm ${fontSize === 'large' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
            >
              Grande
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`flex-1 py-1 px-2 rounded border text-sm ${fontSize === 'xlarge' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
            >
              Extra
            </button>
          </div>
        </div>

        {/* High Contrast */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 cursor-pointer" htmlFor="toggle-contrast">
            <Contrast className="w-4 h-4" /> Alto Contraste
          </label>
          <input
            id="toggle-contrast"
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
        </div>

        {/* Auto Read */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 cursor-pointer" htmlFor="toggle-autoread">
            <Volume2 className="w-4 h-4" /> Leitura Automática
          </label>
          <input
            id="toggle-autoread"
            type="checkbox"
            checked={autoRead}
            onChange={(e) => setAutoRead(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
        </div>

        {/* Speech Rate & Volume Controls */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-600 flex justify-between mb-1" htmlFor="speech-rate">
              <span>Velocidade da Voz</span>
              <span>{speechRate.toFixed(1)}x</span>
            </label>
            <input
              id="speech-rate"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 flex justify-between mb-1" htmlFor="speech-volume">
              <span>Volume da Voz</span>
              <span>{Math.round(speechVolume * 100)}%</span>
            </label>
            <input
              id="speech-volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={speechVolume}
              onChange={(e) => setSpeechVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
