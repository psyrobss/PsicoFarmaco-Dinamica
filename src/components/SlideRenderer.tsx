import React, { useEffect, useState, useRef } from 'react';
import { Slide } from '../types';
import { AudioDescriber } from './AudioDescriber';
import { Lightbulb, Brain, Volume2, VolumeX, Edit3 } from 'lucide-react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { glossary } from '../data/content';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { DoseResponseCurve } from './DoseResponseCurve';
import { GPCRPlaceholder } from './GPCRPlaceholder';

interface SlideRendererProps {
  slide: Slide;
  onTermClick: (term: string) => void;
}

const renderTextWithGlossary = (text: string, onTermClick: (term: string) => void) => {
  // Sort terms by length descending to match longer phrases first
  const terms = glossary.flatMap(g => [g.term, ...g.aliases]).sort((a, b) => b.length - a.length);
  // Boundary matching that supports punctuation and accents
  const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
  
  const parts = text.split(regex);
  return parts.map((part, i) => {
    const lowerPart = part.toLowerCase();
    const matchedTerm = glossary.find(g => g.term.toLowerCase() === lowerPart || g.aliases.some(a => a.toLowerCase() === lowerPart));
    
    if (matchedTerm) {
      return (
        <button
          key={i}
          onClick={() => onTermClick(matchedTerm.term)}
          className="text-blue-600 font-semibold underline decoration-blue-300 decoration-2 underline-offset-4 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded px-0.5"
          aria-label={`Ver definição de ${part}`}
        >
          {part}
        </button>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

export function SlideRenderer({ slide, onTermClick }: SlideRendererProps) {
  const { autoRead, speechRate, speechVolume } = useAccessibility();
  const [isNarrating, setIsNarrating] = useState(autoRead);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [notes, setNotes] = useState(() => localStorage.getItem(`slide_notes_${slide.id}`) || '');
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    setIsNarrating(autoRead);
  }, [autoRead, slide.id]);

  useEffect(() => {
    localStorage.setItem(`slide_notes_${slide.id}`, notes);
  }, [notes, slide.id]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!isNarrating || !synthRef.current) {
      if (synthRef.current) synthRef.current.cancel();
      return;
    }

    synthRef.current.cancel(); // Stop previous utterances

    const textToRead = [
      slide.subtitle || 'Conceitos Fundamentais',
      slide.title,
      ...slide.content,
      slide.analogy ? `Analogia Clínica: ${slide.analogy}` : '',
      slide.psychologyNote ? `Nota Técnica: ${slide.psychologyNote}` : '',
      slide.imageAlt ? `Descrição da Imagem: ${slide.imageAlt}` : '',
      slide.audioDescription || ''
    ].filter(Boolean).join('. ');

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = speechRate;
    utterance.volume = speechVolume;
    
    synthRef.current.speak(utterance);

    utterance.onend = () => {
      // Optional: turn off narration when done, or keep state to auto-read next slide
      // Not turning off state allows continuous reading on next slide
    };

  }, [slide, isNarrating, speechRate, speechVolume]);

  const toggleNarration = () => {
    setIsNarrating(prev => !prev);
  };

  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl mx-auto flex flex-col flex-1"
      role="region"
      aria-label={`Slide ${slide.id}: ${slide.title}`}
    >
      <header className="relative pr-12">
        <button 
          onClick={toggleNarration}
          className="absolute top-0 right-0 p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          aria-label={isNarrating ? "Desativar narração" : "Ativar narração"}
          title={isNarrating ? "Desativar narração" : "Ativar narração"}
        >
          {isNarrating ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">{slide.subtitle || 'Conceitos Fundamentais'}</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
          {slide.title}
        </h2>
      </header>

      <section className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex-1 space-y-6">
          <ul className="space-y-4">
            {slide.content.map((item, idx) => (
              <li key={idx} className="flex text-xl text-slate-700 leading-relaxed">
                <span className="text-blue-500 mr-3 mt-1.5 font-bold">•</span>
                <span>{renderTextWithGlossary(item, onTermClick)}</span>
              </li>
            ))}
          </ul>

          {slide.analogy && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mt-8">
              <h3 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" aria-hidden="true" />
                Analogia Clínica
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed">{renderTextWithGlossary(slide.analogy, onTermClick)}</p>
            </div>
          )}
        </div>

        {/* Optional Media or Psycho Note Sidebar */}
        <aside className="w-full lg:w-[380px] space-y-4 shrink-0">
          {slide.title.includes("Curva Concentração-Resposta") ? (
            <div className="relative group">
              <DoseResponseCurve />
              {slide.audioDescription && (
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <AudioDescriber text={slide.audioDescription} />
                </div>
              )}
            </div>
          ) : slide.title.includes("Proteína G") ? (
            <div className="relative group">
              <GPCRPlaceholder />
              {slide.audioDescription && (
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <AudioDescriber text={slide.audioDescription} />
                </div>
              )}
            </div>
          ) : slide.imageUrl && (
            <>
              <div 
                className="aspect-video bg-slate-100 rounded-lg flex flex-col items-center justify-center border border-slate-200 shadow-sm relative group overflow-hidden cursor-pointer"
                onClick={() => setIsImageOpen(true)}
              >
                <img src={slide.imageUrl} alt={slide.imageAlt || 'Ilustração do conceito'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all shadow-md">
                    <ZoomIn className="w-6 h-6 text-slate-800" />
                  </div>
                </div>
                {slide.audioDescription && (
                  <div className="absolute bottom-3 right-3 z-10">
                    <AudioDescriber text={slide.audioDescription} />
                  </div>
                )}
              </div>

              <AnimatePresence>
                {isImageOpen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-slate-900/95 backdrop-blur-sm"
                    onClick={() => setIsImageOpen(false)}
                  >
                    <button 
                      className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                      onClick={() => setIsImageOpen(false)}
                    >
                      <X className="w-8 h-8" />
                    </button>
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="relative max-w-5xl max-h-[85vh] w-full bg-slate-900 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center"
                      onClick={e => e.stopPropagation()}
                    >
                      <img 
                        src={slide.imageUrl} 
                        alt={slide.imageAlt || 'Ilustração expandida'} 
                        className="max-w-full max-h-[85vh] object-contain"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {slide.psychologyNote && (
            <div className="p-5 bg-slate-800 text-slate-100 rounded-xl shadow-inner">
              <h4 className="text-xs uppercase tracking-widest font-bold text-blue-400 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Nota Técnica
              </h4>
              <p className="text-sm leading-relaxed opacity-90">
                {renderTextWithGlossary(slide.psychologyNote, onTermClick)}
              </p>
            </div>
          )}

          <div className="mt-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
              <Edit3 className="w-4 h-4" /> Minhas Notas
            </h4>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Digite suas reflexões ou analogias aqui..."
              className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none min-h-[100px]"
              aria-label="Anotações pessoais para este slide"
            />
          </div>
        </aside>
      </section>
    </motion.div>
  );
}
