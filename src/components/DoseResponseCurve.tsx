import React from 'react';

export function DoseResponseCurve() {
  return (
    <div className="w-full max-w-lg mx-auto bg-white p-4 rounded-xl border border-slate-200 shadow-sm" aria-label="Gráfico de Curva Concentração-Resposta">
      <h4 className="text-center text-sm font-bold text-slate-700 mb-4">Curva de Concentração (Dose) vs Resposta</h4>
      <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
        </defs>
        
        {/* Axes */}
        <line x1="40" y1="260" x2="380" y2="260" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="40" y1="260" x2="40" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        
        {/* Labels */}
        <text x="210" y="290" textAnchor="middle" className="text-[10px] fill-slate-600 font-semibold">Log Concentração do Fármaco (Dose)</text>
        <text x="15" y="140" textAnchor="middle" transform="rotate(-90 15 140)" className="text-[10px] fill-slate-600 font-semibold">% Resposta Máxima (Efeito)</text>
        
        {/* Grid lines */}
        <line x1="40" y1="60" x2="370" y2="60" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
        <text x="35" y="64" textAnchor="end" className="text-[9px] fill-slate-400">100%</text>
        
        <line x1="40" y1="160" x2="370" y2="160" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
        <text x="35" y="164" textAnchor="end" className="text-[9px] fill-slate-400">50%</text>

        {/* Agonist Total (High Efficacy, High Potency) */}
        <path d="M 40 260 C 120 260, 140 60, 360 60" fill="none" stroke="#2563eb" strokeWidth="3" />
        <text x="280" y="50" className="text-[10px] fill-blue-600 font-bold">Agonista Total (Emax = 100%)</text>
        
        {/* Agonist Parcial (Lower Efficacy) */}
        <path d="M 40 260 C 120 260, 160 120, 360 120" fill="none" stroke="#10b981" strokeWidth="3" />
        <text x="280" y="110" className="text-[10px] fill-emerald-600 font-bold">Agonista Parcial (Emax Menor)</text>
        
        {/* Antagonist (Flat line) */}
        <path d="M 40 258 L 360 258" fill="none" stroke="#ef4444" strokeWidth="3" />
        <text x="280" y="250" className="text-[10px] fill-red-600 font-bold">Antagonista (Sem Eficácia)</text>

        {/* EC50 Indicators */}
        <circle cx="130" cy="160" r="4" fill="#2563eb" />
        <line x1="130" y1="160" x2="130" y2="260" stroke="#2563eb" strokeWidth="1" strokeDasharray="2" />
        <text x="130" y="275" textAnchor="middle" className="text-[9px] fill-blue-600 font-bold">EC50</text>
      </svg>
    </div>
  );
}
