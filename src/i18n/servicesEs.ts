import {
  GraduationCap,
  TrendingUp,
  PieChart,
  Shield,
  Briefcase,
  Target,
  FileText,
  Users,
} from "lucide-react";
import type { ServiceDetail } from "@/data/services";

export const servicesEs: ServiceDetail[] = [
  {
    slug: "educacion-financiera",
    icon: GraduationCap,
    title: "Educación Financiera",
    shortDesc:
      "Trayectos estructurados, de lo básico a lo avanzado, para construir una base sólida en el contexto paraguayo.",
    tagline: "Aprender a invertir empieza por aprender a pensar.",
    heroIntro:
      "Un recorrido formativo para inversores paraguayos que quieren entender el porqué de las decisiones — no solo seguir recomendaciones. Trayectos progresivos, ejemplos en guaraníes y dólares, lenguaje directo.",
    forWho: [
      "Quien empieza y quiere evitar errores costosos",
      "Inversores intermedios con vacíos conceptuales sobre el mercado paraguayo",
      "Profesionales que quieren profundizar la lectura crítica de la economía local",
    ],
    topics: [
      {
        title: "Fundamentos del sistema financiero paraguayo",
        desc: "Cómo funcionan el BCP, la BVA, los bancos locales y la CONAFI — y el rol de cada agente.",
      },
      {
        title: "Lenguaje del inversor",
        desc: "Glosario activo: liquidez, duration, spread, yield, TPM, IPC y términos esenciales del mercado.",
      },
      {
        title: "Cálculo y lectura de indicadores",
        desc: "Inflación PY, IPC, tipo de cambio guaraní/dólar, TPM del BCP y cómo impactan tus inversiones.",
      },
      {
        title: "Mentalidad de largo plazo",
        desc: "Sesgos cognitivos, disciplina, paciencia y la matemática del interés compuesto.",
      },
    ],
    deliverables: [
      "Trayecto de e-books temáticos",
      "Clases en video curadas",
      "Planillas de seguimiento",
      "Newsletter Aurea semanal",
    ],
    methodology: [
      { step: "01", title: "Diagnóstico", desc: "Entendemos tu nivel actual y objetivos." },
      { step: "02", title: "Trayecto a medida", desc: "Plan progresivo según tu perfil." },
      { step: "03", title: "Acompañamiento", desc: "Materiales, comunidad y revisiones periódicas." },
    ],
    faq: [
      {
        q: "¿Necesito conocimientos previos?",
        a: "No. Los trayectos empiezan desde cero y avanzan de forma gradual.",
      },
      {
        q: "¿Recomiendan activos específicos?",
        a: "Nuestro foco es educativo. No hacemos recomendaciones personalizadas.",
      },
    ],
  },
  {
    slug: "analisis-de-mercado",
    icon: TrendingUp,
    title: "Análisis de Mercado",
    shortDesc:
      "Lectura sistemática de la macroeconomía paraguaya y escenarios globales con datos confiables.",
    tagline: "Decisiones guiadas por datos y lectura de escenarios.",
    heroIntro:
      "Reportes y análisis que conectan macro paraguaya, política monetaria del BCP, dinámica sectorial y contexto regional — para entender el panorama antes de cualquier decisión.",
    forWho: [
      "Inversores que quieren ir más allá del noticiero",
      "Profesionales de finanzas y economía en Paraguay",
      "Quienes buscan entender el impacto real de TPM y dólar en sus carteras",
    ],
    topics: [
      {
        title: "Reportes macroeconómicos PY",
        desc: "Síntesis mensual de IPC, actividad, cuentas públicas, exportaciones de soja y carne, y contexto externo.",
      },
      {
        title: "Análisis sectorial",
        desc: "Estudios verticales sobre agro, energía (Itaipú/Yacyretá), banca, real estate y tecnología.",
      },
      {
        title: "TPM y tipo de cambio",
        desc: "Decisiones del BCP, curva de tasas en guaraníes y dinámica del dólar frente al guaraní.",
      },
      {
        title: "Escenarios globales",
        desc: "Política monetaria de la Fed, BCE y BCRA — y su impacto sobre Paraguay.",
      },
    ],
    deliverables: [
      "Reporte macro mensual",
      "Cartas sectoriales",
      "Alertas de eventos críticos",
      "Glosario de indicadores PY",
    ],
    methodology: [
      { step: "01", title: "Recolección", desc: "Datos de BCP, INE, MEF y fuentes reconocidas." },
      { step: "02", title: "Análisis", desc: "Cruce de variables y modelado de escenarios." },
      { step: "03", title: "Síntesis", desc: "Comunicación clara, sin jerga innecesaria." },
    ],
    faq: [
      {
        q: "¿Los reportes son pagos?",
        a: "Hay contenidos gratuitos y materiales en profundidad por suscripción premium.",
      },
      {
        q: "¿Con qué frecuencia se publican?",
        a: "Macro mensual, sectorial trimestral, alertas según eventos relevantes.",
      },
    ],
  },
  {
    slug: "estrategia-de-cartera",
    icon: PieChart,
    title: "Estrategia de Cartera",
    shortDesc:
      "Construcción, diversificación y rebalanceo de carteras para distintos perfiles paraguayos.",
    tagline: "La cartera correcta empieza por entender quién sos.",
    heroIntro:
      "Contenido en profundidad sobre asignación de activos, diversificación real entre guaraníes y dólares, y disciplina de rebalanceo — principios que separan al inversor amateur del estratégico.",
    forWho: [
      "Inversores armando su primera cartera estructurada",
      "Quienes buscan rebalancear de forma metódica",
      "Quienes quieren reducir riesgo sin perder retorno",
    ],
    topics: [
      {
        title: "Asignación por clases de activos",
        desc: "CDAs, bonos en guaraníes y dólares, acciones BVA, fondos mutuos, real estate y activos en el exterior.",
      },
      {
        title: "Diversificación real",
        desc: "Por qué tener 5 CDAs del mismo banco no es diversificar — y cómo equilibrar moneda y plazo.",
      },
      {
        title: "Rebalanceo periódico",
        desc: "Cuándo, cómo y por qué ajustar la cartera a lo largo del tiempo.",
      },
      {
        title: "Gestión de riesgo",
        desc: "Volatilidad, drawdown, riesgo cambiario guaraní/dólar y protección de capital.",
      },
    ],
    deliverables: [
      "Modelos de cartera por perfil",
      "Planilla de rebalanceo",
      "Checklist trimestral",
      "Casos de estudio reales del mercado paraguayo",
    ],
    methodology: [
      { step: "01", title: "Perfil", desc: "Tolerancia al riesgo, horizonte y objetivos." },
      { step: "02", title: "Estructura", desc: "Definición de clases, monedas y pesos estratégicos." },
      { step: "03", title: "Disciplina", desc: "Rebalanceo periódico, sin emoción." },
    ],
    faq: [
      {
        q: "¿Arman mi cartera?",
        a: "No hacemos gestión. Enseñamos principios para que decidas con criterio.",
      },
      {
        q: "¿Existe una cartera ideal?",
        a: "No. Existe la cartera coherente con tu perfil, objetivos y horizonte.",
      },
    ],
  },
  {
    slug: "renta-fija-y-reserva",
    icon: Shield,
    title: "Renta Fija & Reserva",
    shortDesc:
      "Cómo construir una reserva sólida y usar la renta fija paraguaya de forma estratégica.",
    tagline: "Antes de buscar retorno, protegé tu capital.",
    heroIntro:
      "La base de toda estrategia patrimonial sólida. Acá entendés cada producto de renta fija paraguaya — CDAs, bonos del Tesoro, bonos corporativos — su tributación, liquidez y el rol real de la reserva de emergencia.",
    forWho: [
      "Quien aún no tiene reserva de emergencia estructurada",
      "Inversores que confunden CDA, bonos del Tesoro PY y bonos corporativos",
      "Quienes quieren aprovechar ciclos de tasas altas en guaraníes",
    ],
    topics: [
      {
        title: "Bonos del Tesoro Paraguayo",
        desc: "Bonos soberanos en guaraníes y dólares — cuándo y por qué tiene sentido cada uno.",
      },
      {
        title: "CDAs y bonos corporativos",
        desc: "Comparativo de riesgo, liquidez, tributación y garantía bancaria en el sistema paraguayo.",
      },
      {
        title: "Reserva de emergencia",
        desc: "Cuánto, dónde y por qué tener reserva intocable de corto plazo en guaraníes y dólares.",
      },
      {
        title: "Curva de tasas PY",
        desc: "Lectura de la curva de TPM y bonos soberanos, y qué dice sobre el futuro económico.",
      },
    ],
    deliverables: [
      "Guía completa de renta fija paraguaya",
      "Comparador de productos",
      "Calculadora de rentabilidad neta",
      "Mapa de la curva de tasas",
    ],
    methodology: [
      { step: "01", title: "Reserva", desc: "Construcción de la reserva de emergencia primero." },
      { step: "02", title: "Estrategia", desc: "Asignación táctica según ciclo de TPM." },
      { step: "03", title: "Mantenimiento", desc: "Reinversión y optimización tributaria." },
    ],
    faq: [
      {
        q: "¿Cuánto dejar en la reserva?",
        a: "Generalmente entre 6 y 12 meses de gastos esenciales — depende de tu contexto.",
      },
      {
        q: "¿La renta fija paraguaya rinde poco?",
        a: "En ciclos de tasas altas, los CDAs y bonos en guaraníes pueden ser muy competitivos — y siempre cumplen un rol estructural.",
      },
    ],
  },
  {
    slug: "renta-variable",
    icon: Briefcase,
    title: "Renta Variable",
    shortDesc:
      "Análisis fundamental, dividendos y principios para invertir con método en BVA y mercados externos.",
    tagline: "Invertir en acciones es comprar pedazos de empresas.",
    heroIntro:
      "Enseñanza aplicada de análisis fundamental, valuation y estrategia de dividendos — para inversores paraguayos que quieren operar en la BVA o en mercados internacionales con criterio, no con corazonadas.",
    forWho: [
      "Inversores que empiezan con acciones",
      "Quienes buscan renta pasiva vía dividendos",
      "Quienes quieren aprender valuation de forma práctica",
    ],
    topics: [
      {
        title: "Análisis fundamental",
        desc: "Estados financieros, márgenes, endeudamiento y calidad del management.",
      },
      {
        title: "Estrategia de dividendos",
        desc: "Cómo identificar buenas pagadoras y construir renta recurrente en USD.",
      },
      {
        title: "Múltiplos y valuation",
        desc: "P/E, P/BV, EV/EBITDA, DCF — cuándo y cómo aplicar cada uno.",
      },
      {
        title: "Sectores defensivos vs cíclicos",
        desc: "Cómo cada sector se comporta en distintos momentos del ciclo económico paraguayo y global.",
      },
    ],
    deliverables: [
      "Manual de análisis fundamental",
      "Planilla de valuation",
      "Cartera didáctica de dividendos",
      "Casos de estudio de empresas listadas",
    ],
    methodology: [
      { step: "01", title: "Tesis", desc: "¿Por qué esa empresa, a ese precio, ahora?" },
      { step: "02", title: "Análisis", desc: "Números, gobierno corporativo y ventaja competitiva." },
      { step: "03", title: "Seguimiento", desc: "Revisión periódica de tesis y resultados." },
    ],
    faq: [
      {
        q: "¿Vale la pena empezar con poco?",
        a: "Sí. Lo más importante es empezar con método y disciplina — no con volumen.",
      },
      {
        q: "¿El day trade forma parte?",
        a: "No. Nuestro método es fundamental y de largo plazo.",
      },
    ],
  },
  {
    slug: "planificacion-patrimonial",
    icon: Target,
    title: "Planificación Patrimonial",
    shortDesc:
      "Visión de largo plazo para construir y preservar patrimonio a lo largo de las décadas.",
    tagline: "El patrimonio se construye en décadas, no en meses.",
    heroIntro:
      "Contenido estratégico para quien piensa el patrimonio como proyecto de vida — incluyendo metas, independencia financiera, sucesión y protección, con foco en la realidad jurídica y tributaria paraguaya.",
    forWho: [
      "Familias pensando en sucesión",
      "Inversores rumbo a la independencia financiera",
      "Quienes necesitan estructurar metas de largo plazo",
    ],
    topics: [
      {
        title: "Metas financieras de largo plazo",
        desc: "Cómo traducir sueños en números, plazos y estrategias.",
      },
      {
        title: "Independencia financiera",
        desc: "Cálculo de renta pasiva necesaria y tasa segura de retiro en contexto paraguayo.",
      },
      {
        title: "Planificación sucesoria (visión general)",
        desc: "Sociedades, donaciones, testamento y fluidez en la transmisión patrimonial bajo ley paraguaya.",
      },
      {
        title: "Protección patrimonial",
        desc: "Seguros, blindaje responsable y diversificación geográfica entre Paraguay y exterior.",
      },
    ],
    deliverables: [
      "Plan patrimonial en capas",
      "Calculadora de independencia financiera",
      "Guía de sucesión patrimonial PY",
      "Checklist de protección",
    ],
    methodology: [
      { step: "01", title: "Visión", desc: "A dónde querés llegar en 10, 20, 30 años." },
      { step: "02", title: "Plan", desc: "Estructura financiera y jurídica adecuada." },
      { step: "03", title: "Ejecución", desc: "Disciplina, revisión y ajuste continuo." },
    ],
    faq: [
      {
        q: "¿Hacen planificación individual?",
        a: "Nuestro contenido es educativo. Para casos complejos, recomendamos profesionales aliados en Asunción.",
      },
      {
        q: "¿Necesito mucho patrimonio para empezar?",
        a: "No. La planificación es justamente lo que te lleva al patrimonio — no al revés.",
      },
    ],
  },
  {
    slug: "contenido-premium",
    icon: FileText,
    title: "Contenido Premium",
    shortDesc:
      "Newsletter, e-books y reportes exclusivos para profundizar el conocimiento del lector paraguayo.",
    tagline: "Curaduría de alto nivel, sin ruido.",
    heroIntro:
      "Material en profundidad, con investigación, datos propios y lenguaje editorial. Para el lector exigente que valora la profundidad por encima de la velocidad.",
    forWho: [
      "Lectores exigentes que buscan profundidad",
      "Profesionales que necesitan fuentes confiables sobre el mercado paraguayo",
      "Inversores que quieren ir más allá del contenido gratuito",
    ],
    topics: [
      {
        title: "Newsletter Aurea semanal",
        desc: "Síntesis editorial de los eventos más relevantes de la semana — Paraguay, región y mundo.",
      },
      {
        title: "E-books temáticos",
        desc: "Libros digitales en profundidad sobre cada vertical financiera del mercado paraguayo.",
      },
      {
        title: "Reportes estratégicos",
        desc: "Estudios exclusivos sobre sectores, clases de activos y escenarios.",
      },
      {
        title: "Curaduría de lecturas",
        desc: "Selección comentada de los mejores materiales nacionales e internacionales.",
      },
    ],
    deliverables: [
      "Newsletter semanal",
      "Biblioteca de e-books",
      "Reportes trimestrales",
      "Lista de lecturas recomendadas",
    ],
    methodology: [
      { step: "01", title: "Investigación", desc: "Inmersión en datos, fuentes y literatura." },
      { step: "02", title: "Edición", desc: "Texto claro, denso y sin jerga." },
      { step: "03", title: "Publicación", desc: "Distribución continua a los suscriptores." },
    ],
    faq: [
      {
        q: "¿Cómo me suscribo?",
        a: "Pronto abrimos nuevos cupos — completá el formulario para entrar a la lista.",
      },
      {
        q: "¿Puedo probar antes?",
        a: "Sí, hay materiales gratuitos para que conozcas nuestro estándar editorial.",
      },
    ],
  },
  {
    slug: "comunidad-y-mentoria",
    icon: Users,
    title: "Comunidad & Mentoría",
    shortDesc:
      "Espacio de intercambio entre inversores paraguayos que buscan aprender con método, paciencia y disciplina.",
    tagline: "Aprender en conjunto acelera — y protege.",
    heroIntro:
      "Un ambiente curado para el intercambio entre inversores serios de Paraguay. Encuentros, vivos, Q&A con invitados y materiales complementarios para quienes quieren evolucionar rodeados de quienes piensan parecido.",
    forWho: [
      "Inversores que buscan comunidad seria en PY",
      "Quienes quieren acceso a especialistas invitados",
      "Quienes valoran el aprendizaje continuo",
    ],
    topics: [
      {
        title: "Comunidad de lectores",
        desc: "Foro moderado, con agenda semanal y discusiones de calidad.",
      },
      {
        title: "Encuentros y vivos",
        desc: "Eventos mensuales con profundidad en temas específicos del mercado paraguayo.",
      },
      {
        title: "Q&A con invitados",
        desc: "Sesiones con gestores, economistas y analistas reconocidos.",
      },
      {
        title: "Materiales complementarios",
        desc: "Contenido extra exclusivo para miembros de la comunidad.",
      },
    ],
    deliverables: [
      "Acceso a la comunidad moderada",
      "Calendario mensual de eventos",
      "Grabaciones de todas las sesiones",
      "Biblioteca de materiales exclusivos",
    ],
    methodology: [
      { step: "01", title: "Adhesión", desc: "Inscripción y onboarding inicial." },
      { step: "02", title: "Participación", desc: "Eventos, foros y materiales." },
      { step: "03", title: "Evolución", desc: "Acompañamiento continuo de tu camino." },
    ],
    faq: [
      {
        q: "¿Hay mensualidad?",
        a: "Sí. Los valores y formatos se presentan al momento de abrir nuevos cupos.",
      },
      {
        q: "¿Hay límite de cupos?",
        a: "Sí, para preservar la calidad de la comunidad y de la curaduría.",
      },
    ],
  },
];

// Map ES slug -> PT slug so URLs keep working when toggling languages
export const esToPtSlug: Record<string, string> = {
  "educacion-financiera": "educacao-financeira",
  "analisis-de-mercado": "analise-de-mercado",
  "estrategia-de-cartera": "estrategia-de-carteira",
  "renta-fija-y-reserva": "renda-fixa-e-reserva",
  "renta-variable": "renda-variavel",
  "planificacion-patrimonial": "planejamento-patrimonial",
  "contenido-premium": "conteudo-premium",
  "comunidad-y-mentoria": "comunidade-e-mentoria",
};

export const ptToEsSlug: Record<string, string> = Object.fromEntries(
  Object.entries(esToPtSlug).map(([es, pt]) => [pt, es]),
);

export const getServiceEsBySlug = (slug: string): ServiceDetail | undefined => {
  // Accept ES slug or PT slug
  const esSlug = ptToEsSlug[slug] ?? slug;
  return servicesEs.find((s) => s.slug === esSlug);
};
