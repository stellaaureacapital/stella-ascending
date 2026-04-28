export type Stock = {
  ticker: string;
  name: string;
  price: number;
  changePct: number;
  currency: "BRL" | "USD" | "PYG" | "EUR" | "GBP";
  domain?: string;
  sector?: string;
  volume?: number; // shares traded (in millions)
  dayHigh?: number;
  dayLow?: number;
  weekChangePct?: number;
  spark?: number[]; // last ~20 points, normalized prices
};

export type IndexQuote = {
  symbol: string;
  name: string;
  value: number;
  changePct: number;
  region: "BR" | "US" | "FX" | "PY" | "EU" | "UK" | "GLOBAL";
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  publishedAt: string; // ISO
  url: string;
  region: "BR" | "US" | "PY" | "EU" | "UK" | "GLOBAL";
  summary: string;
};

// ---------- BRASIL ----------
export const brGainers: Stock[] = [
  { ticker: "MGLU3", name: "Magazine Luiza", price: 12.84, changePct: 8.92, currency: "BRL", domain: "magazineluiza.com.br", sector: "Varejo", volume: 51.88, dayHigh: 12.95, dayLow: 12.73, weekChangePct: 10.71, spark: [100.0, 101.35, 100.61, 99.55, 99.79, 99.54, 100.03, 101.06, 100.35, 101.38, 101.22, 100.99, 100.57, 101.65, 102.91, 104.8, 105.74, 106.89, 107.82, 106.82] },
  { ticker: "AZUL4", name: "Azul", price: 9.15, changePct: 7.41, currency: "BRL", domain: "voeazul.com.br", sector: "Aviação", volume: 24.57, dayHigh: 9.23, dayLow: 9.08, weekChangePct: 4.97, spark: [100.0, 100.86, 100.82, 100.98, 102.05, 101.77, 101.23, 103.34, 104.19, 105.96, 105.37, 105.21, 105.2, 106.75, 107.69, 109.46, 109.13, 109.69, 110.78, 110.83] },
  { ticker: "PETR4", name: "Petrobras PN", price: 38.72, changePct: 5.83, currency: "BRL", domain: "petrobras.com.br", sector: "Energia", volume: 79.81, dayHigh: 39.21, dayLow: 38.26, weekChangePct: 2.87, spark: [100.0, 101.14, 101.15, 101.69, 102.66, 103.95, 105.29, 105.78, 106.49, 106.81, 108.98, 108.82, 108.7, 110.22, 111.26, 110.95, 111.82, 112.11, 111.79, 113.9] },
  { ticker: "VALE3", name: "Vale", price: 64.21, changePct: 5.12, currency: "BRL", domain: "vale.com", sector: "Mineração", volume: 66.87, dayHigh: 64.84, dayLow: 62.86, weekChangePct: 13.34, spark: [100.0, 99.3, 98.74, 99.82, 100.34, 100.44, 100.56, 101.39, 100.91, 103.05, 103.43, 102.65, 102.77, 102.32, 101.67, 101.69, 103.02, 102.9, 102.34, 104.24] },
  { ticker: "BBDC4", name: "Bradesco PN", price: 14.07, changePct: 4.66, currency: "BRL", domain: "bradesco.com.br", sector: "Bancos", volume: 38.87, dayHigh: 14.5, dayLow: 13.82, weekChangePct: 2.71, spark: [100.0, 100.29, 100.9, 102.31, 101.59, 101.91, 101.49, 101.83, 101.54, 103.32, 104.99, 104.54, 106.43, 108.5, 108.04, 107.66, 106.8, 108.64, 110.01, 110.65] },
  { ticker: "ITUB4", name: "Itaú Unibanco PN", price: 33.48, changePct: 4.21, currency: "BRL", domain: "itau.com.br", sector: "Bancos", volume: 79.64, dayHigh: 34.28, dayLow: 33.0, weekChangePct: 5.21, spark: [100.0, 102.01, 102.86, 102.14, 102.95, 102.79, 101.86, 102.82, 102.31, 103.85, 104.77, 105.14, 106.06, 105.87, 105.57, 106.49, 106.67, 105.9, 108.3, 107.37] },
  { ticker: "WEGE3", name: "WEG", price: 51.93, changePct: 3.97, currency: "BRL", domain: "weg.net", sector: "Indústria", volume: 22.69, dayHigh: 53.78, dayLow: 50.08, weekChangePct: 6.12, spark: [100.0, 99.76, 101.0, 103.12, 102.41, 102.47, 104.08, 103.21, 103.76, 104.77, 104.53, 104.36, 106.37, 105.64, 105.18, 106.63, 106.64, 107.29, 106.08, 108.06] },
  { ticker: "RENT3", name: "Localiza", price: 42.18, changePct: 3.55, currency: "BRL", domain: "localiza.com", sector: "Locação", volume: 44.56, dayHigh: 43.31, dayLow: 41.44, weekChangePct: 3.09, spark: [100.0, 100.25, 101.94, 103.49, 103.01, 104.67, 105.02, 104.84, 106.81, 108.56, 107.85, 108.2, 109.91, 111.23, 112.37, 114.29, 114.23, 114.52, 115.77, 114.67] },
  { ticker: "SUZB3", name: "Suzano", price: 58.74, changePct: 3.21, currency: "BRL", domain: "suzano.com.br", sector: "Papel/Celulose", volume: 27.6, dayHigh: 60.85, dayLow: 57.52, weekChangePct: 9.52, spark: [100.0, 100.59, 101.55, 101.28, 101.19, 100.76, 101.27, 101.34, 101.84, 102.45, 103.28, 105.13, 106.51, 107.48, 106.85, 106.76, 108.51, 108.33, 108.53, 108.21] },
  { ticker: "EQTL3", name: "Equatorial", price: 31.62, changePct: 2.88, currency: "BRL", domain: "equatorialenergia.com.br", sector: "Energia", volume: 34.79, dayHigh: 32.6, dayLow: 30.47, weekChangePct: 9.19, spark: [100.0, 99.99, 98.89, 99.28, 100.27, 100.45, 101.2, 102.41, 101.72, 102.56, 104.24, 105.11, 104.43, 104.19, 105.49, 105.88, 105.65, 106.0, 106.68, 108.17] },
];

export const brLosers: Stock[] = [
  { ticker: "AMER3", name: "Americanas", price: 0.78, changePct: -9.31, currency: "BRL", domain: "americanas.com.br", sector: "Varejo", volume: 10.31, dayHigh: 0.79, dayLow: 0.76, weekChangePct: -7.97, spark: [100.0, 98.28, 98.8, 99.04, 99.89, 100.41, 100.05, 99.28, 98.59, 98.79, 97.7, 97.37, 96.8, 95.87, 94.84, 93.72, 92.27, 92.16, 90.37, 90.0] },
  { ticker: "CVCB3", name: "CVC Brasil", price: 2.41, changePct: -7.62, currency: "BRL", domain: "cvc.com.br", sector: "Turismo", volume: 18.13, dayHigh: 2.47, dayLow: 2.36, weekChangePct: -10.19, spark: [100.0, 100.33, 99.77, 98.6, 98.79, 97.83, 97.34, 96.15, 95.74, 94.57, 93.97, 93.58, 93.73, 92.82, 90.75, 89.13, 87.32, 86.02, 86.34, 86.31] },
  { ticker: "GOLL4", name: "Gol", price: 1.23, changePct: -6.84, currency: "BRL", domain: "voegol.com.br", sector: "Aviação", volume: 21.68, dayHigh: 1.24, dayLow: 1.21, weekChangePct: -14.0, spark: [100.0, 98.89, 99.08, 98.98, 97.86, 96.53, 96.45, 94.91, 95.39, 94.99, 93.06, 94.18, 92.34, 92.0, 90.99, 89.03, 89.15, 89.17, 89.18, 89.89] },
  { ticker: "MRFG3", name: "Marfrig", price: 11.29, changePct: -5.47, currency: "BRL", domain: "marfrig.com.br", sector: "Alimentos", volume: 29.08, dayHigh: 11.47, dayLow: 11.09, weekChangePct: -5.77, spark: [100.0, 100.27, 98.22, 97.84, 97.96, 97.79, 96.33, 95.91, 95.0, 93.51, 94.24, 95.02, 94.28, 93.7, 94.43, 92.8, 91.51, 91.72, 89.39, 87.44] },
  { ticker: "BRFS3", name: "BRF", price: 18.74, changePct: -4.92, currency: "BRL", domain: "brf-global.com", sector: "Alimentos", volume: 40.11, dayHigh: 19.26, dayLow: 18.24, weekChangePct: -7.64, spark: [100.0, 100.61, 99.09, 97.91, 97.25, 96.31, 95.11, 94.05, 92.57, 90.86, 91.31, 89.92, 89.71, 89.39, 87.85, 86.71, 84.68, 83.12, 82.59, 80.66] },
  { ticker: "CIEL3", name: "Cielo", price: 5.18, changePct: -4.31, currency: "BRL", domain: "cielo.com.br", sector: "Pagamentos", volume: 40.29, dayHigh: 5.32, dayLow: 5.05, weekChangePct: -7.01, spark: [100.0, 98.82, 99.61, 100.09, 98.17, 96.53, 96.31, 97.5, 97.67, 98.19, 97.74, 96.77, 97.82, 97.56, 97.42, 96.19, 96.36, 95.13, 93.12, 93.0] },
  { ticker: "VIIA3", name: "Via", price: 1.84, changePct: -3.97, currency: "BRL", domain: "via.com.br", sector: "Varejo", volume: 20.06, dayHigh: 1.89, dayLow: 1.8, weekChangePct: -10.09, spark: [100.0, 100.52, 100.23, 101.04, 100.52, 100.96, 99.36, 98.06, 97.87, 96.06, 95.8, 95.25, 93.76, 93.14, 92.12, 92.72, 92.08, 92.91, 91.99, 92.23] },
  { ticker: "USIM5", name: "Usiminas PNA", price: 6.42, changePct: -3.55, currency: "BRL", domain: "usiminas.com", sector: "Siderurgia", volume: 52.82, dayHigh: 6.54, dayLow: 6.24, weekChangePct: -9.43, spark: [100.0, 99.71, 98.82, 98.53, 97.34, 95.84, 96.19, 95.64, 94.23, 93.38, 94.19, 93.82, 92.43, 92.57, 93.0, 92.3, 91.43, 89.41, 89.37, 87.76] },
  { ticker: "CSNA3", name: "CSN", price: 13.81, changePct: -3.12, currency: "BRL", domain: "csn.com.br", sector: "Siderurgia", volume: 45.08, dayHigh: 14.05, dayLow: 13.58, weekChangePct: -7.27, spark: [100.0, 98.07, 97.36, 97.0, 97.12, 95.76, 94.57, 93.78, 94.48, 94.85, 95.6, 96.17, 94.95, 95.9, 94.27, 93.22, 92.83, 91.97, 91.96, 90.42] },
  { ticker: "EMBR3", name: "Embraer", price: 28.94, changePct: -2.74, currency: "BRL", domain: "embraer.com", sector: "Aeroespacial", volume: 5.4, dayHigh: 29.74, dayLow: 28.08, weekChangePct: -6.33, spark: [100.0, 99.72, 100.61, 98.67, 98.13, 98.75, 98.31, 98.49, 98.64, 97.67, 96.5, 96.16, 96.41, 95.63, 95.55, 96.45, 94.51, 94.88, 95.11, 93.26] },
];

// ---------- EUA ----------
export const usGainers: Stock[] = [
  { ticker: "NVDA", name: "NVIDIA", price: 928.41, changePct: 6.84, currency: "USD", domain: "nvidia.com", sector: "Semicondutores", volume: 70.06, dayHigh: 948.19, dayLow: 905.59, weekChangePct: 2.07, spark: [100.0, 101.29, 101.22, 101.91, 103.11, 102.65, 103.38, 104.92, 105.18, 104.65, 106.4, 107.24, 107.51, 108.42, 108.57, 109.94, 110.13, 109.95, 111.07, 111.34] },
  { ticker: "TSLA", name: "Tesla", price: 248.92, changePct: 5.71, currency: "USD", domain: "tesla.com", sector: "Automotivo", volume: 53.34, dayHigh: 252.94, dayLow: 244.5, weekChangePct: 10.81, spark: [100.0, 99.27, 100.09, 100.21, 100.98, 102.02, 103.26, 104.53, 105.74, 106.6, 107.03, 107.99, 108.1, 107.42, 108.41, 109.35, 110.72, 112.23, 113.87, 113.67] },
  { ticker: "AMD", name: "Advanced Micro Devices", price: 167.38, changePct: 4.92, currency: "USD", domain: "amd.com", sector: "Semicondutores", volume: 77.11, dayHigh: 170.42, dayLow: 164.54, weekChangePct: 10.55, spark: [100.0, 102.32, 103.69, 104.77, 105.4, 106.59, 107.62, 109.21, 108.63, 110.38, 111.98, 111.44, 113.08, 113.11, 114.86, 115.1, 116.56, 117.09, 118.68, 119.16] },
  { ticker: "META", name: "Meta Platforms", price: 521.74, changePct: 4.18, currency: "USD", domain: "meta.com", sector: "Tecnologia", volume: 14.05, dayHigh: 527.82, dayLow: 512.56, weekChangePct: 6.6, spark: [100.0, 101.58, 101.7, 103.85, 103.33, 104.35, 104.4, 103.76, 105.32, 106.46, 106.96, 108.19, 107.67, 107.11, 106.58, 108.12, 107.89, 107.2, 106.43, 106.0] },
  { ticker: "AAPL", name: "Apple", price: 192.83, changePct: 3.74, currency: "USD", domain: "apple.com", sector: "Tecnologia", volume: 53.56, dayHigh: 194.06, dayLow: 190.19, weekChangePct: 4.47, spark: [100.0, 99.79, 99.17, 99.97, 100.64, 100.96, 101.83, 101.21, 102.88, 103.63, 102.84, 103.23, 104.04, 103.01, 103.58, 103.55, 104.13, 106.18, 106.67, 106.15] },
  { ticker: "MSFT", name: "Microsoft", price: 428.91, changePct: 3.21, currency: "USD", domain: "microsoft.com", sector: "Software", volume: 68.52, dayHigh: 440.46, dayLow: 417.74, weekChangePct: 4.19, spark: [100.0, 100.21, 100.25, 100.26, 100.71, 100.64, 102.15, 103.42, 102.92, 104.45, 105.3, 105.07, 105.3, 106.86, 108.4, 109.15, 109.73, 110.56, 110.17, 110.51] },
  { ticker: "GOOGL", name: "Alphabet", price: 174.62, changePct: 2.97, currency: "USD", domain: "abc.xyz", sector: "Tecnologia", volume: 46.78, dayHigh: 180.19, dayLow: 168.57, weekChangePct: 11.73, spark: [100.0, 100.99, 100.42, 101.8, 101.53, 101.39, 100.72, 101.4, 100.97, 100.28, 99.92, 99.9, 101.31, 101.77, 100.74, 101.77, 101.75, 102.21, 102.26, 101.6] },
  { ticker: "AMZN", name: "Amazon", price: 188.47, changePct: 2.64, currency: "USD", domain: "amazon.com", sector: "E-commerce", volume: 24.09, dayHigh: 192.64, dayLow: 183.65, weekChangePct: 2.07, spark: [100.0, 100.31, 99.24, 98.67, 98.37, 97.61, 97.1, 98.27, 100.03, 99.55, 98.39, 100.46, 101.29, 102.41, 101.47, 101.7, 102.84, 104.36, 105.76, 106.6] },
  { ticker: "AVGO", name: "Broadcom", price: 1842.18, changePct: 2.31, currency: "USD", domain: "broadcom.com", sector: "Semicondutores", volume: 32.87, dayHigh: 1867.49, dayLow: 1817.03, weekChangePct: 3.6, spark: [100.0, 100.31, 101.18, 101.43, 103.16, 102.67, 102.38, 103.82, 103.6, 104.31, 105.6, 107.47, 108.51, 110.24, 109.44, 109.68, 109.25, 109.69, 109.78, 111.03] },
  { ticker: "NFLX", name: "Netflix", price: 692.84, changePct: 2.08, currency: "USD", domain: "netflix.com", sector: "Streaming", volume: 69.41, dayHigh: 712.22, dayLow: 675.09, weekChangePct: 7.28, spark: [100.0, 100.92, 102.62, 104.21, 104.2, 103.4, 103.04, 103.27, 103.6, 103.35, 103.74, 103.17, 103.01, 103.14, 104.66, 103.63, 104.56, 105.89, 107.92, 108.03] },
];

export const usLosers: Stock[] = [
  { ticker: "BA", name: "Boeing", price: 168.42, changePct: -7.21, currency: "USD", domain: "boeing.com", sector: "Aeroespacial", volume: 13.03, dayHigh: 172.34, dayLow: 165.14, weekChangePct: -6.4, spark: [100.0, 99.43, 98.39, 98.5, 98.23, 98.27, 97.69, 97.01, 96.27, 94.55, 94.15, 92.81, 93.57, 93.6, 94.52, 93.3, 91.73, 89.93, 89.98, 88.47] },
  { ticker: "INTC", name: "Intel", price: 21.84, changePct: -6.48, currency: "USD", domain: "intel.com", sector: "Semicondutores", volume: 34.05, dayHigh: 22.22, dayLow: 21.38, weekChangePct: -5.06, spark: [100.0, 100.23, 99.92, 100.31, 100.86, 101.31, 100.8, 99.88, 100.51, 101.11, 99.71, 100.25, 98.26, 98.92, 99.32, 100.23, 99.18, 97.83, 97.16, 95.27] },
  { ticker: "F", name: "Ford Motor", price: 10.27, changePct: -5.83, currency: "USD", domain: "ford.com", sector: "Automotivo", volume: 20.39, dayHigh: 10.53, dayLow: 10.1, weekChangePct: -13.14, spark: [100.0, 100.36, 100.94, 99.52, 99.81, 99.91, 98.17, 96.66, 96.09, 95.9, 94.85, 93.0, 93.36, 91.36, 91.44, 91.12, 89.55, 89.53, 88.61, 86.48] },
  { ticker: "PFE", name: "Pfizer", price: 28.91, changePct: -4.92, currency: "USD", domain: "pfizer.com", sector: "Farma", volume: 7.28, dayHigh: 29.48, dayLow: 28.1, weekChangePct: -8.43, spark: [100.0, 99.14, 98.66, 97.71, 98.14, 98.2, 98.3, 97.56, 96.93, 95.21, 94.42, 94.04, 91.99, 91.46, 89.75, 87.52, 86.68, 86.43, 86.85, 85.68] },
  { ticker: "WBA", name: "Walgreens Boots", price: 9.18, changePct: -4.37, currency: "USD", domain: "walgreensbootsalliance.com", sector: "Saúde", volume: 69.53, dayHigh: 9.28, dayLow: 9.05, weekChangePct: -12.62, spark: [100.0, 99.9, 98.68, 98.12, 98.83, 99.03, 97.14, 97.53, 96.73, 96.8, 96.61, 96.74, 94.55, 93.21, 91.65, 92.74, 92.7, 92.93, 93.99, 93.56] },
  { ticker: "T", name: "AT&T", price: 17.42, changePct: -3.81, currency: "USD", domain: "att.com", sector: "Telecom", volume: 4.71, dayHigh: 17.67, dayLow: 17.24, weekChangePct: -6.29, spark: [100.0, 99.58, 99.25, 98.13, 97.78, 96.82, 95.79, 95.95, 95.02, 93.92, 92.86, 91.38, 91.07, 91.61, 92.29, 90.38, 90.99, 90.29, 89.59, 89.95] },
  { ticker: "KO", name: "Coca-Cola", price: 62.74, changePct: -3.18, currency: "USD", domain: "coca-cola.com", sector: "Bebidas", volume: 74.33, dayHigh: 64.44, dayLow: 61.37, weekChangePct: -3.02, spark: [100.0, 98.81, 99.46, 99.16, 99.49, 99.56, 98.09, 98.18, 98.21, 96.05, 95.96, 96.06, 96.45, 96.54, 97.44, 98.43, 97.0, 95.56, 95.75, 96.25] },
  { ticker: "DIS", name: "Walt Disney", price: 91.83, changePct: -2.84, currency: "USD", domain: "disney.com", sector: "Mídia", volume: 67.98, dayHigh: 93.36, dayLow: 90.4, weekChangePct: -3.06, spark: [100.0, 98.84, 98.52, 99.54, 99.31, 98.84, 98.25, 96.61, 96.43, 96.14, 95.25, 94.6, 93.1, 92.29, 92.43, 90.91, 90.19, 88.68, 87.41, 87.31] },
  { ticker: "NKE", name: "Nike", price: 74.62, changePct: -2.47, currency: "USD", domain: "nike.com", sector: "Vestuário", volume: 78.08, dayHigh: 75.47, dayLow: 73.62, weekChangePct: -5.49, spark: [100.0, 99.51, 98.49, 97.39, 97.36, 98.15, 97.02, 95.73, 95.16, 94.74, 92.45, 91.59, 90.29, 88.39, 88.88, 88.22, 88.76, 89.2, 89.53, 88.64] },
  { ticker: "MCD", name: "McDonald's", price: 268.91, changePct: -2.12, currency: "USD", domain: "mcdonalds.com", sector: "Alimentação", volume: 17.18, dayHigh: 272.35, dayLow: 263.46, weekChangePct: -11.06, spark: [100.0, 98.45, 98.7, 99.65, 100.1, 100.69, 99.23, 99.0, 97.48, 96.88, 96.64, 95.49, 93.59, 93.89, 92.62, 92.02, 90.65, 89.59, 90.42, 90.6] },
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

// ---------- PARAGUAY (BVA) ----------
export const pyGainers: Stock[] = [
  { ticker: "ASUN24", name: "Banco Atlas - Bono Corporativo", price: 102450, changePct: 4.82, currency: "PYG", domain: "atlas.com.py", sector: "Banca", volume: 1.84, dayHigh: 102800, dayLow: 101200, weekChangePct: 6.21, spark: [100, 100.5, 101.1, 100.9, 101.6, 102.1, 102.4, 102.9, 103.1, 103.5, 103.2, 103.8, 104.1, 104.4, 104.2, 104.6, 104.8, 104.9, 105.1, 104.82] },
  { ticker: "BNF25", name: "Banco Nacional de Fomento", price: 98750, changePct: 4.15, currency: "PYG", domain: "bnf.gov.py", sector: "Banca", volume: 0.92, dayHigh: 99100, dayLow: 97900, weekChangePct: 5.4, spark: [100, 100.4, 100.9, 101.3, 101.0, 101.7, 102.1, 102.5, 102.8, 103.1, 102.9, 103.4, 103.7, 103.9, 104.0, 104.1, 104.2, 104.0, 104.1, 104.15] },
  { ticker: "ITAU-PY", name: "Banco Itaú Paraguay - Bono", price: 51200, changePct: 3.74, currency: "PYG", domain: "itau.com.py", sector: "Banca", volume: 2.31, dayHigh: 51500, dayLow: 50900, weekChangePct: 4.9, spark: [100, 100.6, 101.2, 100.8, 101.4, 101.9, 102.2, 102.6, 102.4, 102.9, 103.0, 103.2, 103.4, 103.5, 103.6, 103.7, 103.6, 103.7, 103.74, 103.74] },
  { ticker: "RIEDR-PY", name: "Banco Rieder", price: 24800, changePct: 3.21, currency: "PYG", domain: "bancorieder.com.py", sector: "Banca", volume: 1.05, dayHigh: 24950, dayLow: 24600, weekChangePct: 4.1, spark: [100, 100.4, 100.8, 101.0, 101.3, 101.6, 101.9, 102.0, 102.2, 102.4, 102.6, 102.8, 102.9, 103.0, 103.1, 103.0, 103.1, 103.2, 103.21, 103.21] },
  { ticker: "TIGO-PY", name: "Tigo Paraguay - Bono Corp.", price: 45600, changePct: 2.94, currency: "PYG", domain: "tigo.com.py", sector: "Telecom", volume: 0.78, dayHigh: 45900, dayLow: 45200, weekChangePct: 3.55, spark: [100, 100.3, 100.7, 100.9, 101.2, 101.4, 101.7, 102.0, 102.1, 102.3, 102.5, 102.6, 102.7, 102.8, 102.9, 102.9, 102.94, 102.94, 102.94, 102.94] },
  { ticker: "COPACO", name: "COPACO S.A.", price: 18200, changePct: 2.61, currency: "PYG", domain: "copaco.com.py", sector: "Telecom", volume: 0.41, dayHigh: 18400, dayLow: 18050, weekChangePct: 3.12, spark: [100, 100.4, 100.8, 100.6, 101.1, 101.4, 101.6, 101.9, 102.0, 102.2, 102.3, 102.4, 102.5, 102.55, 102.6, 102.61, 102.61, 102.61, 102.61, 102.61] },
  { ticker: "SUDA", name: "Banco Sudameris - Bono", price: 67300, changePct: 2.34, currency: "PYG", domain: "sudameris.com.py", sector: "Banca", volume: 1.62, dayHigh: 67600, dayLow: 67000, weekChangePct: 2.95, spark: [100, 100.3, 100.6, 100.9, 101.2, 101.5, 101.7, 101.9, 102.0, 102.1, 102.2, 102.25, 102.3, 102.32, 102.34, 102.34, 102.34, 102.34, 102.34, 102.34] },
  { ticker: "ENERG-PY", name: "ENERGISA - Bono Corp.", price: 84500, changePct: 2.08, currency: "PYG", domain: "energisa.com.py", sector: "Energía", volume: 0.55, dayHigh: 84800, dayLow: 84200, weekChangePct: 2.7, spark: [100, 100.2, 100.5, 100.7, 101.0, 101.2, 101.4, 101.6, 101.8, 101.9, 102.0, 102.05, 102.08, 102.08, 102.08, 102.08, 102.08, 102.08, 102.08, 102.08] },
  { ticker: "VISION", name: "Banco Visión", price: 32100, changePct: 1.84, currency: "PYG", domain: "visionbanco.com", sector: "Banca", volume: 0.88, dayHigh: 32300, dayLow: 31900, weekChangePct: 2.2, spark: [100, 100.3, 100.5, 100.7, 100.9, 101.1, 101.3, 101.5, 101.6, 101.7, 101.8, 101.82, 101.84, 101.84, 101.84, 101.84, 101.84, 101.84, 101.84, 101.84] },
  { ticker: "CONTI-PY", name: "Banco Continental - Bono", price: 105800, changePct: 1.62, currency: "PYG", domain: "bancocontinental.com.py", sector: "Banca", volume: 1.41, dayHigh: 106100, dayLow: 105500, weekChangePct: 1.95, spark: [100, 100.2, 100.4, 100.6, 100.8, 101.0, 101.2, 101.3, 101.4, 101.5, 101.55, 101.6, 101.62, 101.62, 101.62, 101.62, 101.62, 101.62, 101.62, 101.62] },
];

export const pyLosers: Stock[] = [
  { ticker: "AGRO-PY", name: "Agro Silo Santa Catalina", price: 41200, changePct: -3.85, currency: "PYG", domain: "agrosilo.com.py", sector: "Agro", volume: 0.62, dayHigh: 42500, dayLow: 41000, weekChangePct: -5.2, spark: [100, 99.7, 99.4, 99.1, 98.8, 98.5, 98.1, 97.8, 97.5, 97.2, 96.9, 96.7, 96.5, 96.4, 96.3, 96.2, 96.18, 96.16, 96.15, 96.15] },
  { ticker: "FRIG-PY", name: "Frigorífico Concepción", price: 56400, changePct: -3.42, currency: "PYG", domain: "frigorifico-concepcion.com.py", sector: "Carne", volume: 1.18, dayHigh: 58200, dayLow: 56100, weekChangePct: -4.8, spark: [100, 99.6, 99.3, 99.0, 98.7, 98.3, 98.0, 97.7, 97.4, 97.2, 97.0, 96.85, 96.7, 96.65, 96.6, 96.58, 96.58, 96.58, 96.58, 96.58] },
  { ticker: "CERVE-PY", name: "Cervepar S.A.", price: 78900, changePct: -2.91, currency: "PYG", domain: "cervepar.com.py", sector: "Bebidas", volume: 0.74, dayHigh: 81200, dayLow: 78600, weekChangePct: -3.7, spark: [100, 99.7, 99.4, 99.2, 98.9, 98.6, 98.4, 98.2, 98.0, 97.8, 97.6, 97.4, 97.25, 97.15, 97.1, 97.09, 97.09, 97.09, 97.09, 97.09] },
  { ticker: "INC-PY", name: "Industria Nacional del Cemento", price: 92300, changePct: -2.56, currency: "PYG", domain: "inc.gov.py", sector: "Cemento", volume: 0.43, dayHigh: 94600, dayLow: 92000, weekChangePct: -3.4, spark: [100, 99.7, 99.4, 99.1, 98.9, 98.6, 98.4, 98.2, 98.0, 97.8, 97.7, 97.55, 97.5, 97.46, 97.44, 97.44, 97.44, 97.44, 97.44, 97.44] },
  { ticker: "ARS-PY", name: "Aseguradora del Sur", price: 23800, changePct: -2.18, currency: "PYG", domain: "asegduradora.com.py", sector: "Seguros", volume: 0.31, dayHigh: 24400, dayLow: 23700, weekChangePct: -2.9, spark: [100, 99.8, 99.6, 99.4, 99.2, 99.0, 98.8, 98.6, 98.4, 98.2, 98.0, 97.95, 97.9, 97.85, 97.82, 97.82, 97.82, 97.82, 97.82, 97.82] },
  { ticker: "PETRO-PY", name: "Petropar - Bono", price: 67500, changePct: -1.94, currency: "PYG", domain: "petropar.gov.py", sector: "Energía", volume: 0.58, dayHigh: 68900, dayLow: 67300, weekChangePct: -2.6, spark: [100, 99.8, 99.6, 99.4, 99.2, 99.0, 98.8, 98.6, 98.4, 98.3, 98.2, 98.1, 98.08, 98.06, 98.06, 98.06, 98.06, 98.06, 98.06, 98.06] },
  { ticker: "PARMA", name: "Parmalat Paraguay", price: 19400, changePct: -1.71, currency: "PYG", domain: "parmalat.com.py", sector: "Lácteos", volume: 0.27, dayHigh: 19800, dayLow: 19350, weekChangePct: -2.3, spark: [100, 99.8, 99.6, 99.4, 99.2, 99.0, 98.85, 98.7, 98.55, 98.45, 98.35, 98.3, 98.29, 98.29, 98.29, 98.29, 98.29, 98.29, 98.29, 98.29] },
  { ticker: "INDUS-PY", name: "Inversora Industrial", price: 34600, changePct: -1.48, currency: "PYG", domain: "inversoraindustrial.com.py", sector: "Industria", volume: 0.22, dayHigh: 35200, dayLow: 34500, weekChangePct: -1.9, spark: [100, 99.85, 99.7, 99.55, 99.4, 99.25, 99.1, 99.0, 98.9, 98.8, 98.7, 98.6, 98.55, 98.52, 98.52, 98.52, 98.52, 98.52, 98.52, 98.52] },
  { ticker: "CHACO", name: "Bco. Regional Chaco - Bono", price: 88200, changePct: -1.27, currency: "PYG", domain: "bancoregional.com.py", sector: "Banca", volume: 0.91, dayHigh: 89400, dayLow: 88100, weekChangePct: -1.6, spark: [100, 99.9, 99.8, 99.7, 99.6, 99.5, 99.4, 99.3, 99.2, 99.1, 99.0, 98.9, 98.85, 98.8, 98.75, 98.73, 98.73, 98.73, 98.73, 98.73] },
  { ticker: "AERO-PY", name: "Líneas Aéreas Paraguayas", price: 12800, changePct: -1.04, currency: "PYG", domain: "lap.com.py", sector: "Aviación", volume: 0.18, dayHigh: 13050, dayLow: 12750, weekChangePct: -1.4, spark: [100, 99.9, 99.8, 99.7, 99.6, 99.5, 99.45, 99.4, 99.35, 99.3, 99.2, 99.1, 99.0, 98.97, 98.96, 98.96, 98.96, 98.96, 98.96, 98.96] },
];

// Índices Paraguay (BVA + economía)
export const pyIndices: IndexQuote[] = [
  { symbol: "BVA-IDX", name: "Índice General BVA", value: 1842.31, changePct: 1.18, region: "PY" },
  { symbol: "BVA-BNK", name: "Subíndice Bancario BVA", value: 2104.78, changePct: 1.42, region: "PY" },
  { symbol: "BVA-CORP", name: "Bonos Corporativos PY", value: 987.45, changePct: 0.84, region: "PY" },
  { symbol: "TPM-PY", name: "Tasa Política Monetaria BCP", value: 6.0, changePct: 0.0, region: "PY" },
  { symbol: "USDPYG", name: "Dólar / Guaraní", value: 7480.0, changePct: -0.24, region: "FX" },
  { symbol: "BRLPYG", name: "Real / Guaraní", value: 1294.5, changePct: 0.18, region: "FX" },
  { symbol: "ARSPYG", name: "Peso Argentino / Guaraní", value: 7.42, changePct: -0.62, region: "FX" },
  { symbol: "SOJA", name: "Soja CBOT (USD/bushel)", value: 1042.5, changePct: 1.84, region: "FX" },
  { symbol: "BTCUSD", name: "Bitcoin / Dólar", value: 94287.41, changePct: 2.84, region: "FX" },
];

export const pyNews: NewsItem[] = [
  {
    id: "py1",
    title: "BCP mantiene la Tasa de Política Monetaria en 6,00%",
    source: "ABC Color",
    publishedAt: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    url: "#",
    region: "PY",
    summary:
      "El Comité de Política Monetaria del Banco Central del Paraguay decidió mantener la TPM y reforzó la vigilancia sobre la inflación de servicios.",
  },
  {
    id: "py2",
    title: "BVA registra récord histórico de operaciones en bonos corporativos",
    source: "La Nación PY",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    url: "#",
    region: "PY",
    summary:
      "El volumen negociado en la Bolsa de Valores y Productos de Asunción superó los Gs. 1,2 billones en el trimestre.",
  },
  {
    id: "py3",
    title: "Exportación de soja crece 12% impulsada por demanda china",
    source: "Última Hora",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    url: "#",
    region: "PY",
    summary:
      "El complejo sojero paraguayo cierra el primer cuatrimestre con cifras récord, fortaleciendo las reservas internacionales.",
  },
  {
    id: "py4",
    title: "Itaipú: nuevos ingresos para Paraguay tras revisión del Anexo C",
    source: "5Días",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    url: "#",
    region: "PY",
    summary:
      "El gobierno paraguayo anuncia mayor recaudación por la binacional, con impacto positivo en cuentas fiscales.",
  },
  {
    id: "py5",
    title: "Guaraní se aprecia frente al dólar tras flujo de exportaciones",
    source: "Diario HOY",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    url: "#",
    region: "PY",
    summary:
      "El tipo de cambio cierra la semana en Gs. 7.480 por dólar, con caída de 0,24% en la jornada.",
  },
  {
    id: "py6",
    title: "Standard & Poor's mantiene calificación de Paraguay en BB+",
    source: "MarketData PY",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    url: "#",
    region: "PY",
    summary:
      "La agencia destaca la disciplina fiscal y el crecimiento sostenido, manteniendo perspectiva estable.",
  },
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

// ---------- EUROPE (UK + EU) ----------
export const euGainers: Stock[] = [
  { ticker: "ASML.AS", name: "ASML Holding", price: 712.4, changePct: 5.84, currency: "EUR", domain: "asml.com", sector: "Semiconductors", volume: 3.21, dayHigh: 718.2, dayLow: 689.5, weekChangePct: 8.12, spark: [100, 100.8, 101.4, 102.0, 102.7, 103.5, 103.1, 103.9, 104.6, 105.4, 106.1, 106.8, 107.2, 107.6, 107.9, 108.1, 108.0, 107.8, 108.0, 108.12] },
  { ticker: "SAP.DE", name: "SAP SE", price: 198.74, changePct: 4.12, currency: "EUR", domain: "sap.com", sector: "Software", volume: 4.18, dayHigh: 200.4, dayLow: 195.1, weekChangePct: 6.34, spark: [100, 100.5, 101.1, 101.8, 102.4, 103.0, 103.6, 103.4, 104.0, 104.5, 105.0, 105.4, 105.8, 106.0, 106.2, 106.3, 106.34, 106.34, 106.34, 106.34] },
  { ticker: "MC.PA", name: "LVMH", price: 712.5, changePct: 3.78, currency: "EUR", domain: "lvmh.com", sector: "Luxury", volume: 1.87, dayHigh: 715.8, dayLow: 702.4, weekChangePct: 5.21, spark: [100, 100.4, 100.9, 101.3, 101.8, 102.4, 102.9, 103.2, 103.6, 104.0, 104.3, 104.6, 104.9, 105.1, 105.21, 105.21, 105.21, 105.21, 105.21, 105.21] },
  { ticker: "OR.PA", name: "L'Oréal", price: 412.85, changePct: 3.42, currency: "EUR", domain: "loreal.com", sector: "Consumer Goods", volume: 1.42, dayHigh: 415.2, dayLow: 408.1, weekChangePct: 4.85, spark: [100, 100.3, 100.7, 101.1, 101.5, 101.9, 102.3, 102.7, 103.0, 103.4, 103.7, 104.0, 104.3, 104.5, 104.7, 104.85, 104.85, 104.85, 104.85, 104.85] },
  { ticker: "SHEL.L", name: "Shell plc", price: 28.42, changePct: 3.18, currency: "GBP", domain: "shell.com", sector: "Energy", volume: 22.41, dayHigh: 28.6, dayLow: 27.9, weekChangePct: 4.62, spark: [100, 100.4, 100.7, 101.1, 101.5, 101.9, 102.2, 102.5, 102.8, 103.1, 103.4, 103.7, 104.0, 104.2, 104.4, 104.55, 104.6, 104.62, 104.62, 104.62] },
  { ticker: "AZN.L", name: "AstraZeneca", price: 124.18, changePct: 2.94, currency: "GBP", domain: "astrazeneca.com", sector: "Pharmaceuticals", volume: 4.62, dayHigh: 125.4, dayLow: 121.8, weekChangePct: 3.81, spark: [100, 100.3, 100.6, 100.9, 101.2, 101.5, 101.8, 102.1, 102.4, 102.7, 103.0, 103.2, 103.4, 103.6, 103.7, 103.8, 103.81, 103.81, 103.81, 103.81] },
  { ticker: "SIE.DE", name: "Siemens AG", price: 218.4, changePct: 2.71, currency: "EUR", domain: "siemens.com", sector: "Industrials", volume: 2.41, dayHigh: 220.1, dayLow: 215.6, weekChangePct: 3.52, spark: [100, 100.3, 100.6, 100.9, 101.2, 101.5, 101.8, 102.0, 102.3, 102.6, 102.9, 103.1, 103.3, 103.4, 103.5, 103.52, 103.52, 103.52, 103.52, 103.52] },
  { ticker: "NESN.SW", name: "Nestlé", price: 92.84, changePct: 2.45, currency: "EUR", domain: "nestle.com", sector: "Consumer Staples", volume: 5.82, dayHigh: 93.6, dayLow: 91.4, weekChangePct: 2.94, spark: [100, 100.2, 100.4, 100.7, 100.9, 101.2, 101.5, 101.7, 101.9, 102.1, 102.3, 102.5, 102.7, 102.85, 102.9, 102.94, 102.94, 102.94, 102.94, 102.94] },
  { ticker: "HSBA.L", name: "HSBC Holdings", price: 7.84, changePct: 2.18, currency: "GBP", domain: "hsbc.com", sector: "Banking", volume: 38.42, dayHigh: 7.91, dayLow: 7.71, weekChangePct: 2.84, spark: [100, 100.2, 100.4, 100.6, 100.8, 101.0, 101.2, 101.4, 101.6, 101.8, 102.0, 102.2, 102.4, 102.6, 102.7, 102.8, 102.84, 102.84, 102.84, 102.84] },
  { ticker: "BARC.L", name: "Barclays", price: 2.74, changePct: 1.92, currency: "GBP", domain: "barclays.com", sector: "Banking", volume: 41.18, dayHigh: 2.78, dayLow: 2.71, weekChangePct: 2.41, spark: [100, 100.2, 100.4, 100.5, 100.7, 100.9, 101.1, 101.3, 101.5, 101.7, 101.9, 102.0, 102.2, 102.3, 102.4, 102.41, 102.41, 102.41, 102.41, 102.41] },
];

export const euLosers: Stock[] = [
  { ticker: "ADYEN.AS", name: "Adyen", price: 1284.5, changePct: -6.12, currency: "EUR", domain: "adyen.com", sector: "Payments", volume: 0.41, dayHigh: 1342.0, dayLow: 1278.0, weekChangePct: -8.41, spark: [100, 99.6, 99.2, 98.8, 98.4, 98.0, 97.6, 97.2, 96.8, 96.4, 96.0, 95.6, 95.2, 94.8, 94.4, 94.0, 93.7, 93.5, 93.4, 93.88] },
  { ticker: "BMW.DE", name: "BMW Group", price: 78.42, changePct: -4.84, currency: "EUR", domain: "bmw.com", sector: "Automotive", volume: 3.18, dayHigh: 81.2, dayLow: 77.9, weekChangePct: -6.91, spark: [100, 99.7, 99.4, 99.0, 98.7, 98.3, 98.0, 97.6, 97.3, 96.9, 96.5, 96.1, 95.7, 95.3, 94.9, 94.5, 94.1, 93.6, 93.2, 93.09] },
  { ticker: "STLAM.MI", name: "Stellantis", price: 12.84, changePct: -4.21, currency: "EUR", domain: "stellantis.com", sector: "Automotive", volume: 18.41, dayHigh: 13.4, dayLow: 12.78, weekChangePct: -7.18, spark: [100, 99.7, 99.4, 99.1, 98.8, 98.5, 98.1, 97.7, 97.3, 96.9, 96.5, 96.1, 95.7, 95.3, 94.9, 94.5, 94.0, 93.5, 93.0, 92.82] },
  { ticker: "DTE.DE", name: "Deutsche Telekom", price: 28.91, changePct: -3.74, currency: "EUR", domain: "telekom.com", sector: "Telecom", volume: 8.41, dayHigh: 29.84, dayLow: 28.74, weekChangePct: -4.92, spark: [100, 99.8, 99.5, 99.2, 98.9, 98.6, 98.3, 98.0, 97.7, 97.4, 97.1, 96.8, 96.5, 96.2, 95.9, 95.6, 95.3, 95.1, 95.08, 95.08] },
  { ticker: "GLEN.L", name: "Glencore", price: 4.12, changePct: -3.42, currency: "GBP", domain: "glencore.com", sector: "Mining", volume: 28.41, dayHigh: 4.26, dayLow: 4.09, weekChangePct: -5.18, spark: [100, 99.8, 99.5, 99.2, 98.9, 98.6, 98.3, 98.0, 97.7, 97.4, 97.1, 96.8, 96.5, 96.2, 95.8, 95.4, 95.1, 94.9, 94.82, 94.82] },
  { ticker: "ULVR.L", name: "Unilever", price: 42.18, changePct: -2.84, currency: "GBP", domain: "unilever.com", sector: "Consumer Goods", volume: 4.18, dayHigh: 43.4, dayLow: 41.9, weekChangePct: -3.62, spark: [100, 99.8, 99.6, 99.4, 99.2, 99.0, 98.8, 98.5, 98.2, 97.9, 97.6, 97.3, 97.0, 96.8, 96.6, 96.4, 96.38, 96.38, 96.38, 96.38] },
  { ticker: "BAS.DE", name: "BASF SE", price: 41.78, changePct: -2.61, currency: "EUR", domain: "basf.com", sector: "Chemicals", volume: 4.92, dayHigh: 42.9, dayLow: 41.5, weekChangePct: -4.18, spark: [100, 99.8, 99.6, 99.3, 99.0, 98.7, 98.4, 98.1, 97.8, 97.5, 97.2, 96.9, 96.6, 96.3, 96.0, 95.85, 95.82, 95.82, 95.82, 95.82] },
  { ticker: "BP.L", name: "BP plc", price: 4.78, changePct: -2.34, currency: "GBP", domain: "bp.com", sector: "Energy", volume: 41.84, dayHigh: 4.89, dayLow: 4.74, weekChangePct: -3.41, spark: [100, 99.8, 99.6, 99.4, 99.2, 99.0, 98.8, 98.6, 98.4, 98.2, 98.0, 97.8, 97.6, 97.4, 97.2, 97.0, 96.85, 96.59, 96.59, 96.59] },
  { ticker: "BAYN.DE", name: "Bayer AG", price: 22.18, changePct: -2.12, currency: "EUR", domain: "bayer.com", sector: "Pharmaceuticals", volume: 6.42, dayHigh: 22.74, dayLow: 22.04, weekChangePct: -2.94, spark: [100, 99.85, 99.7, 99.5, 99.3, 99.1, 98.9, 98.7, 98.5, 98.3, 98.1, 97.95, 97.85, 97.75, 97.7, 97.65, 97.62, 97.06, 97.06, 97.88] },
  { ticker: "VOW3.DE", name: "Volkswagen", price: 102.84, changePct: -1.92, currency: "EUR", domain: "volkswagen.com", sector: "Automotive", volume: 1.84, dayHigh: 105.4, dayLow: 102.4, weekChangePct: -2.81, spark: [100, 99.9, 99.7, 99.5, 99.3, 99.1, 98.9, 98.7, 98.5, 98.3, 98.1, 97.95, 97.85, 97.75, 97.65, 97.55, 97.5, 97.19, 97.19, 97.19] },
];

// Global indices (for EN ticker + indices tab)
export const globalIndices: IndexQuote[] = [
  { symbol: "SPX", name: "S&P 500", value: 5847.21, changePct: 0.92, region: "US" },
  { symbol: "NDX", name: "Nasdaq 100", value: 20384.74, changePct: 1.41, region: "US" },
  { symbol: "DJI", name: "Dow Jones", value: 42891.38, changePct: 0.58, region: "US" },
  { symbol: "FTSE", name: "FTSE 100 (London)", value: 8412.74, changePct: 0.41, region: "UK" },
  { symbol: "DAX", name: "DAX 40 (Frankfurt)", value: 19284.51, changePct: 0.84, region: "EU" },
  { symbol: "CAC", name: "CAC 40 (Paris)", value: 7841.28, changePct: 0.62, region: "EU" },
  { symbol: "STOXX", name: "STOXX Europe 600", value: 528.74, changePct: 0.71, region: "EU" },
  { symbol: "IBEX", name: "IBEX 35 (Madrid)", value: 11842.5, changePct: 0.34, region: "EU" },
  { symbol: "FTMIB", name: "FTSE MIB (Milan)", value: 34721.84, changePct: 0.52, region: "EU" },
  { symbol: "N225", name: "Nikkei 225 (Tokyo)", value: 39418.72, changePct: -0.34, region: "GLOBAL" },
  { symbol: "HSI", name: "Hang Seng (Hong Kong)", value: 19842.51, changePct: 1.12, region: "GLOBAL" },
  { symbol: "EURUSD", name: "Euro / Dollar", value: 1.082, changePct: 0.21, region: "FX" },
  { symbol: "GBPUSD", name: "Pound / Dollar", value: 1.274, changePct: 0.18, region: "FX" },
  { symbol: "GOLD", name: "Gold (USD/oz)", value: 2842.41, changePct: 0.92, region: "FX" },
  { symbol: "BRENT", name: "Brent Crude (USD/bbl)", value: 84.21, changePct: -0.42, region: "FX" },
  { symbol: "BTCUSD", name: "Bitcoin / Dollar", value: 94287.41, changePct: 2.84, region: "FX" },
];

export const globalNews: NewsItem[] = [
  {
    id: "g1",
    title: "ECB holds rates as inflation drifts toward target",
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    url: "#",
    region: "EU",
    summary: "Lagarde signals data-dependent path; markets price first cut for Q3 as services inflation moderates.",
  },
  {
    id: "g2",
    title: "FTSE 100 hits fresh all-time high led by miners and energy",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    url: "#",
    region: "UK",
    summary: "London's blue-chip benchmark extends rally as commodity exporters benefit from a weaker pound.",
  },
  {
    id: "g3",
    title: "Bank of England signals patience on rate cuts",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    url: "#",
    region: "UK",
    summary: "MPC remains cautious as wage growth stays elevated; sterling firms against the dollar.",
  },
  {
    id: "g4",
    title: "ASML beats expectations as AI fuels chip equipment demand",
    source: "Handelsblatt",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    url: "#",
    region: "EU",
    summary: "Dutch chip-tool maker raises full-year guidance, reinforcing Europe's role in global semiconductor supply.",
  },
  {
    id: "g5",
    title: "DAX hits record as German industrial sentiment rebounds",
    source: "Frankfurter Allgemeine",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    url: "#",
    region: "EU",
    summary: "Ifo index surprises to the upside; Frankfurt-listed exporters lead the rally.",
  },
  {
    id: "g6",
    title: "LVMH posts solid quarter as Asian demand stabilizes",
    source: "Le Monde",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    url: "#",
    region: "EU",
    summary: "European luxury bellwether reassures investors on margins and Chinese mainland traffic.",
  },
  {
    id: "g7",
    title: "Shell, BP rally as Brent stabilizes above $80",
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    url: "#",
    region: "UK",
    summary: "London oil majors lead FTSE gains amid renewed geopolitical premium and OPEC+ discipline.",
  },
  {
    id: "g8",
    title: "Global markets diverge as Fed and ECB chart different paths",
    source: "Wall Street Journal",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    url: "#",
    region: "GLOBAL",
    summary: "Cross-asset volatility climbs as central bank divergence reshapes global capital flows.",
  },
];