export const fmtPrice = (v: number, currency: "BRL" | "USD" | "PYG") => {
  const locale =
    currency === "BRL" ? "pt-BR" : currency === "PYG" ? "es-PY" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "PYG" ? 0 : 2,
  }).format(v);
};

export const fmtPct = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;

export const fmtIndex = (v: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(v);

export const fmtVolume = (v: number) => {
  if (v >= 1000) return `${(v / 1000).toFixed(2)}B`;
  return `${v.toFixed(2)}M`;
};

export const fmtTime = (iso: string, lang: "pt" | "es" = "pt") => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  const prefix = lang === "es" ? "hace" : "há";
  if (mins < 60) return `${prefix} ${mins} min`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${prefix} ${hrs} h`;
  return new Date(iso).toLocaleDateString(lang === "es" ? "es-PY" : "pt-BR");
};