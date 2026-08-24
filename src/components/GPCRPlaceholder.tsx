import React from 'react';

export function GPCRPlaceholder() {
  return (
    <div className="w-full max-w-lg mx-auto bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm" aria-label="Receptor Acoplado à Proteína G">
      <h4 className="text-center text-sm font-bold text-slate-700 mb-4">Mecanismo: Receptor Acoplado à Proteína G (GPCR)</h4>
      <svg viewBox="0 0 400 250" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Cell Membrane */}
        <path d="M 20 120 Q 50 115 80 120 T 140 120 T 200 120 T 260 120 T 320 120 T 380 120" fill="none" stroke="#94a3b8" strokeWidth="15" strokeDasharray="4 8" />
        <path d="M 20 135 Q 50 140 80 135 T 140 135 T 200 135 T 260 135 T 320 135 T 380 135" fill="none" stroke="#94a3b8" strokeWidth="15" strokeDasharray="4 8" />
        <text x="20" y="100" className="text-[10px] fill-slate-500 font-semibold">Extracelular</text>
        <text x="20" y="160" className="text-[10px] fill-slate-500 font-semibold">Intracelular</text>

        {/* 7-Transmembrane Domain (GPCR) */}
        <path d="M 120 80 C 130 80, 130 180, 140 180 C 150 180, 150 80, 160 80 C 170 80, 170 180, 180 180 C 190 180, 190 80, 200 80 C 210 80, 210 180, 220 180 C 230 180, 230 80, 240 80 C 250 80, 250 180, 260 180" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Ligand */}
        <circle cx="120" cy="75" r="10" fill="#ef4444" />
        <path d="M 110 50 L 118 65" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="100" y="45" className="text-[10px] fill-red-600 font-bold">Fármaco/Ligante</text>

        {/* G-Protein (Alpha, Beta, Gamma) */}
        <g transform="translate(250, 170)">
          <circle cx="0" cy="15" r="15" fill="#f59e0b" />
          <text x="-4" y="19" className="text-[10px] fill-white font-bold">α</text>
          
          <circle cx="25" cy="5" r="12" fill="#10b981" />
          <text x="21" y="9" className="text-[10px] fill-white font-bold">β</text>
          
          <circle cx="25" cy="25" r="10" fill="#06b6d4" />
          <text x="22" y="29" className="text-[9px] fill-white font-bold">γ</text>

          {/* Activation arrow */}
          <path d="M 5 35 Q 20 60 40 50" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="3" />
        </g>
        
        {/* Second Messenger / Effector */}
        <rect x="300" y="110" width="30" height="40" rx="4" fill="#8b5cf6" />
        <text x="290" y="95" className="text-[9px] fill-violet-600 font-bold">Efetor (ex: Adenilciclase)</text>
        <path d="M 315 155 L 315 180" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="270" y="195" className="text-[10px] fill-violet-700 font-bold">2º Mensageiro (ex: cAMP)</text>
      </svg>
    </div>
  );
}
