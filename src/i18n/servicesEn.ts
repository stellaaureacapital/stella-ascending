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

export const servicesEn: ServiceDetail[] = [
  {
    slug: "financial-education",
    icon: GraduationCap,
    title: "Financial Education",
    shortDesc:
      "Structured tracks, from basics to advanced, to build a solid foundation across global markets.",
    tagline: "Learning to invest starts with learning to think.",
    heroIntro:
      "A learning journey for investors who want to understand the why behind decisions — not just follow recommendations. Progressive tracks, examples in USD, GBP and EUR, direct language.",
    forWho: [
      "Beginners who want to avoid costly mistakes",
      "Intermediate investors with conceptual gaps about global markets",
      "Professionals who want to deepen their critical reading of the world economy",
    ],
    topics: [
      { title: "Fundamentals of the global financial system", desc: "How the Fed, ECB, BoE, exchanges and major banks work — and the role of each agent." },
      { title: "The investor's language", desc: "Active glossary: liquidity, duration, spread, yield, basis points, CPI and other essentials." },
      { title: "Reading global indicators", desc: "CPI, PCE, NFP, PMIs, Fed funds, ECB deposit rate and how each impacts your portfolio." },
      { title: "Long-term mindset", desc: "Cognitive biases, discipline, patience and the math of compounding." },
    ],
    deliverables: ["Track of themed e-books", "Curated video lessons", "Tracking spreadsheets", "Weekly Aurea newsletter"],
    methodology: [
      { step: "01", title: "Diagnosis", desc: "We assess your current level and goals." },
      { step: "02", title: "Tailored track", desc: "Progressive plan built for your profile." },
      { step: "03", title: "Follow-up", desc: "Materials, community and periodic reviews." },
    ],
    faq: [
      { q: "Do I need prior knowledge?", a: "No. Tracks start from zero and progress gradually." },
      { q: "Do you recommend specific assets?", a: "Our focus is educational. We don't make personalized recommendations." },
    ],
  },
  {
    slug: "market-analysis",
    icon: TrendingUp,
    title: "Market Analysis",
    shortDesc: "Systematic reading of global macro and sector dynamics, grounded in reliable data.",
    tagline: "Decisions guided by data and scenario reading.",
    heroIntro:
      "Reports and analysis that connect global macro, central bank policy (Fed/ECB/BoE), sector dynamics and geopolitical context — to understand the picture before any decision.",
    forWho: [
      "Investors who want to go beyond headlines",
      "Finance and economics professionals operating across regions",
      "Those seeking to understand the real impact of rates and FX on portfolios",
    ],
    topics: [
      { title: "Global macro reports", desc: "Monthly synthesis of inflation, activity, fiscal accounts and external context across US/UK/EU." },
      { title: "Sector analysis", desc: "Deep dives on tech, energy, financials, luxury, industrials and commodities — global lens." },
      { title: "Rates and FX", desc: "Fed/ECB/BoE decisions, yield curves and EUR/USD/GBP dynamics." },
      { title: "Global scenarios", desc: "Geopolitics, China, emerging markets and their cross-asset impact." },
    ],
    deliverables: ["Monthly macro report", "Sector letters", "Critical event alerts", "Indicator glossary"],
    methodology: [
      { step: "01", title: "Collection", desc: "Data from official sources and recognized institutions." },
      { step: "02", title: "Analysis", desc: "Cross-variable scenario modeling." },
      { step: "03", title: "Synthesis", desc: "Clear communication, no unnecessary jargon." },
    ],
    faq: [
      { q: "Are reports paid?", a: "Free content is available, with deeper materials via premium subscription." },
      { q: "How often are they published?", a: "Monthly macro, quarterly sector, alerts as relevant events unfold." },
    ],
  },
  {
    slug: "portfolio-strategy",
    icon: PieChart,
    title: "Portfolio Strategy",
    shortDesc: "Construction, diversification and rebalancing of portfolios across investor profiles.",
    tagline: "The right portfolio starts with knowing who you are.",
    heroIntro:
      "In-depth content on asset allocation, real diversification across regions and currencies, and rebalancing discipline — principles that separate amateur from strategic investors.",
    forWho: [
      "Investors building their first structured portfolio",
      "Those seeking methodical rebalancing",
      "Those who want to reduce risk without sacrificing return",
    ],
    topics: [
      { title: "Allocation by asset class", desc: "Equities (US/UK/EU), Treasuries, Gilts, Bunds, ETFs, REITs and alternatives." },
      { title: "Real diversification", desc: "Why holding 30 stocks in one sector isn't diversification — and how to balance currency and geography." },
      { title: "Periodic rebalancing", desc: "When, how and why to adjust the portfolio over time." },
      { title: "Risk management", desc: "Volatility, drawdown, correlation, FX risk and capital protection." },
    ],
    deliverables: ["Model portfolios by profile", "Rebalancing spreadsheet", "Quarterly checklist", "Real case studies"],
    methodology: [
      { step: "01", title: "Profile", desc: "Risk tolerance, horizon and goals." },
      { step: "02", title: "Structure", desc: "Define asset classes, regions and strategic weights." },
      { step: "03", title: "Discipline", desc: "Periodic rebalancing, no emotion." },
    ],
    faq: [
      { q: "Do you build my portfolio?", a: "We don't manage. We teach principles so you decide with criteria." },
      { q: "Is there an ideal portfolio?", a: "No. There's a portfolio coherent with your profile, goals and horizon." },
    ],
  },
  {
    slug: "fixed-income-and-reserve",
    icon: Shield,
    title: "Fixed Income & Reserve",
    shortDesc: "How to build a solid reserve and use global fixed income strategically.",
    tagline: "Before chasing return, protect your capital.",
    heroIntro:
      "The foundation of any sound wealth strategy. Here you understand each fixed income product — Treasuries, Gilts, Bunds, corporate bonds — their tax treatment, liquidity and the real role of the emergency reserve.",
    forWho: [
      "Those without a structured emergency reserve",
      "Investors confusing money market, T-bills, Gilts and corporate bonds",
      "Those wanting to take advantage of high-rate cycles",
    ],
    topics: [
      { title: "US Treasuries in practice", desc: "T-bills, T-notes, T-bonds and TIPS — when each makes sense." },
      { title: "Gilts, Bunds and corporates", desc: "Comparison of risk, liquidity, tax treatment and credit quality." },
      { title: "Emergency reserve", desc: "How much, where and why to hold an untouchable short-term reserve." },
      { title: "Yield curves", desc: "Reading the US, UK and EU curves and what they say about the future." },
    ],
    deliverables: ["Complete fixed income guide", "Product comparator", "Net-yield calculator", "Yield curve map"],
    methodology: [
      { step: "01", title: "Reserve", desc: "Build the emergency reserve first." },
      { step: "02", title: "Strategy", desc: "Tactical allocation according to the rate cycle." },
      { step: "03", title: "Maintenance", desc: "Reinvestment and tax optimization." },
    ],
    faq: [
      { q: "How much in the reserve?", a: "Generally 6 to 12 months of essential expenses — depends on your context." },
      { q: "Does fixed income yield little?", a: "In high-rate cycles it can be very competitive — and always plays a structural role." },
    ],
  },
  {
    slug: "equities",
    icon: Briefcase,
    title: "Equities",
    shortDesc: "Fundamental analysis, dividends and principles to invest with method across US/UK/EU.",
    tagline: "Investing in stocks is buying pieces of businesses.",
    heroIntro:
      "Applied teaching of fundamental analysis, valuation and dividend strategy — for investors who want to operate in global equity markets with criteria, not hunches.",
    forWho: [
      "Investors getting started in equities",
      "Those seeking passive income via dividends",
      "Those who want to learn valuation in a practical way",
    ],
    topics: [
      { title: "Fundamental analysis", desc: "Financial statements, margins, leverage and quality of management." },
      { title: "Dividend strategy", desc: "How to identify quality payers and build recurring income in USD/GBP/EUR." },
      { title: "Multiples and valuation", desc: "P/E, P/B, EV/EBITDA, DCF — when and how to apply each." },
      { title: "Defensive vs cyclical sectors", desc: "How each sector behaves in different phases of the global cycle." },
    ],
    deliverables: ["Fundamental analysis manual", "Valuation spreadsheet", "Educational dividend portfolio", "Case studies of listed companies"],
    methodology: [
      { step: "01", title: "Thesis", desc: "Why this company, at this price, now?" },
      { step: "02", title: "Analysis", desc: "Numbers, governance and competitive advantage." },
      { step: "03", title: "Follow-up", desc: "Periodic review of thesis and results." },
    ],
    faq: [
      { q: "Is it worth starting small?", a: "Yes. The most important thing is starting with method and discipline — not volume." },
      { q: "Is day trading part of it?", a: "No. Our method is fundamental and long-term." },
    ],
  },
  {
    slug: "wealth-planning",
    icon: Target,
    title: "Wealth Planning",
    shortDesc: "Long-term vision to build and preserve wealth across decades.",
    tagline: "Wealth is built over decades, not months.",
    heroIntro:
      "Strategic content for those who think of wealth as a life project — including goals, financial independence, succession and protection, with a global lens on jurisdictions and tax frameworks.",
    forWho: [
      "Families thinking about succession",
      "Investors heading toward financial independence",
      "Those who need to structure long-term goals",
    ],
    topics: [
      { title: "Long-term financial goals", desc: "How to translate dreams into numbers, timelines and strategies." },
      { title: "Financial independence", desc: "Required passive income calculation and safe withdrawal rate." },
      { title: "Succession planning (overview)", desc: "Holdings, gifts, wills and smooth wealth transmission." },
      { title: "Wealth protection", desc: "Insurance, responsible structuring and geographic diversification." },
    ],
    deliverables: ["Layered wealth plan", "Financial independence calculator", "Succession guide", "Protection checklist"],
    methodology: [
      { step: "01", title: "Vision", desc: "Where you want to be in 10, 20, 30 years." },
      { step: "02", title: "Plan", desc: "Adequate financial and legal structure." },
      { step: "03", title: "Execution", desc: "Discipline, review and continuous adjustment." },
    ],
    faq: [
      { q: "Do you do individual planning?", a: "Our content is educational. For complex cases, we recommend partner professionals." },
      { q: "Do I need a lot of wealth to start?", a: "No. Planning is exactly what leads you to wealth — not the other way around." },
    ],
  },
  {
    slug: "premium-content",
    icon: FileText,
    title: "Premium Content",
    shortDesc: "Newsletter, e-books and exclusive reports to deepen the reader's knowledge.",
    tagline: "High-level curation, no noise.",
    heroIntro:
      "In-depth material with research, proprietary data and editorial language. For demanding readers who value depth over speed.",
    forWho: [
      "Demanding readers seeking depth",
      "Professionals who need reliable sources on global markets",
      "Investors who want to go beyond free content",
    ],
    topics: [
      { title: "Weekly Aurea newsletter", desc: "Editorial synthesis of the week's most relevant events — global lens." },
      { title: "Themed e-books", desc: "In-depth digital books on each financial vertical." },
      { title: "Strategic reports", desc: "Exclusive studies on sectors, asset classes and scenarios." },
      { title: "Reading curation", desc: "Commented selection of the best international materials." },
    ],
    deliverables: ["Weekly newsletter", "E-book library", "Quarterly reports", "Recommended reading list"],
    methodology: [
      { step: "01", title: "Research", desc: "Immersion in data, sources and literature." },
      { step: "02", title: "Editing", desc: "Clear, dense text without jargon." },
      { step: "03", title: "Publication", desc: "Continuous distribution to subscribers." },
    ],
    faq: [
      { q: "How do I subscribe?", a: "We'll open new spots soon — fill the form to join the list." },
      { q: "Can I try before?", a: "Yes, free materials let you sample our editorial standard." },
    ],
  },
  {
    slug: "community-and-mentorship",
    icon: Users,
    title: "Community & Mentorship",
    shortDesc: "Exchange space among investors who learn with method, patience and discipline.",
    tagline: "Learning together accelerates — and protects.",
    heroIntro:
      "A curated environment for serious investors. Meetings, livestreams, Q&A with guests and complementary materials for those who want to grow alongside like-minded peers.",
    forWho: [
      "Investors seeking a serious community",
      "Those wanting access to expert guests",
      "Those who value continuous learning",
    ],
    topics: [
      { title: "Readers' community", desc: "Moderated forum with weekly themes and quality discussions." },
      { title: "Meetings and livestreams", desc: "Monthly events with deep dives on specific topics." },
      { title: "Q&A with guests", desc: "Sessions with renowned managers, economists and analysts." },
      { title: "Complementary materials", desc: "Exclusive extra content for community members." },
    ],
    deliverables: ["Access to the moderated community", "Monthly events calendar", "Recordings of all sessions", "Library of exclusive materials"],
    methodology: [
      { step: "01", title: "Joining", desc: "Sign-up and initial onboarding." },
      { step: "02", title: "Participation", desc: "Events, forums and materials." },
      { step: "03", title: "Evolution", desc: "Continuous accompaniment of your journey." },
    ],
    faq: [
      { q: "Is there a monthly fee?", a: "Yes. Pricing and formats are presented when new spots open." },
      { q: "Is there a cap on spots?", a: "Yes, to preserve community and curation quality." },
    ],
  },
];

// Map EN slug -> PT slug so URLs keep working when toggling languages
export const enToPtSlug: Record<string, string> = {
  "financial-education": "educacao-financeira",
  "market-analysis": "analise-de-mercado",
  "portfolio-strategy": "estrategia-de-carteira",
  "fixed-income-and-reserve": "renda-fixa-e-reserva",
  "equities": "renda-variavel",
  "wealth-planning": "planejamento-patrimonial",
  "premium-content": "conteudo-premium",
  "community-and-mentorship": "comunidade-e-mentoria",
};

export const ptToEnSlug: Record<string, string> = Object.fromEntries(
  Object.entries(enToPtSlug).map(([en, pt]) => [pt, en]),
);

export const getServiceEnBySlug = (slug: string): ServiceDetail | undefined => {
  // Accept EN slug or PT slug
  const enSlug = ptToEnSlug[slug] ?? slug;
  return servicesEn.find((s) => s.slug === enSlug);
};
