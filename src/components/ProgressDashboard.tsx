import React, { useEffect, useState } from 'react';
import { quizzes, slides, glossary } from '../data/content';
import { CheckCircle2, AlertCircle, ArrowRight, Download, Medal, Trophy } from 'lucide-react';
import * as motion from 'motion/react-client';

interface ProgressDashboardProps {
  onNavigateToQuiz: (quizIndex: number) => void;
}

export function ProgressDashboard({ onNavigateToQuiz }: ProgressDashboardProps) {
  const [quizResults, setQuizResults] = useState<Record<string, 'mastered' | 'review' | 'not-started'>>({});
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  useEffect(() => {
    const results: Record<string, 'mastered' | 'review' | 'not-started'> = {};
    const badges: string[] = [];

    const normalize = (str: string) => 
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    let allMastered = true;
    let anyMastered = false;

    quizzes.forEach(quiz => {
      const savedAnswers = localStorage.getItem(`quiz_answers_${quiz.title}`);
      if (savedAnswers) {
        try {
          const answers = JSON.parse(savedAnswers);
          let allCorrect = true;
          let anyAnswered = false;

          quiz.questions.forEach(q => {
            if (answers[q.id]) anyAnswered = true;
            
            const userAnswerNormalized = normalize(answers[q.id] || '');
            const isCorrect = q.acceptedAnswers.some(ans => normalize(ans) === userAnswerNormalized);
            
            if (!isCorrect) {
              allCorrect = false;
            }
          });

          if (anyAnswered) {
            results[quiz.title] = allCorrect ? 'mastered' : 'review';
            if (allCorrect) anyMastered = true;
            else allMastered = false;
          } else {
            results[quiz.title] = 'not-started';
            allMastered = false;
          }
        } catch (e) {
          results[quiz.title] = 'not-started';
          allMastered = false;
        }
      } else {
        results[quiz.title] = 'not-started';
        allMastered = false;
      }
    });

    if (anyMastered) badges.push('Primeiro Acerto');
    if (allMastered && quizzes.length > 0) badges.push('Mestre da Farmacodinâmica');
    
    // Check if user has viewed all slides
    const currentSlide = parseInt(localStorage.getItem('app_currentSlideIndex') || '0', 10);
    if (currentSlide === slides.length - 1) {
      badges.push('Explorador de Conteúdo');
    }

    setQuizResults(results);
    setEarnedBadges(badges);
  }, []);

  const handleExport = () => {
    let content = "RESUMO DE ESTUDOS - PHARMACOPSYCH\n\n";
    content += "--- NOTAS DE SLIDES ---\n";
    
    slides.forEach(s => {
      const notes = localStorage.getItem(`slide_notes_${s.id}`);
      if (notes) {
        content += `\nTópico: ${s.title}\nNotas: ${notes}\n`;
      }
    });

    content += "\n--- GLOSSÁRIO ACESSADO ---\n";
    glossary.forEach(g => {
      content += `${g.term}: ${g.definition}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Resumo_Estudos_PharmacoPsych.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto py-8"
    >
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Painel de Desempenho</h2>
          <p className="text-lg text-slate-600 mt-2">Visão geral do seu domínio nos tópicos de Psicofarmacologia.</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" /> Exportar Resumo
        </button>
      </header>

      {earnedBadges.length > 0 && (
        <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
          <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> Suas Conquistas
          </h3>
          <div className="flex flex-wrap gap-4">
            {earnedBadges.map(badge => (
              <div key={badge} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-yellow-200 shadow-sm">
                <Medal className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-slate-700 text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {quizzes.map((quiz, index) => {
          const status = quizResults[quiz.title] || 'not-started';
          
          return (
            <div key={quiz.title} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {status === 'mastered' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                  {status === 'review' && <AlertCircle className="w-6 h-6 text-amber-500" />}
                  {status === 'not-started' && <div className="w-6 h-6 rounded-full border-2 border-slate-300" />}
                  <h3 className="font-bold text-lg text-slate-800">{quiz.title}</h3>
                </div>
                
                <p className="text-sm text-slate-600 mb-6">
                  {status === 'mastered' && "Excelente! Você domina os conceitos desta seção."}
                  {status === 'review' && "Alguns pontos precisam de revisão. Refaça a verificação para consolidar o aprendizado."}
                  {status === 'not-started' && "Você ainda não iniciou esta verificação."}
                </p>
              </div>

              <button
                onClick={() => onNavigateToQuiz(index)}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors self-start"
              >
                {status === 'mastered' ? 'Revisar Tópico' : status === 'review' ? 'Corrigir Erros' : 'Iniciar Verificação'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
