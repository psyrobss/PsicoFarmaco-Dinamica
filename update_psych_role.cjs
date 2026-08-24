const fs = require('fs');
let content = fs.readFileSync('src/data/slides.ts', 'utf8');

const oldContent = `{
    id: 24,
    title: "O Papel do Psicólogo",
    subtitle: "Cinco frentes de atuação",
    content: [
      "1. Observador qualificado (A sessão é um laboratório).",
      "2. Psicoeducação (Explicar o mecanismo garante adesão).",
      "3. Monitoramento de sinais de alerta (Clônus, sedação severa).",
      "4. Comunicação objetiva com o psiquiatra (Relatar comportamentos e gatilhos).",
      "5. O setting como potenciador (A aliança terapêutica soma à medicação)."
    ],
    psychologyNote: "Você não prescreve, mas ninguém observa o paciente de tão perto. Traduzir o sofrimento em compreensão mecânica desestigmatiza e protege o paciente."
  }`;

const newContent = `{
    id: 24,
    title: "O Papel do Psicólogo na Farmacodinâmica",
    subtitle: "A sessão como laboratório clínico",
    content: [
      "Por que o psicólogo precisa entender receptores e transdução de sinal se ele não prescreve?",
      "1. Observador Qualificado (Adesão e Tolerância): Você é quem nota quando um medicamento 'para de fazer efeito' (dessensibilização/taquifilaxia) porque o paciente está relatando o retorno dos sintomas. Você pode explicar que não é 'culpa' do paciente, mas uma neuroadaptação natural dos receptores (down-regulation).",
      "2. Diferenciação Clínica (Sintoma vs. Efeito Adverso): Um paciente agitado pode estar ansioso ou apresentando acatisia (efeito adverso de antipsicóticos devido ao antagonismo D2). Entender o mecanismo de ação permite encaminhar corretamente ao psiquiatra.",
      "3. Gestão de Expectativas (Placebo e Nocebo): A aliança terapêutica e a psicoeducação sobre como o remédio funciona reduzem a ansiedade. O psicólogo mitiga o efeito nocebo ao acolher medos e monitora o tempo de ação (ex: antidepressivos demoram dias/semanas para alterar a expressão gênica, o paciente precisa ser encorajado a não desistir).",
      "4. Potencialização Terapêutica (Sinergia): O psicofármaco atua nos receptores (farmacodinâmica) para 'destravar' vias neurais, mas é a psicoterapia que modela o comportamento e consolida novas sinapses. O remédio abre a porta, a terapia ensina a caminhar pelo novo espaço."
    ],
    psychologyNote: "Você atua como um tradutor para o paciente. Quando ele diz 'o remédio me dopou', você traduz: 'seu receptor de histamina foi bloqueado'. Isso desestigmatiza o sofrimento e traz controle."
  }`;

content = content.replace(oldContent, newContent);
fs.writeFileSync('src/data/slides.ts', content);
