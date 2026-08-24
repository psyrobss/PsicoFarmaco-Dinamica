import { Slide, LessonQuiz, CaseStudy, GlossaryTerm } from "../types";

export const quizzes: LessonQuiz[] = [
  {
    title: "Revisão Parte 1: Fundamentos",
    questions: [
      {
        id: "q1",
        textBefore: "A ",
        answer: "farmacodinâmica",
        acceptedAnswers: ["farmacodinâmica", "farmacodinamica", "farmacodinamico"],
        distractor: "farmacocinética",
        textAfter: " estuda o que a droga faz no corpo e como ela age nos receptores.",
        hint: "O oposto da farmacocinética.",
        explanation: "Enquanto a farmacocinética foca no caminho da droga pelo corpo (absorção, metabolismo, etc.), a farmacodinâmica foca na interação direta do fármaco com o receptor para gerar uma resposta celular."
      },
      {
        id: "q2",
        textBefore: "Um ",
        answer: "agonista",
        acceptedAnswers: ["agonista", "ligante", "ligante agonista", "ligante endógeno", "ligante endogeno"],
        distractor: "antagonista",
        textAfter: " liga-se ao receptor e o ativa, imitando o ligante natural do corpo.",
        hint: "A chave verdadeira que abre a porta.",
        explanation: "O agonista imita a substância natural. Ele possui afinidade (liga-se ao receptor) e eficácia (ativa o receptor). Diferente do antagonista, que apenas se liga e bloqueia."
      }
    ]
  },
  {
    title: "Revisão Parte 2: Sistemas e Transdução",
    questions: [
      {
        id: "q3",
        textBefore: "Receptores ",
        answer: "ionotrópicos",
        acceptedAnswers: ["ionotrópicos", "ionotropicos", "ionotropico", "ionotrópico", "canais iônicos", "canais ionicos"],
        distractor: "metabotrópicos",
        textAfter: " atuam de forma extremamente rápida (em milissegundos), controlando a passagem de íons.",
        hint: "A 'via expressa' elétrica.",
        explanation: "Esses receptores são canais que se abrem imediatamente após a ligação do fármaco, permitindo o fluxo de íons. Exemplos incluem os receptores GABAA e NMDA."
      },
      {
        id: "q4",
        textBefore: "A via de receptores nucleares leva horas a dias porque depende da transcrição e produção de novas ",
        answer: "proteínas",
        acceptedAnswers: ["proteínas", "proteinas", "proteína", "proteina"],
        distractor: "gorduras",
        textAfter: " no interior da célula.",
        hint: "São os tijolos construtores celulares.",
        explanation: "Como os receptores nucleares agem no DNA para transcrever genes, o efeito clínico (ex: corticoides) só aparece após a célula sintetizar e liberar as novas proteínas no organismo."
      }
    ]
  },
  {
    title: "Revisão Parte 3: Aplicação Clínica",
    questions: [
      {
        id: "q5",
        textBefore: "A melhora clínica gerada sem fármaco ativo, impulsionada por expectativas positivas, chama-se efeito ",
        answer: "placebo",
        acceptedAnswers: ["placebo"],
        distractor: "nocebo",
        textAfter: ".",
        hint: "Ocorre em 30-40% dos pacientes nos ensaios clínicos.",
        explanation: "A expectativa de melhora aciona vias biológicas reais, como a liberação de endorfinas e dopamina endógenas. Não é apenas psicológico, possui uma base química no cérebro."
      },
      {
        id: "q6",
        textBefore: "A interrupção abrupta de um psicofármaco pode causar efeito ",
        answer: "rebote",
        acceptedAnswers: ["rebote", "efeito rebote"],
        distractor: "terapêutico",
        textAfter: ", devido à adaptação anterior dos receptores.",
        hint: "O sistema 'responde de volta'.",
        explanation: "O corpo havia reduzido (downregulation) ou aumentado os receptores para se adaptar à droga. Sem a droga subitamente, o sistema descalibrado produz sintomas severos, geralmente opostos ao efeito do remédio."
      }
    ]
  }
];

