import { Slide, LessonQuiz, CaseStudy, GlossaryTerm } from "../types";

export const caseStudies: CaseStudy[] = [
  {
    id: "caso-1",
    title: "Como os Remédios 'Conversam' com o Cérebro",
    description: `Parte 1 - A "chave" e a "fechadura":
Pedro, 35 anos, foi internado após um episódio de surto psicótico, com alucinações e pensamentos delirantes. O psiquiatra prescreveu um antipsicótico, e em poucos dias os sintomas melhoraram bastante.
Para entender como esse remédio age, é útil pensar nos neurônios como portas com fechaduras especiais, chamadas de receptores. Substâncias naturais do cérebro (os neurotransmissores, como a dopamina) funcionam como chaves que se encaixam nessas fechaduras e "abrem a porta", passando uma mensagem de um neurônio para o outro. O antipsicótico que Pedro tomou também se encaixa nessa mesma fechadura — o receptor de dopamina —, mas, em vez de abri-la, ele a bloqueia, impedindo que o excesso de dopamina continue enviando as mensagens que estavam causando as alucinações.

Parte 2 - Um efeito que ninguém esperava:
Duas semanas depois, a equipe percebe que Pedro está com as mãos trêmulas, os movimentos mais lentos e o corpo um pouco rígido, como se estivesse "enferrujado". A psicóloga que o acompanha fica em dúvida se isso é ansiedade ou algo relacionado à medicação, e conversa com a equipe médica.
O motivo é que os receptores de dopamina bloqueados pelo antipsicótico não existem apenas na região do cérebro ligada aos sintomas psicóticos — eles também estão presentes em uma região que ajuda a controlar os movimentos do corpo. Ao bloquear essa "fechadura" em todos os lugares onde ela existe, o remédio ajuda com os sintomas psicóticos, mas também acaba interferindo no controle motor, causando os tremores e a rigidez observados.

Parte 3 - Outro tipo de "chave":
No mesmo setor, Marina, 50 anos, com dificuldade para dormir, recebeu um comprimido de diazepam à noite. Diferentemente do remédio de Pedro, o diazepam não bloqueia a fechadura: ele se encaixa nela e a "gira", ativando diretamente o sistema natural de calma do cérebro (os receptores de GABA), o que a deixa relaxada e sonolenta.`,
    questions: [
      "O que é, em palavras simples, um receptor? Por que a analogia da 'chave e da fechadura' ajuda a entender como os remédios psiquiátricos agem?",
      "Qual a diferença entre um fármaco agonista e um antagonista? Use os casos de Marina e Pedro como exemplo de cada um.",
      "Por que o antipsicótico ajudou a reduzir os sintomas psicóticos de Pedro, mas também causou tremores e rigidez?",
      "Na sua futura prática como psicólogo(a), por que é importante saber que um sintoma 'novo' (como tremores) pode ser efeito colateral de um remédio, e não necessariamente um sinal emocional?",
      "Como você explicaria, sem termos técnicos, o mecanismo de ação de um remédio psiquiátrico para um paciente ou familiar?"
    ],
    googleFormUrl: ""
  },
  {
    id: "caso-2",
    title: "Dose, Efeito e Corpo: Relação Dose-Resposta, Tolerância e Dependência",
    description: `Parte 1 - O início do tratamento:
Marcos, 40 anos, começou a tomar um remédio para dormir (um benzodiazepínico), em dose baixa, prescrito por um médico depois de um período de muito estresse no trabalho. Na dose inicial, ele passou a dormir bem, sem sonolência excessiva no dia seguinte.

Parte 2 - Alguns meses depois:
Com o tempo, Marcos percebe que a mesma dose já não faz o mesmo efeito de antes: ele demora mais para pegar no sono e acorda no meio da noite. Sem avisar o médico, ele começa a tomar um comprimido a mais por conta própria, "só para garantir que vai dormir".

Parte 3 - A tentativa de parar:
Alguns meses depois, incentivado pela esposa, Marcos decide parar de tomar o remédio de uma vez, sem orientação médica. Nos dias seguintes, ele fica muito ansioso, com tremores, insônia ainda pior do que antes de começar o tratamento e uma sensação geral de mal-estar. Preocupado, ele procura orientação psicológica.`,
    questions: [
      "Por que, com o passar do tempo, a mesma dose do remédio deixou de fazer o mesmo efeito em Marcos? Que nome se dá a esse fenômeno?",
      "O que significa dizer que existe uma 'janela terapêutica' entre a dose que faz efeito e a dose que pode causar problemas? Por que aumentar a dose por conta própria pode ser arriscado?",
      "O que aconteceu com Marcos quando tentou parar de tomar o remédio de uma vez? Que nome se dá a esse fenômeno, e por que ele acontece?",
      "Qual é a diferença entre tolerância e dependência?",
      "Como psicólogo(a), o que você faria se um paciente contasse que está aumentando, por conta própria, a dose de um remédio prescrito?"
    ],
    googleFormUrl: ""
  }
];
