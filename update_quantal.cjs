const fs = require('fs');
let content = fs.readFileSync('src/data/slides.ts', 'utf8');

const oldContent = `title: "Curva Quantal e Índice Terapêutico",
    content: [
      "Mede a resposta 'tudo ou nada' em uma população.",
      "ED50: Dose eficaz em 50% das pessoas. TD50: Dose tóxica em 50%.",
      "Índice Terapêutico (IT): Distância entre ED50 e TD50. Quanto mais largo, mais segura a droga."
    ],
    psychologyNote: "O Lítio tem IT estreito. Não significa 'inseguro', significa que exige vigilância contínua. Sinais como tremor e confusão chegam antes do exame de sangue."`;

const newContent = `title: "Curva Quantal e Índice Terapêutico",
    content: [
      "Diferente da curva gradual (que vê o efeito em uma pessoa), a curva quantal mede a proporção de uma POPULAÇÃO que atinge o efeito terapêutico desejado (uma resposta 'tudo ou nada').",
      "DE50 (Dose Eficaz 50%): Dose que produz o efeito desejado em 50% dos pacientes.",
      "DT50 (Dose Tóxica 50%): Dose que produz toxicidade em 50% dos pacientes.",
      "Índice Terapêutico (IT = DT50 / DE50): É a medida de segurança da droga. Representa a 'distância' ou 'janela' entre a dose que cura e a dose que mata/intoxica.",
      "Exemplo Alto IT (Seguro): Penicilina. A dose tóxica é imensamente maior que a terapêutica.",
      "Exemplo Baixo IT (Margem Estreita): Varfarina ou Lítio. Pequenas alterações na dose podem passar rapidamente da eficácia para a toxicidade severa."
    ],
    psychologyNote: "Fármacos psiquiátricos como Lítio e Carbamazepina têm IT estreito. Você será frequentemente o primeiro a notar sinais sutis de toxicidade (tremores, confusão mental, ataxia), permitindo uma intervenção médica antes que o quadro se agrave."`;

content = content.replace(oldContent, newContent);
fs.writeFileSync('src/data/slides.ts', content);
