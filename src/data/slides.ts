import { Slide, LessonQuiz, CaseStudy, GlossaryTerm } from "../types";

export const slides: Slide[] = [
  {
    id: 1,
    title: "Farmacocinética × Farmacodinâmica",
    subtitle: "Dois lados da mesma moeda",
    content: [
      "Farmacocinética (O que o corpo faz com a droga): Absorção, distribuição, metabolismo e excreção.",
      "Farmacodinâmica (O que a droga faz no corpo): Interação do fármaco com receptores e a tradução em resposta biológica.",
      "A farmacocinética determina se a concentração no alvo é suficiente.",
      "A farmacodinâmica determina o tamanho e a natureza da resposta."
    ],
    analogy: "A Farmacocinética é a viagem da chave até a fechadura. A Farmacodinâmica é o girar da chave e a porta se abrindo.",
    psychologyNote: "A farmacocinética explica por que o medicamento demora a 'chegar'; a farmacodinâmica explica por que o paciente sente o que sente — e por que o mesmo fármaco afeta pessoas diferentes."
  },
  {
    id: 2,
    title: "Do Axioma de Ehrlich à Proteína Clonada",
    subtitle: "A ideia de receptor",
    content: [
      "'Corpora non agunt nisi fixata' — substâncias não agem, a menos que se fixem (Paul Ehrlich, 1900).",
      "Receptores são proteínas celulares que reconhecem ligantes específicos e traduzem isso em resposta.",
      "Ligantes Endógenos: Hormônios, neurotransmissores (serotonina, dopamina).",
      "Ligantes Exógenos: Fármacos (ISRS, antipsicóticos, cafeína)."
    ],
    psychologyNote: "Todo psicofármaco 'conversa' com um sistema de comunicação que já existe no cérebro — ele não cria nada novo, apenas modula mensagens naturais."
  },
  {
    id: 25,
    title: "Mecanismo de Encaixe: Chave e Fechadura",
    subtitle: "Especificidade Química",
    content: [
      "Substrato ou ligante atua como a 'chave' com formato único.",
      "A enzima ou receptor é a 'fechadura' (Sítio Ativo Complementar).",
      "Apenas moléculas com a forma correta se encaixam e causam o efeito biológico. Moléculas que não se encaixam não ativam o receptor."
    ],
    imageUrl: new URL('../assets/images/modelo-chave-fechadura.jpg', import.meta.url).href,
    imageAlt: "Diagrama ilustrando o modelo chave-fechadura com enzimas e receptores",
    audioDescription: "A imagem mostra a analogia da chave e fechadura. A chave representa uma molécula com forma única. A fechadura representa o local de encaixe no receptor. Moléculas com formato adequado se encaixam, ativando a célula e causando reações. Moléculas de formato diferente são repelidas e não ativam o receptor.",
    psychologyNote: "A especificidade é o que permite que uma medicação aja em uma área do cérebro sem desligar o cérebro inteiro."
  },
  {
    id: 26,
    title: "A Sinapse: Comunicação Entre Neurônios",
    subtitle: "O espaço interneuronal",
    content: [
      "O sinal elétrico viaja pelo axônio até a terminação (neurônio pré-sináptico).",
      "Vesículas sinápticas se fundem à membrana e liberam neurotransmissores na fenda sináptica.",
      "Eles se conectam a receptores específicos no dendrito pós-sináptico, abrindo canais de íons e gerando um novo sinal elétrico."
    ],
    imageUrl: new URL('../assets/images/sinapse-comunicacao.jpg', import.meta.url).href,
    imageAlt: "Diagrama mostrando a liberação de neurotransmissores na fenda sináptica entre o axônio e o dendrito",
    audioDescription: "A imagem ilustra um neurônio pré-sináptico liberando neurotransmissores de vesículas na fenda sináptica. O sinal elétrico chega, o cálcio entra e as vesículas liberam as moléculas. Essas moléculas se ligam aos receptores no neurônio pós-sináptico, permitindo a entrada de sódio e gerando um novo sinal elétrico.",
  },
  {
    id: 27,
    title: "Sinapses e Neurotransmissores",
    subtitle: "Mensageiros Químicos",
    content: [
      "Serotonina: Regulação do humor, sono e apetite.",
      "Dopamina: Motivação, recompensa e controle motor.",
      "GABA: Principal inibitório. Reduz a atividade neural.",
      "Glutamato: Principal excitatório. Essencial para aprendizado e memória."
    ],
    imageUrl: new URL('../assets/images/sinapses-neurotransmissores.jpg', import.meta.url).href,
    imageAlt: "Comparativo entre a estrutura da sinapse e os principais neurotransmissores (Serotonina, Dopamina, GABA, Glutamato)",
    audioDescription: "A imagem faz um comparativo visual. À esquerda, a sinapse converte sinais elétricos em sinais químicos de forma unidirecional. À direita, detalha quatro neurotransmissores principais que atuam como chaves nesses receptores: Serotonina, Dopamina, GABA e Glutamato, com seus respectivos papéis na saúde mental."
  },
  {
    id: 3,
    title: "Os Quatro Tipos de Receptores",
    subtitle: "A velocidade do efeito espelha o mecanismo",
    content: [
      "Tipo 1: Canais iônicos controlados por ligantes (Milissegundos). Ex: GABAA, NMDA.",
      "Tipo 2: Acoplados à proteína G - GPCR (Segundos-minutos). A maior família. Ex: D2, 5-HT.",
      "Tipo 3: Ligados a quinases (Minutos-horas). Ex: Insulina.",
      "Tipo 4: Receptores nucleares (Horas-dias). Ex: Esteroides, hormônios tireoidianos."
    ],
    audioDescription: "Existem quatro tipos de receptores principais. Tipo 1, canais iônicos, age em milissegundos. Tipo 2, acoplados a proteína G, age em segundos a minutos. Tipo 3, ligados a quinases, agem em minutos a horas. Tipo 4, receptores nucleares, agem em horas a dias.",
    psychologyNote: "A velocidade do efeito clínico é diretamente ligada ao tipo de receptor ativado."
  },
  {
    id: 4,
    title: "Agonistas e Antagonistas",
    subtitle: "A chave que abre vs A chave que emperra",
    content: [
      "Fármaco Agonista (Estimulação): É a 'chave' que se encaixa na fechadura e consegue girá-la, ativando o receptor. Ele imita o que a substância natural faria (ex: Diazepam age como agonista ativando os receptores GABA, gerando calma).",
      "Fármaco Antagonista (Bloqueio): É a 'chave falsa'. Ela entra na fechadura perfeitamente, mas não gira. Pior: ela fica lá presa, impedindo que a chave verdadeira (neurotransmissor) entre. (ex: Antipsicóticos bloqueiam o receptor de dopamina, impedindo alucinações).",
      "Agonista Parcial: Ativa o receptor, mas de forma 'fraca' (não gira a chave até o fim). Útil para equilibrar sistemas."
    ],
    imageUrl: new URL('../assets/images/agonistas-antagonistas.jpg', import.meta.url).href,
    imageAlt: "Ilustração dos mecanismos básicos de fármacos e receptores: Agonistas, Antagonistas e Inibidores de recaptação",
    audioDescription: "A imagem mostra mecanismos de fármacos. O agonista se liga e ativa o receptor, causando estimulação. O antagonista se liga, mas funciona como um escudo, bloqueando a ativação. O inibidor de recaptação impede a reciclagem, causando acúmulo prolongado do neurotransmissor.",
    analogy: "O agonista é uma chave que entra na fechadura e abre a porta. O antagonista é uma chave falsa que entra na fechadura e emperra.",
    psychologyNote: "Os psicofármacos não são 'mágicos' — são chaves químicas que giram para um lado (agonista) ou emperram a fechadura (antagonista)."
  },
  {
    id: 5,
    title: "Afinidade e Eficácia",
    subtitle: "Aspectos Especiais da Ação de Fármacos",
    content: [
      "Afinidade (Capacidade de Ligação): Alta afinidade significa um forte ajuste magnético. Baixa afinidade é um ajuste fraco.",
      "Eficácia (Capacidade Intrínseca): O agonista total liga e acende a luz no máximo (Resposta Máxima).",
      "Agonista Parcial tem resposta intermediária. Antagonista bloqueia a resposta (Eficácia zero)."
    ],
    imageUrl: new URL('../assets/images/afinidade-eficacia.jpg', import.meta.url).href,
    imageAlt: "Esquema visual mostrando Afinidade (alta vs baixa) e Eficácia (agonista total, parcial e antagonista)",
    audioDescription: "Na ilustração, afinidade é mostrada por imãs puxando as moléculas com mais ou menos força para o receptor. A eficácia é representada por uma lâmpada: o agonista total acende a luz forte. O parcial acende a luz fraca. O antagonista não acende a luz.",
    psychologyNote: "'Ligar bem' (afinidade) não significa 'agir forte' (eficácia). Isso explica por que alguns bloqueadores potentes parecem não fazer nada até o neurotransmissor natural aparecer."
  },
  {
    id: 6,
    title: "A Curva Concentração-Resposta",
    subtitle: "A sigmoide que resume tudo",
    content: [
      "EC50 (Posição horizontal): Concentração que produz 50% da resposta máxima. Mede a Potência.",
      "Emax (Teto vertical): Resposta máxima que o fármaco consegue produzir. Mede a Eficácia máxima.",
      "Em escala logarítmica, a curva torna-se uma sigmoide simétrica."
    ],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Gráfico abstrato simulando dados clínicos de concentração e efeito",
    audioDescription: `Audiodescrição detalhada do gráfico

A imagem apresenta um gráfico de concentração (dose) versus resposta, utilizado para ilustrar como diferentes tipos de fármacos produzem efeitos conforme sua dose ou concentração aumenta.

No topo do gráfico, centralizado, está o título “Curva de Concentração (Dose) vs Resposta”.

O gráfico possui dois eixos principais:

O eixo vertical, à esquerda, representa a “% Resposta Máxima (Efeito)”. Ele possui uma seta apontando para cima, indicando o aumento da intensidade do efeito.
O eixo horizontal, na parte inferior, representa a “Log Concentração do Fármaco (Dose)”. Uma seta aponta para a direita, indicando o aumento da concentração ou dose do medicamento.

Há duas linhas horizontais tracejadas que servem como referências:

uma na altura de 50% da resposta máxima;
outra na altura de 100%.

O gráfico mostra três curvas, cada uma representando um comportamento farmacológico diferente.

1. Agonista total — curva azul

A curva azul começa próxima à origem, na região inferior esquerda do gráfico. À medida que a concentração do fármaco aumenta, a resposta também aumenta.

A curva tem formato sigmoide, ou seja, apresenta um crescimento inicialmente mais lento, depois uma região de aumento mais acentuado e, por fim, vai se tornando mais horizontal.

Ela alcança aproximadamente 100% da resposta máxima, formando um platô na região superior do gráfico. Ao lado dessa curva, em azul, aparece a legenda “Agonista Total (Emax = 100%)”, indicando que esse fármaco é capaz de produzir o efeito máximo.

2. Agonista parcial — curva verde

A curva verde também começa próxima à origem e apresenta um formato sigmoide semelhante ao da curva azul.

Entretanto, mesmo com o aumento da concentração, ela atinge um platô mais baixo, aproximadamente em 70% da resposta máxima.

Ao lado da curva aparece, em verde, a identificação “Agonista Parcial (Emax Menor)”. Isso representa um fármaco que produz uma resposta, mas cuja eficácia máxima é inferior à do agonista total.

3. Antagonista — linha vermelha

Na parte inferior do gráfico há uma linha vermelha praticamente horizontal, próxima de 0% de resposta.

Ela está identificada, em vermelho, como “Antagonista (Sem Eficácia)”.

A linha permanece no nível basal mesmo quando a concentração do fármaco aumenta, representando um antagonista que, isoladamente, não produz resposta ou efeito farmacológico significativo.

Marcação de EC50

Há ainda uma marcação importante na região esquerda do gráfico.

Uma linha vertical azul pontilhada parte do eixo horizontal e sobe até a altura correspondente a 50% da resposta máxima. No topo dessa linha há um ponto azul localizado exatamente sobre a curva azul.

Na base da linha está escrito “EC50”.

Essa marcação representa a concentração necessária para produzir 50% do efeito máximo do agonista. A posição da EC50 no eixo horizontal também permite visualizar a potência relativa do fármaco.

Síntese visual

Em termos visuais, o gráfico permite comparar três situações:

Azul: agonista total → aumenta a resposta até aproximadamente 100%.
Verde: agonista parcial → aumenta a resposta, mas atinge apenas cerca de 70%.
Vermelho: antagonista → permanece próximo de 0% de resposta.

Assim, o elemento central da figura é a comparação entre eficácia máxima: o agonista total produz o maior efeito, o agonista parcial produz um efeito máximo menor e o antagonista não apresenta eficácia própria.`,
    psychologyNote: "Essa curva é a língua universal da farmacologia — é nela que se decide 'qual fármaco faz mais com menos'."
  },
  {
    id: 7,
    title: "Potência × Eficácia",
    subtitle: "Não confunda",
    content: [
      "Potência: A dose necessária para produzir 50% do efeito. Diz 'quanto' fármaco é preciso.",
      "Eficácia: O efeito máximo capaz de ser produzido. Diz 'o que é possível alcançar'.",
      "Exemplo: Fentanil é 100x mais potente que a morfina (precisa de menos miligramas), mas ambos têm eficácia alta."
    ],
    psychologyNote: "Antidepressivos de classes diferentes têm eficácia máxima semelhante; a escolha raramente se decide por 'droga mais potente', e sim por tolerabilidade e perfil do paciente."
  },
  {
    id: 8,
    title: "Antagonismo Competitivo vs Não Competitivo",
    content: [
      "Competitivo: Liga-se ao mesmo sítio de forma reversível. Mais agonista vence a disputa (desloca a curva para a direita, mas mantém o teto).",
      "Não Competitivo: Corta a cadeia de resposta (ex: bloqueia o canal por dentro). Não é superável por excesso de agonista (abaixa o teto)."
    ],
    analogy: "Competitivo é disputar uma cadeira: se você trouxer mais amigos, vocês tomam a cadeira de volta. Não competitivo é furar o pneu do carro: não importa o quanto você acelere, o carro não anda.",
    psychologyNote: "O antagonismo competitivo é a base da naloxona na overdose por opioides. A cetamina é um antagonista não competitivo do NMDA, mudando a química sem competir diretamente pelo mesmo lugar do glutamato."
  },
  {
    id: 9,
    title: "Agonista Parcial e Modulação Alostérica",
    content: [
      "Agonista Parcial: Ativa, mas com teto mais baixo. Mesmo ocupando tudo, a resposta é submáxima. Age como antagonista se houver muito ligante endógeno.",
      "Modulação Alostérica: Age fora do sítio principal. Aumenta ou diminui a ação do ligante natural sem ativar o receptor sozinho."
    ],
    psychologyNote: "A buspirona é um agonista parcial (ansiolítico suave). Benzodiazepínicos são moduladores alostéricos: só funcionam amplificando o GABA que já está lá."
  },
  {
    id: 10,
    title: "Dessensibilização e Tolerância",
    subtitle: "Neuroplasticidade e Adaptação",
    content: [
      "O organismo compensa a exposição contínua a um fármaco pelo fator tempo no cérebro.",
      "Curto prazo (Dias/Semanas): Ação aguda do fármaco com bloqueios ou estímulos imediatos.",
      "Médio Prazo (Semanas): Down-regulation. Resposta a agonistas constantes causa redução do número de receptores.",
      "Longo Prazo (Meses): Up-regulation. Resposta a antagonistas constantes faz o cérebro aumentar receptores (hipersensibilidade)."
    ],
    imageUrl: new URL('../assets/images/neuroplasticidade-adaptacao.jpg', import.meta.url).href,
    imageAlt: "Diagrama cronológico das adaptações sinápticas da neuroplasticidade: estado inicial, ação aguda, down-regulation e up-regulation",
    audioDescription: "A imagem mostra três estágios do fator tempo no cérebro. No início, a sinapse é equilibrada. Com uso agudo de fármaco por dias, há bloqueios ou superestimulação. A médio prazo, ocorre down-regulation, reduzindo os receptores para tolerância. A longo prazo com bloqueio, ocorre up-regulation, multiplicando receptores e causando hipersensibilidade.",
    psychologyNote: "Isso explica por que o ansiolítico 'para de fazer o mesmo efeito' com o tempo — e por que suspender de golpe produz efeito rebote grave."
  },
  {
    id: 11,
    title: "A Transdução de Sinal",
    subtitle: "Do Receptor à Resposta",
    content: [
      "Ligar ao receptor é só o primeiro passo. O sinal é traduzido em eventos intracelulares.",
      "1 receptor ativado dispara uma cascata com milhares de efetores (Amplificação).",
      "A cascata define a velocidade, intensidade e duração do efeito clínico."
    ]
  },
  {
    id: 12,
    title: "Receptores Acoplados à Proteína G (GPCR)",
    content: [
      "A maior família de receptores (~800 genes). Alvo de 30 a 40% dos fármacos.",
      "O ligante se fixa, e a face intracelular acopla e ativa uma proteína G, formada por subunidades alfa, beta e gama.",
      "A subunidade alfa se dissocia e ativa ou inibe efetores (como a adenilciclase).",
      "Vias principais: Gs (estimula cAMP), Gi (inibe cAMP), Gq (ativa cálcio via IP3/DAG)."
    ],
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Diagrama esquemático do mecanismo de ação de um receptor acoplado à proteína G",
    audioDescription: `Audiodescrição detalhada da imagem

A imagem apresenta um diagrama esquemático do mecanismo de ação de um receptor acoplado à proteína G, identificado pela sigla GPCR. O objetivo da figura é representar, de forma simplificada, como a ligação de um fármaco ou ligante ao receptor localizado na membrana celular pode desencadear uma resposta intracelular por meio de uma proteína G, de um segundo mensageiro e de um efetor.

No topo, centralizado, aparece o título em azul-escuro: “Mecanismo: Receptor Acoplado à Proteína G (GPCR)”.

Membrana celular e orientação

No centro da imagem há uma representação horizontal da membrana celular, formada por duas fileiras de pequenas estruturas cinza-azuladas que representam os componentes da bicamada lipídica.

À esquerda da membrana aparecem duas indicações de localização:

“Extracelular”, acima da membrana, indicando o espaço externo à célula.
“Intracelular”, abaixo da membrana, indicando o interior da célula.

A orientação é importante: a parte superior representa o meio extracelular e a parte inferior representa o meio intracelular.

Receptor GPCR

A estrutura principal é uma grande linha azul que atravessa a membrana várias vezes, formando sete segmentos transmembranares. O desenho tem um formato ondulado, semelhante a uma sequência de alças que atravessam repetidamente a bicamada.

Essa estrutura representa o receptor acoplado à proteína G, ou GPCR.

Na extremidade superior esquerda do receptor há uma esfera vermelha, acompanhada da indicação “Fármaco/Ligante”, também em vermelho. Uma pequena linha vermelha conecta o texto à esfera.

A esfera representa uma molécula de fármaco ou ligante que se liga à região extracelular do receptor. Essa ligação representa o início da sinalização.

Proteína G

Na região inferior direita do receptor, no lado intracelular da membrana, há três elementos coloridos que representam as subunidades da proteína G:

uma esfera laranja, identificada pela letra grega α (alfa);
uma esfera verde, identificada pela letra grega β (beta);
uma esfera azul, identificada pela letra grega γ (gama).

As três aparecem agrupadas próximas à porção intracelular do receptor.

A subunidade alfa está destacada em laranja e ocupa a posição mais à esquerda do conjunto. As subunidades beta e gama aparecem próximas umas das outras, formando o complexo βγ.

Segundo mensageiro

Na parte inferior direita da imagem aparece o texto em roxo:

“2º Mensageiro (ex: cAMP)”.

A expressão indica que a ativação da proteína G pode levar à produção ou modulação de um segundo mensageiro intracelular, como o AMP cíclico, ou cAMP.

Próximo à proteína G há uma linha curva pontilhada em laranja, sugerindo a sequência de sinalização que parte da proteína G em direção aos componentes seguintes da via.

Efetor

Mais à direita está representado um retângulo roxo arredondado, localizado no lado intracelular da membrana.

Acima dele aparece a identificação:

“Efetor (ex: Adenilciclase)”.

Uma linha vertical roxa conecta o retângulo à região inferior, indicando sua participação na via de sinalização.

A adenilciclase é apresentada como exemplo de efetor. Em determinadas vias de GPCR, a subunidade alfa da proteína G pode regular a adenilciclase, que participa da formação do cAMP, um importante segundo mensageiro intracelular.

Sequência geral representada

Visualmente, o diagrama pode ser compreendido como uma sequência de eventos:

Fármaco/ligante → receptor GPCR → proteína G → efetor → segundo mensageiro → resposta intracelular.

A imagem enfatiza, portanto, que o fármaco ou ligante não precisa entrar na célula para desencadear uma resposta. Ele se liga ao receptor na superfície celular, e o sinal é transmitido para o interior da célula por meio da proteína G e de outros componentes da cascata de sinalização.

Em resumo: a figura mostra um receptor de sete passagens pela membrana, ativado por um ligante no lado extracelular, conectado no lado intracelular a uma proteína G formada pelas subunidades α, β e γ. A ativação dessa proteína pode regular um efetor, como a adenilciclase, levando à formação de um segundo mensageiro, como o cAMP, que participa da produção da resposta celular.`,
    psychologyNote: "Fármacos como antipsicóticos (bloqueiam D2, um GPCR) agem por esta via."
  },
  {
    id: 13,
    title: "Segundos Mensageiros",
    subtitle: "cAMP, IP3 e Cálcio",
    content: [
      "A proteína G ativa enzimas que criam 'segundos mensageiros' (ex: cAMP).",
      "Eles ativam quinases (como a PKA) que fosforilam outras proteínas e até entram no núcleo para alterar a expressão de genes (como o BDNF).",
      "O sinal precisa terminar: enzimas degradam os mensageiros para o receptor não esgotar."
    ],
    psychologyNote: "A via do cAMP e do fator CREB é fundamental para o efeito tardio e neuroplástico dos antidepressivos."
  },
  {
    id: 14,
    title: "Receptores Ionotrópicos",
    subtitle: "A via expressa (Milissegundos)",
    content: [
      "Canais iônicos controlados por ligante. O poro abre e o íon passa rapidamente.",
      "GABAA: Principal inibitório (freio). Alvo dos benzodiazepínicos e álcool.",
      "AMPA/NMDA: Principal excitatório (acelerador). Glutamato atua aqui."
    ],
    psychologyNote: "Esses receptores agem em milissegundos. É por isso que a sedação de um BZD ou o efeito da cetamina aparecem na mesma sessão."
  },
  {
    id: 15,
    title: "Receptores Nucleares",
    subtitle: "A via lenta e duradoura",
    content: [
      "Hormônios lipossolúveis atravessam a membrana e ligam-se dentro da célula ou núcleo.",
      "O complexo altera a transcrição de genes, sintetizando novas proteínas.",
      "Leva de horas a dias, e o efeito perdura após a retirada."
    ],
    psychologyNote: "Alterações de humor em pacientes sob corticoides ou com hipotireoidismo frequentemente têm causa endócrina primária, devido à ação profunda desses receptores nucleares."
  },
  {
    id: 16,
    title: "O Mapa Receptor-Psicofármaco",
    content: [
      "Antipsicóticos Típicos: D2 (GPCR Gi) - Antagonista.",
      "ISRS: SERT - Inibidor de recaptação.",
      "Benzodiazepínicos: GABAA - Modulador Alostérico.",
      "Cetamina: NMDA - Antagonista não competitivo."
    ],
    imageUrl: "https://images.unsplash.com/photo-1631556097152-c3132e4822bc?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Painel médico com representações de exames ou mapas complexos",
    audioDescription: "A tabela relaciona antipsicóticos ao bloqueio do receptor D2, ISRS à inibição do transportador SERT, benzodiazepínicos à modulação do canal GABAA e cetamina ao bloqueio do canal NMDA. Mostra que o mesmo alvo determina efeitos terapêuticos e colaterais.",
    psychologyNote: "Este mapa é a bússola para ler qualquer prescrição: alvo + tipo de receptor preveem velocidade e efeitos."
  },
  {
    id: 17,
    title: "Receptores de Reserva",
    subtitle: "O máximo com menos",
    content: [
      "Em muitos tecidos, a resposta máxima é alcançada ocupando apenas uma fração dos receptores.",
      "A reserva existe quando o sistema efetor satura antes do receptor.",
      "Tecidos com grande reserva respondem a doses baixíssimas."
    ],
    psychologyNote: "Isso explica por que a naloxona pode falhar inicialmente em reverter uma overdose de buprenorfina, exigindo doses muito maiores para superar a reserva do tecido."
  },
  {
    id: 18,
    title: "Curva Quantal e Índice Terapêutico",
    content: [
      "Diferente da curva gradual (que vê o efeito em uma pessoa), a curva quantal mede a proporção de uma POPULAÇÃO que atinge o efeito terapêutico desejado (uma resposta 'tudo ou nada').",
      "DE50 (Dose Eficaz 50%): Dose que produz o efeito desejado em 50% dos pacientes.",
      "DT50 (Dose Tóxica 50%): Dose que produz toxicidade em 50% dos pacientes.",
      "Janela Terapêutica (Índice Terapêutico): É a 'distância' segura entre a dose que faz o efeito desejado (cura) e a dose que causa efeitos adversos graves (intoxica).",
      "Exemplo de Janela Larga (Seguro): Penicilina. A dose tóxica é imensamente maior que a terapêutica.",
      "Exemplo de Janela Estreita (Perigoso): Lítio ou alguns sedativos. Pequenas alterações na dose, como tomar 'um comprimido a mais', podem rapidamente ultrapassar o teto terapêutico e invadir a zona de toxicidade.",
      "O Perigo da Automedicação: Aumentar a dose por conta própria (devido à tolerância, por exemplo) ignora os limites da Janela Terapêutica, colocando o paciente em risco de depressão respiratória ou morte."
    ],
    psychologyNote: "Fármacos psiquiátricos como Lítio e Carbamazepina têm IT estreito. Você será frequentemente o primeiro a notar sinais de toxicidade (tremores, confusão mental, ataxia), permitindo uma intervenção médica antes que o quadro se agrave."
  },
  {
    id: 19,
    title: "Efeito Adverso: É parte do mecanismo",
    content: [
      "O efeito colateral de um psicofármaco não é um 'erro' ou 'alergia', mas sim uma consequência direta do seu mecanismo em outras áreas do cérebro.",
      "On-target (No mesmo alvo, em local errado): Um antipsicótico bloqueia os receptores de dopamina para parar as alucinações. O problema é que há receptores de dopamina em vias motoras também. O bloqueio lá causa rigidez, tremores e lentidão (parkinsonismo medicamentoso).",
      "Off-target (Em alvos secundários): Um antidepressivo que também se liga a receptores de histamina por 'acidente', causando sonolência."
    ],
    psychologyNote: "Por que o psicólogo deve saber isso? Porque um sintoma 'novo' (como tremores ou apatia extrema) muitas vezes não é piora emocional, ansiedade ou uma nova doença, mas sim um efeito adverso direto do bloqueio de receptores."
  },
  {
    id: 20,
    title: "Interações Farmacodinâmicas",
    subtitle: "Quando drogas se encontram no efeito",
    content: [
      "Sinergismo perigoso: Duas drogas potencializam a mesma via (Ex: Álcool + BZD aumentam o GABA brutalmente).",
      "Antagonismo de resgate: Antagonista desloca o agonista para reverter toxicidade (Naloxona).",
      "Antagonismo como terapia: Bloquear o receptor é o tratamento para sinais desregulados."
    ],
    psychologyNote: "O uso de álcool é a interação mais subnotificada. Duas drogas que tocam a mesma via somam riscos não lineares."
  },
  {
    id: 21,
    title: "Síndrome Serotoninérgica",
    subtitle: "O excesso nos receptores",
    content: [
      "Causada por excesso de serotonina nos receptores (combinação de ISRS, IMAO, MDMA, etc).",
      "Sintomas mentais: Agitação, confusão.",
      "Neuromusculares: Clônus, hiperreflexia, tremor.",
      "Autonômicos: Hipertermia, sudorese, taquicardia."
    ],
    psychologyNote: "Tremor, hipertermia e agitação não são apenas 'piora da ansiedade', podem ser uma emergência médica se houver combinações serotoninérgicas."
  },
  {
    id: 22,
    title: "Rebote e Supersensibilidade",
    content: [
      "O organismo compensa a droga crônica mudando o número de receptores.",
      "Retirada de agonista (BZD): Sistema hipofuncionante causa Rebote (ansiedade, insônia).",
      "Retirada de antagonista: Supersensibilidade por aumento de receptores (discinesia tardia por antipsicóticos crônicos)."
    ],
    analogy: "É como empurrar uma porta pesada. Se alguém abre a porta de repente (retirada da droga), você cai para a frente (rebote).",
    psychologyNote: "Se o paciente 'piorou muito' logo após parar o remédio sozinho, frequentemente é rebote, não recaída. O desmame gradual é a solução."
  },
  {
    id: 23,
    title: "Placebo e Nocebo",
    subtitle: "A farmacodinâmica da expectativa",
    content: [
      "Placebo: Melhora gerada pela expectativa. Aciona vias reais (endorfinas, dopamina).",
      "Nocebo: Antecipação de piora ou leitura excessiva de bulas gera sintomas adversos reais (náusea, dor).",
      "Eficácia real da droga = Efeito medido - Efeito placebo."
    ],
    psychologyNote: "A linguagem do terapeuta importa. Dizer 'isso costuma dar muita insônia' pode induzir o nocebo. Prefira: 'vamos observar juntos como seu corpo responde'."
  },
  {
    id: 24,
    title: "O Papel do Psicólogo na Farmacodinâmica",
    subtitle: "A sessão como laboratório clínico",
    content: [
      "Por que o psicólogo precisa entender receptores e transdução de sinal se ele não prescreve?",
      "1. Observador Qualificado (Adesão e Tolerância): Você é quem nota quando um medicamento 'para de fazer efeito' (dessensibilização/taquifilaxia) porque o paciente está relatando o retorno dos sintomas. Você pode explicar que não é 'culpa' do paciente, mas uma neuroadaptação natural dos receptores (down-regulation).",
      "2. Diferenciação Clínica (Sintoma vs. Efeito Adverso): Um paciente agitado pode estar ansioso ou apresentando acatisia (efeito adverso de antipsicóticos devido ao antagonismo D2). Entender o mecanismo de ação permite encaminhar corretamente ao psiquiatra.",
      "3. Gestão de Expectativas (Placebo e Nocebo): A aliança terapêutica e a psicoeducação sobre como o remédio funciona reduzem a ansiedade. O psicólogo mitiga o efeito nocebo ao acolher medos e monitora o tempo de ação (ex: antidepressivos demoram dias/semanas para alterar a expressão gênica, o paciente precisa ser encorajado a não desistir).",
      "4. Manejo da Automedicação: Pacientes frequentemente aumentam a dose por conta própria ao sentirem os efeitos da Tolerância. O psicólogo deve intervir educativamente, explicando os perigos da Janela Terapêutica estreita, e orientá-lo firmemente a não alterar doses sem consultar o psiquiatra."
    ],
    psychologyNote: "Sua função não é prescrever, mas sim ser a ponte de segurança. Se um paciente relata aumentar sedativos sozinho para dormir, a conduta ética é investigar o comportamento (fuga, estresse) e alinhar imediatamente com o médico prescritor."
  }
];

