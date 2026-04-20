import {
  GraduationCap,
  TrendingUp,
  PieChart,
  Shield,
  Briefcase,
  Target,
  FileText,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDetail {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  tagline: string;
  heroIntro: string;
  forWho: string[];
  topics: { title: string; desc: string }[];
  deliverables: string[];
  methodology: { step: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
}

export const services: ServiceDetail[] = [
  {
    slug: "educacao-financeira",
    icon: GraduationCap,
    title: "Educação Financeira",
    shortDesc:
      "Trilhas estruturadas, do básico ao avançado, para construir uma base sólida de conhecimento.",
    tagline: "Aprender a investir começa por aprender a pensar.",
    heroIntro:
      "Uma jornada formativa para investidores que querem entender o porquê das decisões — não apenas seguir recomendações. Trilhas progressivas, exemplos práticos e linguagem direta.",
    forWho: [
      "Quem está começando e quer evitar erros caros",
      "Investidores intermediários que sentem lacunas conceituais",
      "Profissionais que desejam aprofundar a leitura crítica do mercado",
    ],
    topics: [
      {
        title: "Fundamentos do mercado financeiro",
        desc: "Como o sistema funciona, quem são os agentes e o papel da bolsa, do tesouro e dos bancos.",
      },
      {
        title: "Linguagem do investidor",
        desc: "Glossário ativo de termos essenciais — de liquidez a duration, de spread a yield.",
      },
      {
        title: "Cálculo e leitura de indicadores",
        desc: "Inflação, juros real, CDI, IPCA, Selic e como cada um impacta seus investimentos.",
      },
      {
        title: "Mentalidade de longo prazo",
        desc: "Vieses cognitivos, disciplina, paciência e a matemática dos juros compostos.",
      },
    ],
    deliverables: [
      "Trilha de e-books temáticos",
      "Aulas em vídeo curadas",
      "Planilhas de acompanhamento",
      "Newsletter Aurea semanal",
    ],
    methodology: [
      { step: "01", title: "Diagnóstico", desc: "Entendemos seu nível atual e objetivos." },
      { step: "02", title: "Trilha personalizada", desc: "Roteiro progressivo sob medida." },
      { step: "03", title: "Acompanhamento", desc: "Materiais, comunidade e revisões periódicas." },
    ],
    faq: [
      {
        q: "Preciso de conhecimento prévio?",
        a: "Não. As trilhas começam do zero e avançam de forma gradual.",
      },
      {
        q: "Vocês recomendam ativos específicos?",
        a: "Nosso foco é educacional. Não fazemos recomendação personalizada de ativos.",
      },
    ],
  },
  {
    slug: "analise-de-mercado",
    icon: TrendingUp,
    title: "Análise de Mercado",
    shortDesc:
      "Leitura sistemática de cenários macroeconômicos e setoriais com base em dados confiáveis.",
    tagline: "Decisões guiadas por dados e leitura de cenários.",
    heroIntro:
      "Relatórios e análises que conectam dados macroeconômicos, política monetária e dinâmica setorial — para que você compreenda o contexto antes de qualquer decisão.",
    forWho: [
      "Investidores que querem ir além do noticiário",
      "Profissionais de finanças e economia",
      "Quem busca entender o impacto real de juros e câmbio",
    ],
    topics: [
      {
        title: "Relatórios macroeconômicos",
        desc: "Síntese mensal de inflação, atividade, contas públicas e cenário externo.",
      },
      {
        title: "Análise setorial aprofundada",
        desc: "Estudos verticais sobre energia, financeiro, varejo, commodities e tecnologia.",
      },
      {
        title: "Acompanhamento de juros e câmbio",
        desc: "Curva de juros, decisões do Copom e dinâmica do real frente a moedas fortes.",
      },
      {
        title: "Cenários globais",
        desc: "Política monetária do Fed, BCE e impactos sobre mercados emergentes.",
      },
    ],
    deliverables: [
      "Relatório macro mensal",
      "Cartas setoriais",
      "Alertas de eventos críticos",
      "Glossário de indicadores",
    ],
    methodology: [
      { step: "01", title: "Coleta", desc: "Dados de fontes oficiais e instituições reconhecidas." },
      { step: "02", title: "Análise", desc: "Cruzamento de variáveis e modelagem de cenários." },
      { step: "03", title: "Síntese", desc: "Comunicação clara, sem jargão desnecessário." },
    ],
    faq: [
      {
        q: "Os relatórios são pagos?",
        a: "Há conteúdos gratuitos e materiais aprofundados via assinatura premium.",
      },
      {
        q: "Com que frequência são publicados?",
        a: "Macro mensal, setorial trimestral, alertas conforme eventos relevantes.",
      },
    ],
  },
  {
    slug: "estrategia-de-carteira",
    icon: PieChart,
    title: "Estratégia de Carteira",
    shortDesc:
      "Construção, diversificação e rebalanceamento de portfólios em diferentes perfis.",
    tagline: "A carteira certa começa por entender quem você é.",
    heroIntro:
      "Conteúdo aprofundado sobre alocação de ativos, diversificação verdadeira e disciplina de rebalanceamento — princípios que separam o investidor amador do estratégico.",
    forWho: [
      "Investidores construindo seu primeiro portfólio estruturado",
      "Quem busca rebalancear de forma metódica",
      "Quem quer reduzir risco sem abrir mão de retorno",
    ],
    topics: [
      {
        title: "Alocação por classes de ativos",
        desc: "Renda fixa, ações, fundos imobiliários, multimercados e ativos no exterior.",
      },
      {
        title: "Diversificação real",
        desc: "Por que ter 30 ações do mesmo setor não é diversificar.",
      },
      {
        title: "Rebalanceamento periódico",
        desc: "Quando, como e por que ajustar a carteira ao longo do tempo.",
      },
      {
        title: "Gestão de risco",
        desc: "Volatilidade, drawdown, correlação e proteção de capital.",
      },
    ],
    deliverables: [
      "Modelos de carteira por perfil",
      "Planilha de rebalanceamento",
      "Checklist trimestral",
      "Estudos de caso reais",
    ],
    methodology: [
      { step: "01", title: "Perfil", desc: "Tolerância a risco, horizonte e objetivos." },
      { step: "02", title: "Estrutura", desc: "Definição de classes e pesos estratégicos." },
      { step: "03", title: "Disciplina", desc: "Rebalanceamento periódico, sem emoção." },
    ],
    faq: [
      {
        q: "Vocês montam minha carteira?",
        a: "Não fazemos gestão. Ensinamos princípios para você decidir com critério.",
      },
      {
        q: "Existe uma carteira ideal?",
        a: "Não. Existe a carteira coerente com seu perfil, objetivos e horizonte.",
      },
    ],
  },
  {
    slug: "renda-fixa-e-reserva",
    icon: Shield,
    title: "Renda Fixa & Reserva",
    shortDesc:
      "Como construir uma reserva sólida e usar a renda fixa de forma estratégica.",
    tagline: "Antes de buscar retorno, proteja seu capital.",
    heroIntro:
      "A base de toda estratégia patrimonial sólida. Aqui você entende cada produto de renda fixa, sua tributação, liquidez e o papel real da reserva de emergência.",
    forWho: [
      "Quem ainda não tem reserva de emergência estruturada",
      "Investidores que confundem CDB, LCI, LCA e Tesouro",
      "Quem quer aproveitar ciclos de juros altos",
    ],
    topics: [
      {
        title: "Tesouro Direto na prática",
        desc: "Selic, IPCA+ e Prefixado — quando faz sentido cada um.",
      },
      {
        title: "CDBs, LCIs, LCAs e debêntures",
        desc: "Comparativo de risco, liquidez, tributação e garantia FGC.",
      },
      {
        title: "Reserva de emergência",
        desc: "Quanto, onde e por que ter reserva intocável de curto prazo.",
      },
      {
        title: "Curva de juros",
        desc: "Leitura da curva DI e o que ela diz sobre o futuro.",
      },
    ],
    deliverables: [
      "Guia completo de renda fixa",
      "Comparador de produtos",
      "Calculadora de rentabilidade líquida",
      "Mapa da curva de juros",
    ],
    methodology: [
      { step: "01", title: "Reserva", desc: "Construção da reserva de emergência primeiro." },
      { step: "02", title: "Estratégia", desc: "Alocação tática conforme ciclo de juros." },
      { step: "03", title: "Manutenção", desc: "Reaplicação e otimização tributária." },
    ],
    faq: [
      {
        q: "Quanto deixar na reserva?",
        a: "Geralmente entre 6 e 12 meses de despesas essenciais — depende do seu contexto.",
      },
      {
        q: "Renda fixa rende pouco?",
        a: "Em ciclos de juros altos, pode ser extremamente competitiva — e sempre cumpre papel estrutural.",
      },
    ],
  },
  {
    slug: "renda-variavel",
    icon: Briefcase,
    title: "Renda Variável",
    shortDesc:
      "Análise fundamentalista, dividendos e princípios para investir em ações com método.",
    tagline: "Investir em ações é comprar pedaços de empresas.",
    heroIntro:
      "Ensino aplicado de análise fundamentalista, valuation e estratégia de dividendos — para quem quer investir em ações com critério, não com palpite.",
    forWho: [
      "Investidores começando em ações",
      "Quem busca renda passiva via dividendos",
      "Quem quer aprender valuation de forma prática",
    ],
    topics: [
      {
        title: "Análise fundamentalista",
        desc: "Demonstrativos, margens, endividamento e qualidade do management.",
      },
      {
        title: "Estratégia de dividendos",
        desc: "Como identificar boas pagadoras e construir renda recorrente.",
      },
      {
        title: "Múltiplos e valuation",
        desc: "P/L, P/VP, EV/EBITDA, DCF — quando e como aplicar cada um.",
      },
      {
        title: "Setores defensivos vs cíclicos",
        desc: "Como cada setor se comporta em diferentes momentos do ciclo econômico.",
      },
    ],
    deliverables: [
      "Manual de análise fundamentalista",
      "Planilha de valuation",
      "Carteira didática de dividendos",
      "Estudos de caso de empresas listadas",
    ],
    methodology: [
      { step: "01", title: "Tese", desc: "Por que essa empresa, nesse preço, agora?" },
      { step: "02", title: "Análise", desc: "Números, governança e vantagem competitiva." },
      { step: "03", title: "Acompanhamento", desc: "Revisão periódica de tese e resultados." },
    ],
    faq: [
      {
        q: "Vale a pena começar com pouco?",
        a: "Sim. O mais importante é começar com método e disciplina — não com volume.",
      },
      {
        q: "Day trade faz parte?",
        a: "Não. Nosso método é fundamentalista e de longo prazo.",
      },
    ],
  },
  {
    slug: "planejamento-patrimonial",
    icon: Target,
    title: "Planejamento Patrimonial",
    shortDesc:
      "Visão de longo prazo para construção e preservação de patrimônio ao longo das décadas.",
    tagline: "Patrimônio se constrói em décadas, não em meses.",
    heroIntro:
      "Conteúdo estratégico para quem pensa o patrimônio como projeto de vida — incluindo metas, independência financeira, sucessão e proteção.",
    forWho: [
      "Famílias pensando em sucessão",
      "Investidores rumo à independência financeira",
      "Quem precisa estruturar metas de longo prazo",
    ],
    topics: [
      {
        title: "Metas financeiras de longo prazo",
        desc: "Como traduzir sonhos em números, prazos e estratégias.",
      },
      {
        title: "Independência financeira",
        desc: "Cálculo de renda passiva necessária e taxa segura de retirada.",
      },
      {
        title: "Planejamento sucessório (visão geral)",
        desc: "Holdings, doações, testamento e fluidez na transmissão patrimonial.",
      },
      {
        title: "Proteção patrimonial",
        desc: "Seguros, blindagem responsável e diversificação geográfica.",
      },
    ],
    deliverables: [
      "Plano patrimonial em camadas",
      "Calculadora de independência financeira",
      "Guia de sucessão patrimonial",
      "Checklist de proteção",
    ],
    methodology: [
      { step: "01", title: "Visão", desc: "Onde você quer chegar em 10, 20, 30 anos." },
      { step: "02", title: "Plano", desc: "Estrutura financeira e jurídica adequada." },
      { step: "03", title: "Execução", desc: "Disciplina, revisão e ajuste contínuo." },
    ],
    faq: [
      {
        q: "Vocês fazem planejamento individual?",
        a: "Nosso conteúdo é educacional. Para casos complexos, indicamos profissionais parceiros.",
      },
      {
        q: "Preciso de muito patrimônio para começar?",
        a: "Não. Planejamento é exatamente o que te leva ao patrimônio — e não o contrário.",
      },
    ],
  },
  {
    slug: "conteudo-premium",
    icon: FileText,
    title: "Conteúdo Premium",
    shortDesc:
      "Newsletter, e-books e relatórios exclusivos para aprofundar o conhecimento dos leitores.",
    tagline: "Curadoria de alto nível, sem ruído.",
    heroIntro:
      "Material aprofundado, com pesquisa, dados próprios e linguagem editorial. Para o leitor que valoriza profundidade acima de velocidade.",
    forWho: [
      "Leitores exigentes que buscam profundidade",
      "Profissionais que precisam de fontes confiáveis",
      "Investidores que querem ir além do conteúdo gratuito",
    ],
    topics: [
      {
        title: "Newsletter Aurea semanal",
        desc: "Síntese editorial dos eventos mais relevantes da semana.",
      },
      {
        title: "E-books temáticos",
        desc: "Livros digitais aprofundados sobre cada vertical financeira.",
      },
      {
        title: "Relatórios estratégicos",
        desc: "Estudos exclusivos sobre setores, classes de ativos e cenários.",
      },
      {
        title: "Curadoria de leituras",
        desc: "Seleção comentada dos melhores materiais nacionais e internacionais.",
      },
    ],
    deliverables: [
      "Newsletter semanal",
      "Biblioteca de e-books",
      "Relatórios trimestrais",
      "Lista de leituras recomendadas",
    ],
    methodology: [
      { step: "01", title: "Pesquisa", desc: "Imersão em dados, fontes e literatura." },
      { step: "02", title: "Edição", desc: "Texto claro, denso e sem jargão." },
      { step: "03", title: "Publicação", desc: "Distribuição contínua aos assinantes." },
    ],
    faq: [
      {
        q: "Como assinar?",
        o: "",
        a: "Em breve abriremos novas vagas — preencha o formulário para entrar na lista.",
      },
      {
        q: "Posso testar antes?",
        a: "Sim, há materiais gratuitos para você conhecer nosso padrão editorial.",
      },
    ],
  },
  {
    slug: "comunidade-e-mentoria",
    icon: Users,
    title: "Comunidade & Mentoria",
    shortDesc:
      "Espaço de troca entre investidores que buscam aprender com método, paciência e disciplina.",
    tagline: "Aprender em conjunto acelera — e protege.",
    heroIntro:
      "Um ambiente curado para troca entre investidores sérios. Encontros, lives, Q&A com convidados e materiais complementares para quem quer evoluir cercado de quem pensa parecido.",
    forWho: [
      "Investidores que buscam comunidade séria",
      "Quem quer acesso a especialistas convidados",
      "Quem valoriza aprendizado contínuo",
    ],
    topics: [
      {
        title: "Comunidade de leitores",
        desc: "Fórum moderado, com pautas semanais e discussões de qualidade.",
      },
      {
        title: "Encontros e lives",
        desc: "Eventos mensais com aprofundamento em temas específicos.",
      },
      {
        title: "Q&A com convidados",
        desc: "Sessões com gestores, economistas e analistas reconhecidos.",
      },
      {
        title: "Materiais complementares",
        desc: "Conteúdo extra exclusivo para membros da comunidade.",
      },
    ],
    deliverables: [
      "Acesso à comunidade moderada",
      "Calendário mensal de eventos",
      "Gravações de todas as sessões",
      "Biblioteca de materiais exclusivos",
    ],
    methodology: [
      { step: "01", title: "Adesão", desc: "Inscrição e onboarding inicial." },
      { step: "02", title: "Participação", desc: "Eventos, fóruns e materiais." },
      { step: "03", title: "Evolução", desc: "Acompanhamento contínuo da jornada." },
    ],
    faq: [
      {
        q: "Existe mensalidade?",
        a: "Sim. Os valores e formatos são apresentados no momento da abertura de novas vagas.",
      },
      {
        q: "Há limite de vagas?",
        a: "Sim, para preservar a qualidade da comunidade e da curadoria.",
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
