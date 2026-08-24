import React, { useState, useEffect } from 'react';
import { LessonQuiz } from '../types';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import * as motion from 'motion/react-client';

interface QuizProps {
  quiz: LessonQuiz;
  onComplete: () => void;
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect'>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Restore answers from local storage if available for this quiz
  useEffect(() => {
    const savedAnswers = localStorage.getItem(`quiz_answers_${quiz.title}`);
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        // ignore
      }
    }
  }, [quiz.title]);

  const handleInputChange = (id: string, value: string) => {
    const newAnswers = { ...answers, [id]: value };
    setAnswers(newAnswers);
    localStorage.setItem(`quiz_answers_${quiz.title}`, JSON.stringify(newAnswers));
    
    // Reset feedback when user types
    if (feedback[id]) {
      setFeedback(prev => ({ ...prev, [id]: undefined as any }));
      setHasSubmitted(false);
    }
  };

  const normalize = (str: string) => 
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  const checkAnswers = () => {
    const newFeedback: Record<string, 'correct' | 'incorrect'> = {};
    let allCorrect = true;

    quiz.questions.forEach(q => {
      const userAnswerNormalized = normalize(answers[q.id] || '');
      const isCorrect = q.acceptedAnswers.some(ans => normalize(ans) === userAnswerNormalized);
      
      if (isCorrect) {
        newFeedback[q.id] = 'correct';
      } else {
        newFeedback[q.id] = 'incorrect';
        allCorrect = false;
      }
    });

    setFeedback(newFeedback);
    setHasSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <header className="mb-8">
        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">Verificação Rápida</span>
        <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">{quiz.title}</h2>
        <p className="text-lg text-slate-600 mt-2">Preencha as lacunas para verificar seu aprendizado.</p>
      </header>

      <div className="space-y-8">
        {quiz.questions.map((q) => (
          <div key={q.id} className="p-6 md:p-8 bg-slate-50 border border-slate-200 rounded-xl">
            <label htmlFor={`input-${q.id}`} className="sr-only">Preencha a lacuna: dica é {q.hint}</label>
            <div className="text-xl text-slate-800 leading-relaxed font-medium">
              {q.textBefore}
              <span className="inline-flex flex-col items-center mx-2 relative align-middle">
                <input
                  id={`input-${q.id}`}
                  type="text"
                  value={answers[q.id] || ''}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                  placeholder="......"
                  list={`list-${q.id}`}
                  className={`
                    w-40 text-center font-bold px-2 py-1 border-b-2 bg-white focus:outline-none transition-colors
                    ${feedback[q.id] === 'correct' ? 'border-green-500 text-green-700' : 
                      feedback[q.id] === 'incorrect' ? 'border-red-500 text-red-700' : 'border-slate-400 text-blue-700 focus:border-blue-600'}
                  `}
                  aria-invalid={feedback[q.id] === 'incorrect'}
                  aria-describedby={`hint-${q.id}`}
                />
                <datalist id={`list-${q.id}`}>
                  <option value={q.acceptedAnswers[0]} />
                  {q.distractor && <option value={q.distractor} />}
                </datalist>
                {feedback[q.id] === 'correct' && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    className="absolute -right-10 top-0.5"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-500 drop-shadow-md" />
                    {/* Faísca visual */}
                    <motion.div 
                      className="absolute inset-0 bg-yellow-300 rounded-full z-[-1]"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </motion.div>
                )}
                {feedback[q.id] === 'incorrect' && (
                  <AlertCircle className="w-6 h-6 text-red-500 absolute -right-8 top-1.5" />
                )}
              </span>
              {q.textAfter}
            </div>
            {!hasSubmitted && (
              <p id={`hint-${q.id}`} className="text-sm text-slate-500 mt-4 font-bold uppercase tracking-wider">
                Dica: {q.hint}
              </p>
            )}
            {hasSubmitted && (
              <div className={`mt-6 p-4 rounded-lg border-l-4 ${feedback[q.id] === 'correct' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                <h4 className={`font-bold mb-1 flex items-center gap-2 ${feedback[q.id] === 'correct' ? 'text-green-800' : 'text-red-800'}`}>
                  {feedback[q.id] === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" /> Correto!
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5" /> Incorreto. A melhor resposta é "{q.answer}".
                    </>
                  )}
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed mt-2">{q.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end gap-4">
        {hasSubmitted && Object.values(feedback).every(f => f === 'correct') ? (
          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-lg bg-green-600 text-white font-bold shadow-lg shadow-green-900/20 hover:bg-green-500 transition-colors focus:ring-4 focus:ring-green-300 focus:outline-none flex items-center gap-2"
          >
            Avançar <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={checkAnswers}
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-colors focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Verificar Respostas
          </button>
        )}
      </div>
    </div>
  );
}
