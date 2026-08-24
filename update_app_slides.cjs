const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add FileText / Case Studies icon to imports
content = content.replace(
  "import { BarChart3, Settings, Map, BookOpen, CheckCircle, BrainCircuit, ArrowLeft, ArrowRight } from 'lucide-react';",
  "import { BarChart3, Settings, Map, BookOpen, CheckCircle, BrainCircuit, ArrowLeft, ArrowRight, FileText } from 'lucide-react';"
);

// 2. Add currentSlideIndex to states
const stateBlockOld = `export default function App() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => 
    parseInt(localStorage.getItem('app_currentLessonIndex') || '0')
  );
  
  const [viewState, setViewState] = useState<'lesson' | 'quiz' | 'cases' | 'progress' | 'map'>(() => 
    (localStorage.getItem('app_viewState') as any) || 'lesson'
  );`;

const stateBlockNew = `export default function App() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(() => 
    parseInt(localStorage.getItem('app_currentLessonIndex') || '0')
  );
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [viewState, setViewState] = useState<'lesson' | 'quiz' | 'cases' | 'progress' | 'map'>(() => 
    (localStorage.getItem('app_viewState') as any) || 'lesson'
  );`;
content = content.replace(stateBlockOld, stateBlockNew);

// 3. Reset currentSlideIndex when currentLessonIndex changes
const effectOld = `  // Persist state
  useEffect(() => {
    localStorage.setItem('app_currentLessonIndex', currentLessonIndex.toString());
    localStorage.setItem('app_viewState', viewState);
    localStorage.setItem('app_activeQuizIndex', activeQuizIndex.toString());
  }, [currentLessonIndex, viewState, activeQuizIndex]);`;

const effectNew = `  // Persist state
  useEffect(() => {
    localStorage.setItem('app_currentLessonIndex', currentLessonIndex.toString());
    localStorage.setItem('app_viewState', viewState);
    localStorage.setItem('app_activeQuizIndex', activeQuizIndex.toString());
  }, [currentLessonIndex, viewState, activeQuizIndex]);

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [currentLessonIndex]);`;
content = content.replace(effectOld, effectNew);

// 4. Add the cases icon to nav
const navButtonsOld = `          <button 
            onClick={() => setViewState(prev => prev === 'map' ? 'lesson' : 'map')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
          >`;

const navButtonsNew = `          <button 
            onClick={() => setViewState('cases')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Casos Práticos</span>
          </button>
          
          <button 
            onClick={() => setViewState(prev => prev === 'map' ? 'lesson' : 'map')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
          >`;
content = content.replace(navButtonsOld, navButtonsNew);

// 5. Replace the rendering of all slides with a single slide and a specialized navigation
const lessonRenderOld = `{currentLessonSlides.map((slide, index) => (
                <div 
                  key={slide.id} 
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all hover:shadow-md"
                >
                  <SlideRenderer 
                    slide={slide} 
                    onTermClick={(termName) => {
                      const termObj = glossary.find(g => g.term === termName);
                      if (termObj) setSelectedGlossaryTerm(termObj);
                    }}
                  />
                </div>
              ))}

              <div className="w-full flex flex-col items-center justify-center mt-16 pt-12 border-t border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-8">
                  {currentLessonIndex < 3 ? "Pronto para testar seus conhecimentos?" : "Pronto para a prática clínica?"}
                </h3>
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
                  {currentLessonIndex > 0 ? (
                    <button 
                      onClick={() => setCurrentLessonIndex(prev => prev - 1)}
                      className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all px-4 py-2"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Lição Anterior
                    </button>
                  ) : <div className="hidden sm:block w-32"></div>}

                  <button 
                    onClick={handleFinishLesson}
                    className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg shadow-blue-900/20 transition-all transform hover:scale-105 active:scale-95"
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

                  {currentLessonIndex < TOTAL_LESSONS - 1 ? (
                    <button 
                      onClick={() => setCurrentLessonIndex(prev => prev + 1)}
                      className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-all px-4 py-2"
                    >
                      Próxima Lição <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : <div className="hidden sm:block w-32"></div>}
                </div>
              </div>`;

const lessonRenderNew = `              <div className="flex justify-between items-center mb-6">
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
              </div>`;
content = content.replace(lessonRenderOld, lessonRenderNew);

fs.writeFileSync('src/App.tsx', content);
