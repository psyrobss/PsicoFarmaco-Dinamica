const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Ensure framer-motion is imported
if (!content.includes('import * as motion')) {
  content = content.replace("import { GlossaryTerm } from './types';", "import { GlossaryTerm } from './types';\nimport * as motion from 'motion/react-client';\nimport { AnimatePresence } from 'motion/react';");
}
if (!content.includes('import { AnimatePresence }')) {
  content = content.replace("import * as motion from 'motion/react-client';", "import * as motion from 'motion/react-client';\nimport { AnimatePresence } from 'motion/react';");
}

// Ensure ArrowRight is imported
if (!content.includes('ArrowRight')) {
  content = content.replace('ArrowLeft } from', 'ArrowLeft, ArrowRight } from');
}

// Update the navigation block
const oldNav = `<div className="flex flex-col items-center justify-center mt-12 pt-12 border-t-2 border-dashed border-slate-300">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  {currentLessonIndex < 3 ? "Pronto para testar seus conhecimentos?" : "Pronto para a prática clínica?"}
                </h3>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {currentLessonIndex > 0 && (
                    <button 
                      onClick={() => setCurrentLessonIndex(prev => prev - 1)}
                      className="group flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-lg py-3.5 px-8 rounded-full transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" /> Lição Anterior
                    </button>
                  )}
                  <button 
                    onClick={handleFinishLesson}
                    className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
                  >
                    {currentLessonIndex < 3 ? (
                      <>
                        Fazer Avaliação da Lição <CheckCircle className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Ir para Estudos de Caso <BrainCircuit className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>`;

const newNav = `<div className="w-full flex flex-col items-center justify-center mt-16 pt-12 border-t border-slate-200">
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

content = content.replace(oldNav, newNav);

// Now wrap the views in AnimatePresence
const mainContentOld = `<main ref={mainRef} className="flex-1 p-6 md:p-12 flex flex-col gap-8 overflow-y-auto scroll-smooth">
          {viewState === 'lesson' && (`;

const mainContentNew = `<main ref={mainRef} className="flex-1 p-6 md:p-12 flex flex-col gap-8 overflow-y-auto scroll-smooth">
          <AnimatePresence mode="wait">
          {viewState === 'lesson' && (
            <motion.div 
              key="lesson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >`;

content = content.replace(mainContentOld, mainContentNew);
content = content.replace(`</div>
          )}

          {viewState === 'quiz' && (`, `</div>
            </motion.div>
          )}

          {viewState === 'quiz' && (`);

const quizOld = `{viewState === 'quiz' && (
            <Quiz 
              quiz={quizzes[activeQuizIndex]} 
              onComplete={handleFinishQuiz} 
            />
          )}`;

const quizNew = `{viewState === 'quiz' && (
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
          )}`;

content = content.replace(quizOld, quizNew);

const closeMain = `</main>`;
content = content.replace(closeMain, `</AnimatePresence>\n        </main>`);

fs.writeFileSync('src/App.tsx', content);
