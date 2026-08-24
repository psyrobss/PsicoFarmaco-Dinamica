import React, { useEffect, useRef } from 'react';
import { GlossaryTerm } from '../types';
import { X, BookOpen } from 'lucide-react';
import * as motion from 'motion/react-client';

interface GlossaryModalProps {
  term: GlossaryTerm | null;
  onClose: () => void;
}

export function GlossaryModal({ term, onClose }: GlossaryModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and escape key management
  useEffect(() => {
    if (term) {
      closeButtonRef.current?.focus();
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [term, onClose]);

  if (!term) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end px-4 sm:px-0 sm:pr-8 bg-slate-900/20 backdrop-blur-sm" aria-modal="true" role="dialog">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="w-full max-w-sm bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-slate-200"
      >
        <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-200" />
            <h2 className="font-bold text-lg">Glossário Rápido</h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-1 rounded-full hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-white outline-none"
            aria-label="Fechar glossário"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{term.term}</h3>
          <p className="text-slate-700 leading-relaxed font-medium">
            {term.definition}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
