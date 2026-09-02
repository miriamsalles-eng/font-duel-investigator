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

/**
 * Identidade cromática de cada pista do Kit. A MESMA cor acompanha o critério
 * na Lupa, nos chips do Kit e durante os duelos (memória visual).
 */
export const CORES_CRITERIO: Record<
  CriterioId,
  { card: string; titulo: string; chip: string; chipVazio: string; icone: string }
> = {
  quem: {
    card: "border-azul/60 bg-azul-claro/35",
    titulo: "text-azul-escuro",
    chip: "border-azul bg-azul-claro text-azul-escuro",
    chipVazio: "border-dashed border-azul/40 text-azul-escuro/70",
    icone: "/assets/interface/icones_investigacao/icone_perfil_autoria.png",
  },
  quando: {
    card: "border-amarelo bg-amarelo-claro/60",
    titulo: "text-amarelo-escuro",
    chip: "border-amarelo bg-amarelo-claro text-amarelo-escuro",
    chipVazio: "border-dashed border-amarelo/60 text-amarelo-escuro/70",
    icone: "/assets/interface/icones_investigacao/icone_calendario.png",
  },
  origem: {
    card: "border-teal/60 bg-teal-claro/40",
    titulo: "text-teal-escuro",
    chip: "border-teal bg-teal-claro text-teal-escuro",
    chipVazio: "border-dashed border-teal/40 text-teal-escuro/70",
    icone: "/assets/interface/icones_investigacao/icone_globo_origem.png",
  },
  confirmam: {
    card: "border-roxo/60 bg-roxo-claro/50",
    titulo: "text-roxo-escuro",
    chip: "border-roxo bg-roxo-claro text-roxo-escuro",
    chipVazio: "border-dashed border-roxo/40 text-roxo-escuro/70",
    icone: "/assets/interface/icones_investigacao/icone_balanca_comparacao.png",
  },
  situacao: {
    card: "border-coral/60 bg-coral-claro/45",
    titulo: "text-coral-escuro",
    chip: "border-coral bg-coral-claro text-coral-escuro",
    chipVazio: "border-dashed border-coral/40 text-coral-escuro/70",
    icone: "/assets/interface/icones_investigacao/icone_mapa_localizacao.png",
  },
};

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
  intro: "/assets/fundos/bg_intro_investigacao.png",
  duelo1: "/assets/fundos/bg_duelo1_feira_e_pesquisa_escolar.png",
  duelo2: "/assets/fundos/bg_duelo2_animais_e_curiosidades.png",
  duelo3: "/assets/fundos/bg_duelo3_astronomia_e_eclipse.png",
  final: "/assets/fundos/bg_final_conclusao_e_conquistas.png",
} as const;

export const DECORATIVOS = {
  fitaTeal: "/assets/interface/elementos_estacionaria/fita_teal_listrada.png",
  fitaAzulPoa: "/assets/interface/elementos_estacionaria/fita_azul_poa.png",
  clipeAzul: "/assets/interface/elementos_estacionaria/clipe_azul.png",
  clipeAmarelo: "/assets/interface/elementos_estacionaria/clipe_amarelo.png",
  clipeTeal: "/assets/interface/elementos_estacionaria/clipe_teal.png",
  pontinhoAmarelo: "/assets/interface/elementos_estacionaria/pontinho_amarelo.png",
  binderClipAzul: "/assets/interface/elementos_estacionaria/binder_clip_azul.png",
  estrelaGrande: "/assets/interface/elementos_estacionaria/estrela_dourada_grande.png",
  estrelaPequena: "/assets/interface/elementos_estacionaria/estrela_dourada_pequena.png",
  postitDuplo: "/assets/interface/etiquetas_molduras/postit_duplo_percevejo.png",
  postitAzul: "/assets/interface/etiquetas_molduras/postit_azul_fita_amarela.png",
  tagCordao: "/assets/interface/etiquetas_molduras/tag_cordao.png",
  faixaRasgadaTeal: "/assets/interface/etiquetas_molduras/faixa_rasgada_fita_teal.png",
  seloRedondo: "/assets/interface/etiquetas_molduras/selo_redondo_vazio.png",
  iconeCalendario: "/assets/interface/icones_investigacao/icone_calendario.png",
  iconePerfil: "/assets/interface/icones_investigacao/icone_perfil_autoria.png",
  iconeDocumentoCheck: "/assets/interface/icones_investigacao/icone_documento_check.png",
  iconeCartasPergunta: "/assets/interface/icones_investigacao/icone_cartas_pergunta.png",
  iconePastaArquivos: "/assets/interface/icones_investigacao/icone_pasta_arquivos.png",
  iconeMapa: "/assets/interface/icones_investigacao/icone_mapa_localizacao.png",
  iconeGlobo: "/assets/interface/icones_investigacao/icone_globo_origem.png",
  iconeSeloEstrela: "/assets/interface/icones_investigacao/icone_selo_estrela.png",
} as const;


/* ---------------- Tela 3 — O que é uma fonte? ---------------- */

export const LIGAR_COLUNAS = {
  definicao: "Fonte é o lugar, pessoa ou instituição de onde uma informação vem.",
  comando: "Ligue cada informação à fonte de onde ela pode vir.",
  feedbackErro:
    "Algumas ligações ainda não combinam com a origem mais adequada. Observe novamente e revise.",
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

export type OpcaoJustificativa = { id: string; texto: string; correta: boolean };

export const DUELO1 = {
  situacao:
    "Precisamos confirmar as informações sobre a Feira de Ciências da escola. Qual fonte pode nos ajudar melhor?",
  fala: "Quero contar quando acontecerá a Feira de Ciências da escola. Encontrei duas informações diferentes.",
  comando:
    "Leia as duas fontes com atenção. Vamos procurar juntos duas pistas dentro dos cards.",
  guiadas: [
    {
      id: "quem",
      criterio: "quem" as CriterioId,
      enunciado:
        "Procure quem é responsável pelo que foi publicado. Em qual card você encontrou?",
      esperada: "B",
    },
    {
      id: "quando",
      criterio: "quando" as CriterioId,
      enunciado: "Agora procure quando a informação foi publicada. Em qual card ela aparece?",
      esperada: "B",
    },
  ],

  feedbackErroGuiada: "Procure essa informação dentro dos dois cards e tente novamente.",
  feedbackAparencia:
    "A aparência pode chamar atenção, mas precisamos de pistas sobre autoria, data e adequação.",
  decisao: {
    pergunta: "Qual fonte você usaria para informar a data da Feira de Ciências deste ano?",
    perguntaPista: "Qual pista ajuda a justificar sua escolha?",
    opcoes: [
      {
        id: "autoria",
        texto: "A escola está identificada como responsável pela publicação.",
        correta: true,
      },
      { id: "data", texto: "A informação apresenta data atual.", correta: true },
      { id: "imagem", texto: "Tem uma imagem bonita.", correta: false },
      { id: "letras", texto: "Tem letras maiores.", correta: false },
      { id: "cores", texto: "Tem mais cores.", correta: false },
    ] as OpcaoJustificativa[],
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
  comando: "Leia as duas fontes e escolha pistas para comparar.",
  ferramentas: [
    { id: "quem", rotulo: "Quem publicou?", pergunta: "Procure nas duas fontes: quem escreveu ou publicou?" },
    { id: "quando", rotulo: "Quando?", pergunta: "Procure quando cada informação foi publicada." },
    { id: "origem", rotulo: "De onde veio a informação?", pergunta: "A página mostra de onde veio a afirmação?" },
    { id: "explicacao", rotulo: "Há alguma explicação?", pergunta: "Há uma explicação ou apenas uma afirmação?" },
    { id: "confirmam", rotulo: "Outra fonte confirma?", pergunta: "Há referências que possam ser conferidas?" },
  ],
  decisao: {
    pergunta:
      "Em qual fonte você confiaria mais para responder à pergunta “Morcegos são cegos?”",
    opcoesFonte: [
      { id: "A", texto: "Fonte A — Curiosidades Superincríveis" },
      { id: "B", texto: "Fonte B — Museu da Vida Animal" },
    ],
    perguntaJustificativa: "Escolha pelo menos duas pistas que justificam sua decisão.",
    opcoes: [
      { id: "autor", texto: "Identifica quem produziu a informação.", correta: true },
      { id: "data", texto: "Informa quando o conteúdo foi publicado.", correta: true },
      { id: "explicacao", texto: "Apresenta uma explicação para a informação.", correta: true },
      { id: "referencias", texto: "Apresenta referências que podem ser conferidas.", correta: true },
      { id: "titulo", texto: "Tem um título chamativo.", correta: false },
      { id: "aparencia", texto: "Parece mais bonita.", correta: false },
    ] as OpcaoJustificativa[],
  },
  feedbackFonteA:
    "Observe novamente: essa fonte explica como chegou à afirmação e permite conferir a informação?",
  feedbackAparencia:
    "Uma página pode chamar atenção pela aparência, mas isso não é evidência de confiabilidade. Procure pistas no conteúdo.",
  feedbackPoucas:
    "Escolha pelo menos duas pistas do próprio conteúdo das fontes para justificar sua decisão.",
  feedback:
    "Você não escolheu apenas pelo título. Comparou quem publicou, as explicações e as evidências.",
};

/* ---------------- Não existe pista mágica (integrado ao Duelo 2) ---------------- */

export const PISTA_MAGICA = {
  falas: [
    "Uma página pode parecer convincente e ainda apresentar poucas pistas sobre a origem da informação.",
    "Ter autor ou data também não garante sozinho que tudo esteja correto.",
  ],
  destaque: ["CONFIAR NÃO É ENCONTRAR UMA PISTA MÁGICA.", "É JUNTAR E COMPARAR EVIDÊNCIAS."],
};

/* ---------------- Duelo 3 — Eclipse ---------------- */

export const DUELO3 = {
  fala: "Agora vou deixar a investigação quase toda com você.",
  pergunta: "Será possível observar um eclipse da nossa cidade nesta sexta-feira?",
  comando: "Agora você escolhe quais pistas investigar antes de decidir.",
  ferramentas: [
    { id: "autoria", rotulo: "Autoria", pergunta: "Quem publicou cada informação?" },
    { id: "data", rotulo: "Data", pergunta: "Quando cada informação foi publicada?" },
    { id: "local", rotulo: "Local", pergunta: "De que lugar cada fonte está falando?" },
    { id: "referencias", rotulo: "Referências", pergunta: "Que elementos permitem conferir a informação?" },
    { id: "contexto", rotulo: "Contexto", pergunta: "Sobre que situação cada texto está falando?" },
    {
      id: "adequacao",
      rotulo: "Adequação à pergunta",
      pergunta: "Qual deles responde especificamente sobre esta sexta-feira e esta cidade?",
    },
  ],
  criteriosChave: ["data", "local", "adequacao"],
  avisoInvestigacao:
    "Investigue pelo menos duas pistas ligadas à data, ao local ou à adequação da informação.",
  decisao: {
    pergunta:
      "Qual fonte você usaria para responder à pergunta sobre esta sexta-feira e esta cidade?",
    opcoesFonte: [
      { id: "A", texto: "Fonte A — Ciência e Céu" },
      { id: "B", texto: "Fonte B — Observatório da Cidade" },
    ],
    perguntaPistas: "Escolha as pistas que justificam sua decisão.",
    opcoes: [
      { id: "data-atual", texto: "Foi publicada nesta semana.", correta: true },
      { id: "local", texto: "Fala especificamente da nossa cidade.", correta: true },
      { id: "adequacao", texto: "Informa a visibilidade do eclipse para esta cidade.", correta: true },
      { id: "calendario", texto: "Informa o horário previsto para a observação nesta sexta-feira.", correta: true },
      { id: "aparencia", texto: "Tem aparência profissional.", correta: false },
      { id: "antiga", texto: "Foi publicada em 2023.", correta: false },
      { id: "outra-regiao", texto: "Conta sobre um eclipse observado em outra região.", correta: false },
    ] as OpcaoJustificativa[],
    feedbackErro:
      "Para responder sobre esta sexta-feira e esta cidade, procure uma informação atual e adequada ao lugar.",
    feedback:
      "A primeira fonte pode ser útil para conhecer astronomia, mas é antiga e fala de outro lugar.",
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
