export type Stock = {
  ticker: string;
  name: string;
  price: number;
  changePct: number;
  currency: "BRL" | "USD";
};

export type IndexQuote = {
  symbol: string;
  name: string;
  value: number;
  changePct: number;
  region: "BR" | "US" | "FX";
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  publishedAt: string; // ISO
  url: string;
  region: "BR" | "US";
  summary: string;
};

// ---------- BRASIL ----------
export const brGainers: Stock[] = [
  { ticker: "MGLU3", name: "Magazine Luiza", price: 12.84, changePct: 8.92, currency: "BRL" },
  { ticker: "AZUL4", name: "Azul", price: 9.15, changePct: 7.41, currency: "BRL" },
  { ticker: "PETR4", name: "Petrobras PN", price: 38.72, changePct: 5.83, currency: "BRL" },
  { ticker: "VALE3", name: "Vale", price: 64.21, changePct: 5.12, currency: "BRL" },
  { ticker: "BBDC4", name: "Bradesco PN", price: 14.07, changePct: 4.66, currency: "BRL" },
  { ticker: "ITUB4", name: "Itaú Unibanco PN", price: 33.48, changePct: 4.21, currency: "BRL" },
  { ticker: "WEGE3", name: "WEG", price: 51.93, changePct: 3.97, currency: "BRL" },
  { ticker: "RENT3", name: "Localiza", price: 42.18, changePct: 3.55, currency: "BRL" },
  { ticker: "SUZB3", name: "Suzano", price: 58.74, changePct: 3.21, currency: "BRL" },
  { ticker: "EQTL3", name: "Equatorial", price: 31.62, changePct: 2.88, currency: "BRL" },
];

export const brLosers: Stock[] = [
  { ticker: "AMER3", name: "Americanas", price: 0.78, changePct: -9.31, currency: "BRL" },
  { ticker: "CVCB3", name: "CVC Brasil", price: 2.41, changePct: -7.62, currency: "BRL" },
  { ticker: "GOLL4", name: "Gol", price: 1.23, changePct: -6.84, currency: "BRL" },
  { ticker: "MRFG3", name: "Marfrig", price: 11.29, changePct: -5.47, currency: "BRL" },
  { ticker: "BRFS3", name: "BRF", price: 18.74, changePct: -4.92, currency: "BRL" },
  { ticker: "CIEL3", name: "Cielo", price: 5.18, changePct: -4.31, currency: "BRL" },
  { ticker: "VIIA3", name: "Via", price: 1.84, changePct: -3.97, currency: "BRL" },
  { ticker: "USIM5", name: "Usiminas PNA", price: 6.42, changePct: -3.55, currency: "BRL" },
  { ticker: "CSNA3", name: "CSN", price: 13.81, changePct: -3.12, currency: "BRL" },
  { ticker: "EMBR3", name: "Embraer", price: 28.94, changePct: -2.74, currency: "BRL" },
];

// ---------- EUA ----------
export const usGainers: Stock[] = [
  { ticker: "NVDA", name: "NVIDIA", price: 928.41, changePct: 6.84, currency: "USD" },
  { ticker: "TSLA", name: "Tesla", price: 248.92, changePct: 5.71, currency: "USD" },
  { ticker: "AMD", name: "Advanced Micro Devices", price: 167.38, changePct: 4.92, currency: "USD" },
  { ticker: "META", name: "Meta Platforms", price: 521.74, changePct: 4.18, currency: "USD" },
  { ticker: "AAPL", name: "Apple", price: 192.83, changePct: 3.74, currency: "USD" },
  { ticker: "MSFT", name: "Microsoft", price: 428.91, changePct: 3.21, currency: "USD" },
  { ticker: "GOOGL", name: "Alphabet", price: 174.62, changePct: 2.97, currency: "USD" },
  { ticker: "AMZN", name: "Amazon", price: 188.47, changePct: 2.64, currency: "USD" },
  { ticker: "AVGO", name: "Broadcom", price: 1842.18, changePct: 2.31, currency: "USD" },
  { ticker: "NFLX", name: "Netflix", price: 692.84, changePct: 2.08, currency: "USD" },
];

export const usLosers: Stock[] = [
  { ticker: "BA", name: "Boeing", price: 168.42, changePct: -7.21, currency: "USD" },
  { ticker: "INTC", name: "Intel", price: 21.84, changePct: -6.48, currency: "USD" },
  { ticker: "F", name: "Ford Motor", price: 10.27, changePct: -5.83, currency: "USD" },
  { ticker: "PFE", name: "Pfizer", price: 28.91, changePct: -4.92, currency: "USD" },
  { ticker: "WBA", name: "Walgreens Boots", price: 9.18, changePct: -4.37, currency: "USD" },
  { ticker: "T", name: "AT&T", price: 17.42, changePct: -3.81, currency: "USD" },
  { ticker: "KO", name: "Coca-Cola", price: 62.74, changePct: -3.18, currency: "USD" },
  { ticker: "DIS", name: "Walt Disney", price: 91.83, changePct: -2.84, currency: "USD" },
  { ticker: "NKE", name: "Nike", price: 74.62, changePct: -2.47, currency: "USD" },
  { ticker: "MCD", name: "McDonald's", price: 268.91, changePct: -2.12, currency: "USD" },
];

// ---------- ÍNDICES ----------
export const indices: IndexQuote[] = [
  { symbol: "IBOV", name: "Ibovespa", value: 132487.42, changePct: 1.24, region: "BR" },
  { symbol: "IFIX", name: "Índice de Fundos Imobiliários", value: 3284.71, changePct: 0.42, region: "BR" },
  { symbol: "SMLL", name: "Small Caps", value: 2841.93, changePct: 1.87, region: "BR" },
  { symbol: "SPX", name: "S&P 500", value: 5847.21, changePct: 0.92, region: "US" },
  { symbol: "NDX", name: "Nasdaq 100", value: 20384.74, changePct: 1.41, region: "US" },
  { symbol: "DJI", name: "Dow Jones", value: 42891.38, changePct: 0.58, region: "US" },
  { symbol: "USDBRL", name: "Dólar / Real", value: 5.78, changePct: -0.31, region: "FX" },
  { symbol: "EURBRL", name: "Euro / Real", value: 6.24, changePct: -0.18, region: "FX" },
  { symbol: "BTCUSD", name: "Bitcoin / Dólar", value: 94287.41, changePct: 2.84, region: "FX" },
];

// ---------- NOTÍCIAS ----------
export const news: NewsItem[] = [
  {
    id: "n1",
    title: "Ibovespa renova máxima histórica impulsionado por commodities",
    source: "Valor Econômico",
    publishedAt: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
    url: "#",
    region: "BR",
    summary: "Índice fecha em alta de 1,24% com forte desempenho de Vale e Petrobras após avanço do minério.",
  },
  {
    id: "n2",
    title: "Copom mantém Selic e sinaliza cautela com cenário fiscal",
    source: "InfoMoney",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    url: "#",
    region: "BR",
    summary: "Comitê reforça vigilância sobre inflação de serviços e ancoragem de expectativas para 2026.",
  },
  {
    id: "n3",
    title: "Petrobras anuncia novo programa de recompra de ações",
    source: "Reuters Brasil",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    url: "#",
    region: "BR",
    summary: "Estatal aprova recompra de até 3% das ações em circulação ao longo dos próximos 12 meses.",
  },
  {
    id: "n4",
    title: "Fundos imobiliários têm captação líquida recorde no trimestre",
    source: "Suno Notícias",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    url: "#",
    region: "BR",
    summary: "IFIX acumula alta no ano com retomada do interesse de pessoas físicas em ativos de renda passiva.",
  },
  {
    id: "n5",
    title: "Nvidia surges as data-center demand outpaces forecasts",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    url: "#",
    region: "US",
    summary: "Chipmaker beats estimates again, with hyperscaler capex revisions lifting the broader semis sector.",
  },
  {
    id: "n6",
    title: "Fed minutes signal patience on rate cuts amid sticky inflation",
    source: "Wall Street Journal",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    url: "#",
    region: "US",
    summary: "Officials remain divided on the timing of the next move, with markets pricing in cuts for mid-2026.",
  },
  {
    id: "n7",
    title: "Boeing shares slide after fresh quality concerns surface",
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    url: "#",
    region: "US",
    summary: "Manufacturer faces additional FAA scrutiny after reports of supplier defects on 737 MAX line.",
  },
  {
    id: "n8",
    title: "S&P 500 closes at record as megacaps lead broad rally",
    source: "CNBC",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    url: "#",
    region: "US",
    summary: "Index gains 0.92% with technology and communication services leading sector performance.",
  },
];