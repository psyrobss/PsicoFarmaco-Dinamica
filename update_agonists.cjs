const fs = require('fs');
let content = fs.readFileSync('src/data/slides.ts', 'utf8');

const oldContent = `title: "Ligar não é Ativar",
    subtitle: "Agonista e Antagonista",
    content: [
      "Agonistas (Estimulação): Ativam o receptor, imitando o neurotransmissor natural. Trazem um efeito biológico.",
      "Antagonistas (Bloqueio): Bloqueiam o receptor, impedindo a ativação natural. Trazem um efeito nulo ou de bloqueio.",
      "Inibidores de Recaptação (Acúmulo): Bloqueiam transportadores, aumentando neurotransmissores na fenda. Efeito prolongado."
    ]`;

const newContent = `title: "Agonistas e Antagonistas",
    subtitle: "Atividade Intrínseca: O grau de ativação",
    content: [
      "Agonista Total: Estabiliza o receptor no estado ativo (R*), com atividade intrínseca unitária (Emax máxima). Ex: Isoproterenol.",
      "Agonista Parcial: Ativação parcial. O Emax é menor. Pode atuar como antagonista na presença de altas doses de agonista total. Ex: Aripiprazol.",
      "Agonista Inverso: Reverte receptores que possuem ativação basal espontânea, estabilizando-os na forma inativa (R). Atividade intrínseca menor que zero.",
      "Antagonista (Atividade Intrínseca Nula): Liga-se, mas não ativa. Impede o agonista de agir.",
      "1. Antagonista Competitivo: Compete pelo mesmo sítio. Pode ser superado aumentando a dose do agonista.",
      "2. Antagonista Irreversível/Não-Competitivo: Liga-se covalentemente ou no sítio alostérico, reduzindo a eficácia máxima (Emax) sem alterar o EC50 do agonista.",
      "3. Antagonismo Funcional: Atua em outro sistema receptor causando efeito fisiológico oposto (Ex: Epinefrina broncodilata contra a broncoconstrição da histamina)."
    ]`;

content = content.replace(oldContent, newContent);
fs.writeFileSync('src/data/slides.ts', content);
