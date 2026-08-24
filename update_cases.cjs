const fs = require('fs');

const content = `import React, { useState } from 'react';
import { caseStudies } from '../data/content';
import { ExternalLink, ClipboardList, CheckCircle } from 'lucide-react';

export function CaseStudies() {
  const [case1Submitted, setCase1Submitted] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <header className="mb-10">
        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">Aplicação Prática</span>
        <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Estudos de Caso Finais</h2>
        <p className="text-xl text-slate-700 mt-4 max-w-3xl">
          Aplique os conhecimentos de farmacodinâmica na prática clínica. Responda às perguntas abaixo para fixar o aprendizado.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {caseStudies.map((caso, index) => {
          const isCase1 = index === 0;

          return (
            <div key={caso.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
              <div className="p-8 lg:p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardList className="w-8 h-8 text-blue-600" />
                  <h3 className="text-3xl font-bold text-slate-900">{caso.title}</h3>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl mb-10">
                  <p className="text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                    {caso.description}
                  </p>
                </div>
                
                {isCase1 ? (
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-widest border-b border-slate-200 pb-2">Perguntas Orientadoras:</h4>
                    
                    {case1Submitted ? (
                      <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-r-lg flex flex-col items-center justify-center text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <h4 className="text-2xl font-bold text-green-900 mb-2">Respostas Enviadas com Sucesso!</h4>
                        <p className="text-green-700 text-lg">Suas reflexões sobre o Caso 1 foram registradas. Muito bem!</p>
                      </div>
                    ) : (
                      <>
                        <iframe name="hidden_iframe_case1" id="hidden_iframe_case1" style={{ display: "none" }}></iframe>
                        <form 
                          action="https://docs.google.com/forms/d/e/1FAIpQLScrgRTN0r79cQTa28aCJlLEiUnoWJSPEPon2X7Xdo7CYMqqHg/formResponse" 
                          method="POST" 
                          target="hidden_iframe_case1"
                          onSubmit={() => {
                            // Small delay to allow form to submit to iframe before showing success
                            setTimeout(() => setCase1Submitted(true), 500);
                          }}
                          className="space-y-8"
                        >
                          <div className="space-y-3">
                            <label className="flex gap-3 text-slate-800 font-bold text-lg">
                              <span className="text-blue-600 mt-0.5">1.</span>
                              {caso.questions[0]}
                            </label>
                            <textarea 
                              name="entry.844243979" 
                              required
                              className="w-full min-h-[120px] p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-y text-slate-700"
                              placeholder="Digite sua resposta aqui..."
                            ></textarea>
                          </div>

                          <div className="space-y-3">
                            <label className="flex gap-3 text-slate-800 font-bold text-lg">
                              <span className="text-blue-600 mt-0.5">2.</span>
                              {caso.questions[1]}
                            </label>
                            <textarea 
                              name="entry.2062853802" 
                              required
                              className="w-full min-h-[120px] p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-y text-slate-700"
                              placeholder="Digite sua resposta aqui..."
                            ></textarea>
                          </div>

                          <div className="space-y-3">
                            <label className="flex gap-3 text-slate-800 font-bold text-lg">
                              <span className="text-blue-600 mt-0.5">3.</span>
                              {caso.questions[2]}
                            </label>
                            <textarea 
                              name="entry.1783727626" 
                              required
                              className="w-full min-h-[120px] p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-y text-slate-700"
                              placeholder="Digite sua resposta aqui..."
                            ></textarea>
                          </div>

                          <div className="space-y-3">
                            <label className="flex gap-3 text-slate-800 font-bold text-lg">
                              <span className="text-blue-600 mt-0.5">4.</span>
                              {caso.questions[3]}
                            </label>
                            <textarea 
                              name="entry.184675443" 
                              required
                              className="w-full min-h-[120px] p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-y text-slate-700"
                              placeholder="Digite sua resposta aqui..."
                            ></textarea>
                          </div>

                          <div className="space-y-3">
                            <label className="flex gap-3 text-slate-800 font-bold text-lg">
                              <span className="text-blue-600 mt-0.5">5.</span>
                              {caso.questions[4]}
                            </label>
                            <textarea 
                              name="entry.664494150" 
                              required
                              className="w-full min-h-[120px] p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-y text-slate-700"
                              placeholder="Digite sua resposta aqui..."
                            ></textarea>
                          </div>

                          <div className="pt-4 flex justify-end">
                            <button 
                              type="submit"
                              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-900/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                              Enviar Respostas
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="mb-6">
                    <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-widest border-b border-slate-200 pb-2">Perguntas Orientadoras:</h4>
                    <ul className="space-y-6">
                      {caso.questions.map((q, idx) => (
                        <li key={idx} className="flex gap-4 text-slate-700 text-lg bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <span className="font-bold text-blue-600 mt-0.5">{idx + 1}.</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <button
                        disabled
                        className="w-full md:w-auto inline-flex justify-center items-center gap-2 px-8 py-3 bg-slate-200 text-slate-500 font-bold rounded-lg cursor-not-allowed"
                        aria-label="Em breve"
                      >
                        Integração em Breve
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/CaseStudies.tsx', content);
