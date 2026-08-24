import React, { useState, useEffect, useRef } from 'react';
import { slides, quizzes, glossary } from './data/content';
import { SlideRenderer } from './components/SlideRenderer';
import { Quiz } from './components/Quiz';
import { CaseStudies } from './components/CaseStudies';
import { GlossaryModal } from './components/GlossaryModal';
import { ProgressDashboard } from './components/ProgressDashboard';
import { Chatbot } from './components/Chatbot';
import { AccessibilitySettings } from './components/AccessibilitySettings';
import { ConceptGraph } from './components/ConceptGraph';
import { GlossaryTerm } from './types';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { BarChart3, Settings, Map, BookOpen, CheckCircle, BrainCircuit, ArrowLeft, ArrowRight, FileText } from 'lucide-react';

const LESSON_SIZE = 7;
const TOTAL_LESSONS = 4; // 0, 1, 2, 3

export default function App() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => 
    parseInt(localStorage.getItem('app_currentLessonIndex') || '0')
  );
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [viewState, setViewState] = useState<'lesson' | 'quiz' | 'cases' | 'progress' | 'map'>(() => 
    (localStorage.getItem('app_viewState') as any) || 'lesson'
  );
  
  const [activeQuizIndex, setActiveQuizIndex] = useState(() => 
    parseInt(localStorage.getItem('app_activeQuizIndex') || '0')
  );
    
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState<GlossaryTerm | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Persist state
  useEffect(() => {
    localStorage.setItem('app_currentLessonIndex', currentLessonIndex.toString());
    localStorage.setItem('app_viewState', viewState);
    localStorage.setItem('app_activeQuizIndex', activeQuizIndex.toString());
  }, [currentLessonIndex, viewState, activeQuizIndex]);

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [currentLessonIndex]);

  // Focus management for accessibility when views change
  useEffect(() => {
    const liveRegion = document.getElementById('a11y-announcer');
    if (liveRegion) {
      if (viewState === 'lesson') {
        liveRegion.textContent = `Lição ${currentLessonIndex + 1} iniciada.`;
      } else if (viewState === 'quiz') {
        liveRegion.textContent = `Avaliação formativa: ${quizzes[activeQuizIndex]?.title}`;
      } else if (viewState === 'cases') {
        liveRegion.textContent = `Estudos de Caso Finais. Aplique o que aprendeu.`;
      } else if (viewState === 'progress') {
        liveRegion.textContent = `Painel de Desempenho aberto.`;
      }
    }
    
    // Scroll to top when changing views or lessons
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [currentLessonIndex, viewState, activeQuizIndex]);

  const handleFinishLesson = () => {
    if (currentLessonIndex < 3) {
      setActiveQuizIndex(currentLessonIndex);
      setViewState('quiz');
    } else {
      setViewState('cases');
    }
  };

  const handleFinishQuiz = () => {
    if (currentLessonIndex < TOTAL_LESSONS - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setViewState('lesson');
    } else {
      setViewState('cases');
    }
  };

  const currentLessonSlides = slides.slice(
    currentLessonIndex * LESSON_SIZE, 
    (currentLessonIndex + 1) * LESSON_SIZE
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden selection:bg-blue-200">
      <div id="a11y-announcer" aria-live="polite" className="sr-only"></div>
      
      <nav className="h-16 flex-none flex items-center justify-between px-4 md:px-8 bg-white border-b border-slate-200 shadow-sm relative z-10">
        <button 
          onClick={() => {
            setViewState('lesson');
            setCurrentLessonIndex(0);
            setCurrentSlideIndex(0);
            if (mainRef.current) mainRef.current.scrollTop = 0;
          }}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left"
        >
          <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center text-white font-bold" aria-hidden="true">Ψ</div>
          <h1 className="text-lg font-bold tracking-tight hidden sm:block text-slate-800">
            PsicoFármaco <span className="font-normal text-slate-500">| Módulo 01</span>
          </h1>
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setViewState('cases')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Casos Práticos</span>
          </button>
          
          <button 
            onClick={() => setViewState(prev => prev === 'map' ? 'lesson' : 'map')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
          >
            <Map className="w-4 h-4" />
            <span className="hidden sm:inline">Mapa Mental</span>
          </button>
          
          <button 
            onClick={() => setViewState(prev => prev === 'progress' ? 'lesson' : 'progress')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">{viewState === 'progress' ? 'Voltar' : 'Desempenho'}</span>
          </button>
          
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Configurações de acessibilidade"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {isSettingsOpen && <AccessibilitySettings onClose={() => setIsSettingsOpen(false)} />}

          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Lição {currentLessonIndex + 1} de {TOTAL_LESSONS}
            </span>
            <div className="w-48 h-2 bg-slate-200 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500 ease-out" 
                style={{ width: `${((currentLessonIndex) / TOTAL_LESSONS) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <main ref={mainRef} className="flex-1 p-6 md:p-12 flex flex-col gap-8 overflow-y-auto scroll-smooth">
          <AnimatePresence mode="wait">
          {viewState === 'lesson' && (
            <motion.div 
              key="lesson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
            <div className="flex flex-col gap-16 pb-20 max-w-5xl mx-auto w-full">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-2xl shadow-sm mb-4">
                <h2 className="text-blue-900 font-bold text-2xl mb-2 flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  Lição {currentLessonIndex + 1}
                </h2>
                <p className="text-slate-700 text-lg">
                  Leia os conceitos abaixo em seu próprio ritmo. Ao final da página, você fará uma breve avaliação para fixar o conhecimento.
                </p>
              </div>

                            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Tópico {currentSlideIndex + 1} de {currentLessonSlides.length}
                </span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentLessonSlides[currentSlideIndex]?.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
                >
                  {currentLessonSlides[currentSlideIndex] && (
                    <SlideRenderer 
                      slide={currentLessonSlides[currentSlideIndex]} 
                      onTermClick={(termName) => {
                        const termObj = glossary.find(g => g.term === termName);
                        if (termObj) setSelectedGlossaryTerm(termObj);
                      }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 px-4 mt-8 pt-8 border-t border-slate-200">
                {currentSlideIndex > 0 ? (
                  <button 
                    onClick={() => {
                      setCurrentSlideIndex(prev => prev - 1);
                      if (mainRef.current) mainRef.current.scrollTop = 0;
                    }}
                    className="group flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-all px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 shadow-sm"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Tópico Anterior
                  </button>
                ) : (
                  <div className="w-48 hidden sm:block"></div>
                )}

                {currentSlideIndex < currentLessonSlides.length - 1 ? (
                  <button 
                    onClick={() => {
                      setCurrentSlideIndex(prev => prev + 1);
                      if (mainRef.current) mainRef.current.scrollTop = 0;
                    }}
                    className="group flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-bold transition-all px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
                  >
                    Próximo Tópico <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button 
                    onClick={handleFinishLesson}
                    className="group flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg shadow-green-900/20 transition-all transform hover:scale-105 active:scale-95"
                  >
                    {currentLessonIndex < 3 ? (
                      <>
                        Fazer Avaliação <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </>
                    ) : (
                      <>
                        Estudos de Caso <BrainCircuit className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            </motion.div>
          )}

          {viewState === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="w-full"
            >
              <Quiz 
                quiz={quizzes[activeQuizIndex]} 
                onComplete={handleFinishQuiz} 
              />
            </motion.div>
          )}

          {viewState === 'cases' && (
            <CaseStudies />
          )}

          {viewState === 'map' && (
            <div className="w-full max-w-4xl mx-auto py-8">
              <ConceptGraph 
                onNodeClick={(index) => {
                  setCurrentLessonIndex(Math.floor(index / LESSON_SIZE));
                  setViewState('lesson');
                }} 
              />
            </div>
          )}

          {viewState === 'progress' && (
            <ProgressDashboard 
              onNavigateToQuiz={(index) => {
                setActiveQuizIndex(index);
                setViewState('quiz');
              }} 
            />
          )}
        </AnimatePresence>
        </main>
      </div>

      <GlossaryModal 
        term={selectedGlossaryTerm} 
        onClose={() => setSelectedGlossaryTerm(null)} 
      />
      <Chatbot />
    </div>
  );
}
