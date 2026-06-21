import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

/**
 * Indicadores econômicos oficiais (Banco Central do Brasil — SGS).
 * API pública, JSON, CORS habilitado. Sem dados estáticos.
 * Códigos SGS:
 *  - 432  Meta Selic (% a.a.)
 *  - 4389 CDI acumulado no mês anualizado (% a.a.) — proxy diário do CDI
 *  - 433  IPCA mensal (%)
 *  - 189  IGP-M mensal (%)
 */

type Indicator = {
  code: number;
  label: string;
  unit: string;
  helper: string;
};

const INDICATORS: Indicator[] = [
  { code: 432, label: "Selic", unit: "% a.a.", helper: "Meta — Copom" },
  { code: 4389, label: "CDI", unit: "% a.a.", helper: "Acumulado anualizado" },
  { code: 433, label: "IPCA", unit: "% mês", helper: "Variação mensal" },
  { code: 189, label: "IGP-M", unit: "% mês", helper: "Variação mensal" },
];

type Reading = { value: number; date: string } | { error: true };

const CACHE_KEY = "sac-bcb-indicators-v1";
const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12h

type CacheShape = { fetchedAt: number; data: Record<number, { value: number; date: string }> };

const readCache = (): CacheShape | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    if (!parsed || typeof parsed.fetchedAt !== "number") return null;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeCache = (data: Record<number, { value: number; date: string }>) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), data }));
  } catch {
    /* ignore quota errors */
  }
};

const fetchSeries = async (code: number, signal: AbortSignal): Promise<{ value: number; date: string }> => {
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${code}/dados/ultimos/1?formato=json`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`BCB ${code} HTTP ${res.status}`);
  const arr = (await res.json()) as Array<{ data: string; valor: string }>;
  if (!Array.isArray(arr) || arr.length === 0) throw new Error(`BCB ${code} empty`);
  const last = arr[arr.length - 1];
  const value = Number.parseFloat(last.valor.replace(",", "."));
  if (!Number.isFinite(value)) throw new Error(`BCB ${code} NaN`);
  return { value, date: last.data };
};

const fmtDate = (br: string) => {
  // BCB returns dd/mm/yyyy
  const [d, m, y] = br.split("/");
  if (!d || !m || !y) return br;
  return `${d}/${m}/${y}`;
};

const BcbIndicators = () => {
  const [readings, setReadings] = useState<Record<number, Reading>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    const cached = readCache();
    if (cached) {
      const next: Record<number, Reading> = {};
      for (const ind of INDICATORS) {
        const v = cached.data[ind.code];
        if (v) next[ind.code] = v;
      }
      setReadings(next);
      setLoading(false);
    }
    (async () => {
      try {
        const results = await Promise.allSettled(INDICATORS.map((i) => fetchSeries(i.code, ctrl.signal)));
        const next: Record<number, Reading> = {};
        const cacheable: Record<number, { value: number; date: string }> = {};
        results.forEach((r, idx) => {
          const code = INDICATORS[idx].code;
          if (r.status === "fulfilled") {
            next[code] = r.value;
            cacheable[code] = r.value;
          } else {
            // eslint-disable-next-line no-console
            console.warn("[BCB] falha ao carregar série", code, r.reason);
            next[code] = { error: true };
          }
        });
        setReadings((prev) => ({ ...prev, ...next }));
        if (Object.keys(cacheable).length) writeCache(cacheable);
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  return (
    <div>
      <div className="flex items-end justify-between gap-6 mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-luxury text-gold">Indicadores oficiais</div>
          <h2 className="font-serif text-2xl md:text-3xl mt-2">Banco Central do Brasil</h2>
          <p className="text-xs text-muted-foreground mt-2">
            Atualização automática diária — fonte: api.bcb.gov.br (SGS)
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {INDICATORS.map((ind) => {
          const r = readings[ind.code];
          const isError = !r || ("error" in r && r.error);
          const positive = !isError && (r as { value: number }).value >= 0;
          return (
            <div key={ind.code} className="border border-border/60 p-5">
              <div className="text-[10px] uppercase tracking-luxury text-muted-foreground">
                {ind.label}
              </div>
              {isError ? (
                <div className="mt-3 text-xs text-muted-foreground leading-snug">
                  {loading
                    ? "Carregando…"
                    : "Dado temporariamente indisponível. Atualização em andamento."}
                </div>
              ) : (
                <>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <div className="font-mono text-xl">
                      {(r as { value: number }).value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-[10px] ${
                        positive ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {ind.unit}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-luxury text-muted-foreground">
                    {ind.helper} · {fmtDate((r as { date: string }).date)}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BcbIndicators;
