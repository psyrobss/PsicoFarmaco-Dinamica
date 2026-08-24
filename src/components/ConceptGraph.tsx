import React from 'react';
import * as motion from 'motion/react-client';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  slideIndex: number;
}

interface Edge {
  source: string;
  target: string;
}

const nodes: Node[] = [
  { id: 'farmacodinamica', label: 'Farmacodinâmica', x: 400, y: 50, slideIndex: 0 },
  { id: 'receptores', label: 'Receptores', x: 400, y: 150, slideIndex: 2 },
  { id: 'tipos_receptores', label: 'Tipos (Canais, etc.)', x: 200, y: 250, slideIndex: 3 },
  { id: 'ligantes', label: 'Ligantes', x: 600, y: 250, slideIndex: 1 },
  { id: 'agonistas', label: 'Agonistas', x: 500, y: 350, slideIndex: 4 },
  { id: 'antagonistas', label: 'Antagonistas', x: 700, y: 350, slideIndex: 4 },
  { id: 'neurotransmissores', label: 'Neurotransmissores', x: 600, y: 150, slideIndex: 7 }, // Added mapped to slide 7
];

const edges: Edge[] = [
  { source: 'farmacodinamica', target: 'receptores' },
  { source: 'receptores', target: 'tipos_receptores' },
  { source: 'receptores', target: 'ligantes' },
  { source: 'ligantes', target: 'agonistas' },
  { source: 'ligantes', target: 'antagonistas' },
  { source: 'neurotransmissores', target: 'ligantes' },
];

export function ConceptGraph({ onNodeClick }: { onNodeClick: (slideIndex: number) => void }) {
  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar bg-slate-50 p-8 rounded-xl border border-slate-200" role="region" aria-label="Mapa Mental Interativo">
      <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Mapa de Conceitos</h3>
      <div className="min-w-[800px] flex justify-center">
        <svg viewBox="0 0 800 450" width="800" height="450" className="w-full h-auto mx-auto" aria-hidden="true">
          {/* Edges */}
          {edges.map((edge, i) => {
            const sourceNode = nodes.find(n => n.id === edge.source)!;
            const targetNode = nodes.find(n => n.id === edge.target)!;
            return (
              <motion.line
                key={`edge-${i}`}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="#cbd5e1"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              onClick={() => onNodeClick(node.slideIndex)}
              className="cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label={`Ir para slide sobre ${node.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNodeClick(node.slideIndex);
                }
              }}
            >
              <rect
                x={node.x - 80}
                y={node.y - 22}
                width="160"
                height="44"
                rx="22"
                className="fill-white stroke-blue-500 group-hover:fill-blue-50 group-focus:ring-2 group-focus:ring-blue-500 transition-colors"
                strokeWidth="3"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="text-xs font-bold fill-slate-700 group-hover:fill-blue-700 select-none"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
      
      {/* Screen Reader Only List of Links */}
      <div className="sr-only">
        <ul>
          {nodes.map(node => (
            <li key={`sr-${node.id}`}>
              <button onClick={() => onNodeClick(node.slideIndex)}>
                Ir para o tópico {node.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
