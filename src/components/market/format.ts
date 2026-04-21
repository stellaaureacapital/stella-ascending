export const fmtPrice = (v: number, currency: "BRL" | "USD") =>
  new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(v);

export const fmtPct = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;

export const fmtIndex = (v: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(v);

export const fmtVolume = (v: number) => {
  if (v >= 1000) return `${(v / 1000).toFixed(2)}B`;
  return `${v.toFixed(2)}M`;
};

export const fmtTime = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `há ${mins} min`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `há ${hrs} h`;
  return new Date(iso).toLocaleDateString("pt-BR");
};