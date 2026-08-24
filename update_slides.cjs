const fs = require('fs');
let content = fs.readFileSync('src/data/slides.ts', 'utf8');

// Update Slide 1 & 2 for Key/Lock analogy
const slide2Old = `  {
    id: 2,
    title: "O Receptor: A Fechadura da Célula",
    subtitle: "Onde tudo começa",
    content: [
      "Receptores são proteínas, geralmente na superfície da célula (membrana), que recebem sinais químicos.",
      "A interação fármaco-receptor é baseada em formato único.",
      "A enzima ou receptor é a 'fechadura' (Sítio Ativo Complementar).",
      "O fármaco ou ligante endógeno é a 'chave'."
    ],
    analogy: "Assim como apenas a chave da sua casa abre a sua porta, apenas a molécula com o formato tridimensional correto se encaixa perfeitamente no receptor para ativá-lo."
  },`;

const slide2New = `  {
    id: 2,
    title: "O Receptor: A Fechadura da Célula",
    subtitle: "Onde tudo começa",
    content: [
      "Receptores são proteínas especializadas, geralmente localizadas na superfície das células (neurônios), que funcionam como 'fechaduras' biológicas.",
      "A analogia da Chave e Fechadura: Para a porta (neurônio) se abrir ou fechar, uma chave (neurotransmissor natural ou remédio) precisa ter o formato tridimensional exato para se encaixar na fechadura (receptor).",
      "É através desse encaixe perfeito que os remédios psiquiátricos 'conversam' com o cérebro, alterando como os neurônios disparam sinais elétricos."
    ],
    analogy: "Assim como apenas a chave certa abre a sua porta, apenas o fármaco com o formato correto se encaixa no receptor. Se a chave gira, a porta abre. Se a chave quebra lá dentro, ninguém mais entra."
  },`;
content = content.replace(slide2Old, slide2New);

const slide4Old = `title: "Agonistas e Antagonistas",
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

const slide4New = `title: "Agonistas e Antagonistas",
    subtitle: "A chave que abre vs A chave que emperra",
    content: [
      "Fármaco Agonista (Estimulação): É a 'chave' que se encaixa na fechadura e consegue girá-la, ativando o receptor. Ele imita o que a substância natural faria (ex: Diazepam age como agonista ativando os receptores GABA, gerando calma).",
      "Fármaco Antagonista (Bloqueio): É a 'chave falsa'. Ela entra na fechadura perfeitamente, mas não gira. Pior: ela fica lá presa, impedindo que a chave verdadeira (neurotransmissor) entre. (ex: Antipsicóticos bloqueiam o receptor de dopamina, impedindo alucinações).",
      "Agonista Parcial: Ativa o receptor, mas de forma 'fraca' (não gira a chave até o fim). Útil para equilibrar sistemas."
    ]`;
content = content.replace(slide4Old, slide4New);

// Update Slide 10: Tolerance vs Dependence
const slide10Old = `title: "Dessensibilização e Tolerância",
    subtitle: "Neuroplasticidade e Adaptação",
    content: [
      "O organismo compensa a exposição contínua a um fármaco pelo fator tempo no cérebro.",
      "Curto prazo (Dias/Semanas): Ação aguda do fármaco com bloqueios ou estímulos imediatos.",
      "Longo prazo (Meses): Down-regulation (perda de receptores por excesso de estímulo) ou Up-regulation (ganho de receptores por falta de estímulo).",
      "Tolerância: O receptor perde sensibilidade. A mesma dose já não faz o mesmo efeito (down-regulation)."
    ]`;

const slide10New = `title: "Tolerância e Dependência",
    subtitle: "Quando o cérebro se adapta à droga",
    content: [
      "Tolerância (O Efeito Diminui): Ocorre quando o cérebro, bombardeado pela droga repetidas vezes, decide 'se proteger' diminuindo o número de receptores (Down-regulation). A mesma dose já não faz o mesmo efeito, exigindo doses cada vez maiores (ex: remédios para dormir).",
      "Dependência Física: É a adaptação profunda. O corpo se acostuma tanto com a droga que passa a 'precisar' dela para funcionar normalmente.",
      "Síndrome de Abstinência (Rebote): Se a droga for interrompida de uma vez (ex: parada abrupta de benzodiazepínico), os poucos receptores que restaram entram em colapso. O paciente sofre o efeito oposto (ansiedade extrema, insônia de rebote, tremores)."
    ]`;
content = content.replace(slide10Old, slide10New);

// Update Slide 18: Therapeutic Window
const slide18Old = `      "Índice Terapêutico (IT = DT50 / DE50): É a medida de segurança da droga. Representa a 'distância' ou 'janela' entre a dose que cura e a dose que mata/intoxica.",
      "Exemplo Alto IT (Seguro): Penicilina. A dose tóxica é imensamente maior que a terapêutica.",
      "Exemplo Baixo IT (Margem Estreita): Varfarina ou Lítio. Pequenas alterações na dose podem passar rapidamente da eficácia para a toxicidade severa."
    ],
    psychologyNote: "Fármacos psiquiátricos como Lítio e Carbamazepina têm IT estreito. Você será frequentemente o primeiro a notar sinais sutis de toxicidade (tremores, confusão mental, ataxia), permitindo uma intervenção médica antes que o quadro se agrave."`;

const slide18New = `      "Janela Terapêutica (Índice Terapêutico): É a 'distância' segura entre a dose que faz o efeito desejado (cura) e a dose que causa efeitos adversos graves (intoxica).",
      "Exemplo de Janela Larga (Seguro): Penicilina. A dose tóxica é imensamente maior que a terapêutica.",
      "Exemplo de Janela Estreita (Perigoso): Lítio ou alguns sedativos. Pequenas alterações na dose, como tomar 'um comprimido a mais', podem rapidamente ultrapassar o teto terapêutico e invadir a zona de toxicidade.",
      "O Perigo da Automedicação: Aumentar a dose por conta própria (devido à tolerância, por exemplo) ignora os limites da Janela Terapêutica, colocando o paciente em risco de depressão respiratória ou morte."
    ],
    psychologyNote: "Fármacos psiquiátricos como Lítio e Carbamazepina têm IT estreito. Você será frequentemente o primeiro a notar sinais de toxicidade (tremores, confusão mental, ataxia), permitindo uma intervenção médica antes que o quadro se agrave."`;
content = content.replace(slide18Old, slide18New);

// Update Slide 19: Adverse effects
const slide19Old = `title: "Efeito Adverso: Parte do Mecanismo",
    content: [
      "O efeito colateral não é um 'erro', é a extensão do mecanismo para outro circuito.",
      "On-target: Excesso no alvo principal (ex: bloqueio D2 na via motora causa parkinsonismo).",
      "Off-target: Fármaco se liga a receptores secundários (ex: Tricíclicos bloqueando H1 causam sedação)."
    ],
    psychologyNote: "Quando o paciente piora logo após iniciar a medicação, pergunte-se: é o transtorno progredindo ou é um efeito adverso inerente ao mecanismo do fármaco?"`;

const slide19New = `title: "Efeito Adverso: É parte do mecanismo",
    content: [
      "O efeito colateral de um psicofármaco não é um 'erro' ou 'alergia', mas sim uma consequência direta do seu mecanismo em outras áreas do cérebro.",
      "On-target (No mesmo alvo, em local errado): Um antipsicótico bloqueia os receptores de dopamina para parar as alucinações. O problema é que há receptores de dopamina em vias motoras também. O bloqueio lá causa rigidez, tremores e lentidão (parkinsonismo medicamentoso).",
      "Off-target (Em alvos secundários): Um antidepressivo que também se liga a receptores de histamina por 'acidente', causando sonolência."
    ],
    psychologyNote: "Por que o psicólogo deve saber isso? Porque um sintoma 'novo' (como tremores ou apatia extrema) muitas vezes não é piora emocional, ansiedade ou uma nova doença, mas sim um efeito adverso direto do bloqueio de receptores."`;
content = content.replace(slide19Old, slide19New);


// Update Slide 24: Psychologist Role
const slide24Old = `"4. Potencialização Terapêutica (Sinergia): O psicofármaco atua nos receptores (farmacodinâmica) para 'destravar' vias neurais, mas é a psicoterapia que modela o comportamento e consolida novas sinapses. O remédio abre a porta, a terapia ensina a caminhar pelo novo espaço."
    ],
    psychologyNote: "Você atua como um tradutor para o paciente. Quando ele diz 'o remédio me dopou', você traduz: 'seu receptor de histamina foi bloqueado'. Isso desestigmatiza o sofrimento e traz controle."`;

const slide24New = `"4. Manejo da Automedicação: Pacientes frequentemente aumentam a dose por conta própria ao sentirem os efeitos da Tolerância. O psicólogo deve intervir educativamente, explicando os perigos da Janela Terapêutica estreita, e orientá-lo firmemente a não alterar doses sem consultar o psiquiatra."
    ],
    psychologyNote: "Sua função não é prescrever, mas sim ser a ponte de segurança. Se um paciente relata aumentar sedativos sozinho para dormir, a conduta ética é investigar o comportamento (fuga, estresse) e alinhar imediatamente com o médico prescritor."`;
content = content.replace(slide24Old, slide24New);

fs.writeFileSync('src/data/slides.ts', content);
