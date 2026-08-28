/**
 * Conteúdo literal do PRD "Duelo das Fontes — Antes de acreditar, investigue!".
 * Os textos NÃO devem ser resumidos, reescritos ou substituídos.
 */

export type CriterioId = "quem" | "quando" | "origem" | "confirmam" | "situacao";

export const CRITERIOS: {
  id: CriterioId;
  titulo: string;
  perguntaLupa: string;
  perguntaPainel: string;
}[] = [
  {
    id: "quem",
    titulo: "QUEM?",
    perguntaLupa: "Quem escreveu ou publicou?",
    perguntaPainel: "Quem publicou?",
  },
  {
    id: "quando",
    titulo: "QUANDO?",
    perguntaLupa: "Quando essa informação foi publicada?",
    perguntaPainel: "Quando foi publicada?",
  },
  {
    id: "origem",
    titulo: "DE ONDE VEIO?",
    perguntaLupa: "A página explica de onde tirou essa informação?",
    perguntaPainel: "A informação explica sua origem?",
  },
  {
    id: "confirmam",
    titulo: "OUTRAS FONTES CONFIRMAM?",
    perguntaLupa: "Podemos encontrar essa informação em outro lugar?",
    perguntaPainel: "É possível comparar?",
  },
  {
    id: "situacao",
    titulo: "SERVE PARA ESTA SITUAÇÃO?",
    perguntaLupa: "A informação é atual e vale para este lugar ou problema?",
    perguntaPainel: "A informação é adequada para responder à pergunta atual?",
  },
];

/** Nomes dos itens do Kit do Investigador de Fontes (seção 37). */
export const KIT_ITENS: { id: CriterioId; rotulo: string }[] = [
  { id: "quem", rotulo: "QUEM?" },
  { id: "quando", rotulo: "QUANDO?" },
  { id: "origem", rotulo: "DE ONDE VEIO?" },
  { id: "confirmam", rotulo: "OUTROS CONFIRMAM?" },
  { id: "situacao", rotulo: "SERVE PARA ESTA SITUAÇÃO?" },
];

/** Placeholders de áudio — arquivos MP3 serão enviados depois (seção 38). */
export const AUDIO = {
  capa: "/assets/audio/capa.mp3",
  problema: "/assets/audio/problema.mp3",
  fonte: "/assets/audio/o-que-e-fonte.mp3",
  lupa: "/assets/audio/lupa.mp3",
  duelo1: "/assets/audio/duelo1.mp3",
  duelo1Investigacao: "/assets/audio/duelo1-investigacao.mp3",
  duelo1Painel: "/assets/audio/duelo1-painel.mp3",
  duelo1Decisao: "/assets/audio/duelo1-decisao.mp3",
  duelo2: "/assets/audio/duelo2.mp3",
  duelo2Investigacao: "/assets/audio/duelo2-investigacao.mp3",
  duelo2Comparacao: "/assets/audio/duelo2-comparacao.mp3",
  pistaMagica: "/assets/audio/pista-magica.mp3",
  duelo3: "/assets/audio/duelo3.mp3",
  duelo3Investigacao: "/assets/audio/duelo3-investigacao.mp3",
  duelo3Decisao: "/assets/audio/duelo3-decisao.mp3",
  caminho: "/assets/audio/caminho.mp3",
  metacognicao: "/assets/audio/metacognicao.mp3",
  transferencia: "/assets/audio/transferencia.mp3",
  encerramento: "/assets/audio/encerramento.mp3",
} as const;

export const MAYA = {
  neutra: "/assets/personagens/maya_neutra.png",
  pensando: "/assets/personagens/maya_pensando.png",
  apontando: "/assets/personagens/maya_apontando.png",
  apontandoAcima: "/assets/personagens/maya_apontando_acima.png",
  tablet: "/assets/personagens/maya_tablet.png",
  comemorando: "/assets/personagens/maya_comemorando.png",
} as const;

export const FUNDOS = {
  capa: "/assets/fundos/background_capa.png",
} as const;

/* ---------------- Tela 3 — O que é uma fonte? ---------------- */

export const LIGAR_COLUNAS = {
  definicao: "Fonte é o lugar, pessoa ou instituição de onde uma informação vem.",
  pares: [
    {
      id: "escola",
      colunaA: "Horário de funcionamento da escola",
      colunaB: "Site ou comunicado da escola",
    },
    {
      id: "tempo",
      colunaA: "Previsão do tempo",
      colunaB: "Serviço de meteorologia",
    },
    {
      id: "animais",
      colunaA: "Informação sobre animais",
      colunaB: "Instituição, pesquisador ou especialista da área",
    },
  ],
  feedbackFinal:
    "Saber de onde veio a informação é uma pista importante. Mas ainda precisamos investigar outras coisas.",
};

/* ---------------- Duelo 1 — Feira de Ciências ---------------- */

export const DUELO1 = {
  situacao:
    "Maya precisa descobrir a data da Feira de Ciências para escrever uma notícia.",
  fala: "Quero contar quando acontecerá a Feira de Ciências da escola. Encontrei duas informações diferentes.",
  investigacao: {
    intro: "Antes de colocar a data no jornal, vamos procurar pistas.",
    passo1: "Veja se conseguimos descobrir quando cada informação foi publicada.",
    passo2: "Agora procure quem publicou cada informação.",
  },
  pistas: [
    { id: "p1", texto: "Não apresenta data.", fonte: "A", tipo: "pista" },
    { id: "p2", texto: "Não fica claro quem publicou.", fonte: "A", tipo: "pista" },
    { id: "p3", texto: "A escola está identificada.", fonte: "B", tipo: "pista" },
    { id: "p4", texto: "A informação é deste ano.", fonte: "B", tipo: "pista" },
    { id: "d1", texto: "Tem uma imagem bonita.", fonte: null, tipo: "aparencia" },
    { id: "d2", texto: "Tem letras grandes.", fonte: null, tipo: "aparencia" },
    { id: "d3", texto: "Tem muitas cores.", fonte: null, tipo: "aparencia" },
  ] as const,
  feedbackAparencia:
    "A aparência pode chamar nossa atenção, mas ela não mostra de onde veio a informação. Procure pistas sobre data, autoria e origem.",
  decisao: {
    pergunta: "Qual fonte você usaria para informar a data da Feira de Ciências deste ano?",
    perguntaPista: "Qual pista ajudou mais na sua decisão?",
    feedback:
      "Para descobrir a data da feira deste ano, a informação atual publicada pela própria escola é mais adequada.",
    complementar:
      "A outra informação pode até ter sido correta em algum momento. Mas, sem data e sem saber de qual feira ela fala, não conseguimos usá-la com segurança.",
  },
};

/* ---------------- Duelo 2 — Morcegos ---------------- */

export const DUELO2 = {
  pergunta: "Morcegos são cegos?",
  fala: "Desta vez, você escolhe por onde começar.",
  opcoesInvestigacao: [
    { id: "quem", rotulo: "Quem publicou?" },
    { id: "quando", rotulo: "Quando?" },
    { id: "origem", rotulo: "De onde veio a informação?" },
    { id: "explicacao", rotulo: "Há alguma explicação?" },
    { id: "confirmam", rotulo: "Outra fonte confirma?" },
  ],
  achados: {
    quem: {
      A: "Não apresenta autor.",
      B: "Autora identificada como bióloga.",
    },
    quando: {
      A: "Não apresenta data.",
      B: "Apresenta data de publicação.",
    },
    origem: {
      A: "Não informa de onde veio a afirmação.",
      B: "Instituição identificada: Museu da Vida Animal.",
    },
    explicacao: {
      A: "Usa “todo mundo sabe” como justificativa.",
      B: "Apresenta explicação sobre como os morcegos se orientam.",
    },
    confirmam: {
      A: "Não apresenta referências para comparar.",
      B: "Apresenta referências.",
    },
  } as Record<string, { A: string; B: string }>,
  cartoesComparacao: [
    "Tem autora identificada.",
    "Não informa de onde veio a afirmação.",
    "Apresenta explicação.",
    "Usa “todo mundo sabe” como justificativa.",
    "Apresenta referências.",
    "Possui título chamativo.",
  ],
  perguntaDecisao: "Em qual fonte você confiaria mais para responder à pergunta?",
  justificativaModelo: "Eu confiaria mais na fonte ___ porque ___.",
  feedback:
    "Você não escolheu apenas pelo título. Comparou quem publicou, as explicações e as evidências.",
  feedbackFonteA:
    "Vamos conferir uma coisa antes de decidir: essa página explica como chegou a essa afirmação?",
};

/* ---------------- Tela — Não existe pista mágica ---------------- */

export const PISTA_MAGICA = {
  falas: [
    "Percebeu uma coisa importante?",
    "Uma página pode parecer convincente e ainda apresentar poucas pistas sobre de onde veio a informação.",
    "Mas ter autor e data também não garante sozinho que tudo esteja correto.",
  ],
  destaque: ["CONFIAR NÃO É ENCONTRAR UMA PISTA MÁGICA.", "É JUNTAR E COMPARAR EVIDÊNCIAS."],
};

/* ---------------- Duelo 3 — Eclipse ---------------- */

export const DUELO3 = {
  fala: "Agora vou deixar a investigação quase toda com você.",
  pergunta: "Será possível observar um eclipse da nossa cidade nesta sexta-feira?",
  comando: "INVESTIGUE ANTES DE ESCOLHER.",
  opcoesInvestigacao: [
    { id: "autoria", rotulo: "Autoria" },
    { id: "data", rotulo: "Data" },
    { id: "local", rotulo: "Local" },
    { id: "referencias", rotulo: "Referências" },
    { id: "contexto", rotulo: "Contexto" },
    { id: "adequacao", rotulo: "Adequação à pergunta" },
  ],
  achados: {
    autoria: { A: "Autor identificado.", B: "Equipe do Observatório da Cidade identificada." },
    data: { A: "Publicação de 2023.", B: "Publicação recente." },
    local: { A: "Fala de um eclipse observado em outra região.", B: "Cidade identificada." },
    referencias: {
      A: "Conteúdo de astronomia, sem calendário atualizado.",
      B: "Calendário astronômico atual.",
    },
    contexto: {
      A: "Aparência organizada e profissional.",
      B: "Aparência organizada e profissional.",
    },
    adequacao: {
      A: "Não trata desta sexta-feira nem desta cidade.",
      B: "Informa a visibilidade do fenômeno para esta cidade.",
    },
  } as Record<string, { A: string; B: string }>,
  decisao: {
    pergunta:
      "Qual fonte você usaria para responder à pergunta sobre esta sexta-feira e esta cidade?",
    perguntaPistas: "Agora escolha as pistas que justificam sua escolha.",
    feedback:
      "A primeira fonte pode ser uma boa fonte sobre astronomia, mas essa informação é antiga e fala de outro lugar.",
    complementar:
      "Para responder à pergunta sobre esta sexta-feira e esta cidade, precisamos de uma informação atual e adequada ao local.",
    destaque: [
      "Uma fonte não é simplesmente confiável ou não confiável para tudo.",
      "Precisamos perguntar se ela serve para responder à questão que estamos investigando.",
    ],
  },
};

/* ---------------- Monte seu caminho de investigação ---------------- */

export const CAMINHO = {
  titulo: "MONTE SEU CAMINHO DE INVESTIGAÇÃO",
  cartoes: [
    { id: "c1", texto: "Descobrir quem publicou.", investigativo: true },
    { id: "c2", texto: "Observar quando foi publicado.", investigativo: true },
    { id: "c3", texto: "Comparar com outra fonte.", investigativo: true },
    { id: "c4", texto: "Ver se a informação serve para aquela situação.", investigativo: true },
    { id: "d1", texto: "Escolher o primeiro resultado.", investigativo: false },
    { id: "d2", texto: "Escolher a página mais bonita.", investigativo: false },
    { id: "d3", texto: "Usar o título mais chamativo.", investigativo: false },
  ],
  feedback:
    "Esse é um bom caminho. Nem sempre precisamos seguir a mesma ordem, mas investigar antes de confiar faz diferença.",
};

/* ---------------- Metacognição ---------------- */

export const METACOGNICAO = {
  titulo: "COMO VOCÊ INVESTIGOU?",
  fala: "No primeiro duelo, investigamos juntos. No último, você tomou quase todas as decisões.",
  pergunta1: {
    enunciado: "O que você descobriu?",
    alternativas: [
      { id: "A", texto: "Nem toda informação encontrada na Internet deve ser aceita imediatamente." },
      { id: "B", texto: "Toda informação da Internet é falsa." },
      { id: "C", texto: "Basta descobrir o nome do site." },
    ],
    esperada: "A",
    feedbackEsperada:
      "Essa ideia resume bem o que investigamos: antes de confiar, vale procurar pistas.",
    feedbackRevisar:
      "Vamos comparar as duas fontes mais uma vez? Nos duelos, nenhuma informação foi simplesmente falsa nem bastou o nome do site: precisamos investigar as pistas.",
  },
  pergunta2: {
    enunciado: "O que mais ajudou você a decidir?",
    opcoes: [
      "descobrir quem publicou",
      "observar a data",
      "comparar fontes",
      "procurar evidências",
      "perceber se a informação servia para aquela situação",
    ],
  },
  pergunta3: {
    enunciado: "Em quais situações você pode usar esse jeito de investigar?",
    opcoes: [
      "pesquisando para um trabalho",
      "procurando uma curiosidade",
      "assistindo a um vídeo que traz uma informação",
      "pesquisando sobre um jogo",
      "procurando informações sobre algo que deseja conhecer",
    ],
  },
};

export const TRANSFERENCIA = {
  falas: [
    "Você se lembra de alguma informação que encontrou na Internet e ficou em dúvida se era verdadeira ou atual?",
    "Conte para um colega, professor ou alguém da sua família. Pensem juntos: que pistas poderiam procurar?",
  ],
};

export const ENCERRAMENTO = {
  falas: [
    "Hoje você não aprendeu a acreditar em tudo nem a desconfiar de tudo.",
    "Aprendeu algo mais importante: quando uma informação importa, vale a pena investigar antes de confiar nela.",
  ],
  selo: "INVESTIGADOR DE FONTES",
  complemento: "Perguntar • observar • comparar • decidir",
};

export const TELA_PROBLEMA = {
  falas: [
    "Estou preparando o Jornal das Descobertas da turma e encontrei um problema.",
    "Encontrei duas fontes falando sobre a mesma coisa. Mas elas não apresentam exatamente a mesma informação.",
    "Como podemos descobrir qual delas ajuda melhor a responder nossa pergunta?",
  ],
};

export const FALA_LUPA =
  "Nenhuma pista resolve tudo sozinha. O segredo é observar várias e depois comparar.";
