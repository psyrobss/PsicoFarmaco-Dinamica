import React, { useState } from 'react';
import { caseStudies } from '../data/content';
import { ClipboardList, CheckCircle, User } from 'lucide-react';

export function CaseStudies() {
  const [submitted, setSubmitted] = useState(false);

  const entryIds = {
    name: "entry.612777254",
    case1: [
      "entry.844243979",
      "entry.2062853802",
      "entry.1783727626",
      "entry.184675443",
      "entry.664494150"
    ],
    case2: [
      "entry.1417094976",
      "entry.399230021",
      "entry.512250137",
      "entry.214293234",
      "entry.593671015"
    ]
  };

  if (submitted) {
    return (
      <div className="w-full max-w-3xl mx-auto py-20 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Respostas Enviadas com Sucesso!</h2>
        <p className="text-xl text-slate-700">
          Suas reflexões sobre os casos clínicos foram registradas. Excelente trabalho aplicando os conceitos de farmacodinâmica na prática!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <header className="mb-10">
        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">Aplicação Prática</span>
        <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">Estudos de Caso Finais</h2>
        <p className="text-xl text-slate-700 mt-4 max-w-3xl">
          Aplique os conhecimentos de farmacodinâmica na prática clínica. Preencha seu nome e responda às perguntas de ambos os casos para fixar o aprendizado.
        </p>
      </header>

      <iframe name="hidden_iframe_cases" id="hidden_iframe_cases" style={{ display: "none" }}></iframe>
      
      <form 
        action="https://docs.google.com/forms/d/e/1FAIpQLScrgRTN0r79cQTa28aCJlLEiUnoWJSPEPon2X7Xdo7CYMqqHg/formResponse" 
        method="POST" 
        target="hidden_iframe_cases"
        onSubmit={() => {
          setTimeout(() => setSubmitted(true), 500);
        }}
        className="space-y-10"
      >
        {/* Identificação */}
        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
          <label className="flex items-center gap-3 text-slate-800 font-bold text-xl mb-4">
            <User className="w-6 h-6 text-blue-600" />
            Seu Nome Completo
          </label>
          <input 
            type="text"
            name={entryIds.name}
            required
            className="w-full p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-700 font-medium text-lg"
            placeholder="Digite seu nome para o registro da atividade..."
          />
        </div>

        {/* Casos */}
        {caseStudies.map((caso, caseIndex) => (
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
              
              <div className="mb-2 space-y-8">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-widest border-b border-slate-200 pb-2">
                  Perguntas Orientadoras - Caso {caseIndex + 1}:
                </h4>
                
                {caso.questions.map((q, qIndex) => {
                  const inputName = caseIndex === 0 ? entryIds.case1[qIndex] : entryIds.case2[qIndex];
                  return (
                    <div key={qIndex} className="space-y-3">
                      <label className="flex gap-3 text-slate-800 font-bold text-lg">
                        <span className="text-blue-600 mt-0.5">{qIndex + 1}.</span>
                        {q}
                      </label>
                      <textarea 
                        name={inputName} 
                        required
                        className="w-full min-h-[120px] p-4 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-y text-slate-700"
                        placeholder="Digite sua resposta aqui..."
                      ></textarea>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end pt-4 pb-12">
          <button 
            type="submit"
            className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-xl shadow-lg shadow-blue-900/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            Enviar Todas as Respostas
            <CheckCircle className="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  );
}
