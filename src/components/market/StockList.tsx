import { useMemo, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpDown, ArrowUpRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type Stock } from "@/data/market";
import StockLogo from "./StockLogo";
import Sparkline from "./Sparkline";
import { fmtPct, fmtPrice, fmtVolume } from "./format";
import { useLang } from "@/i18n/LanguageContext";

type SortKey = "rank" | "price" | "changePct" | "volume" | "weekChangePct";

const headers: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "rank", label: "#", align: "left" },
  { key: "price", label: "Preço", align: "right" },
  { key: "changePct", label: "Dia", align: "right" },
  { key: "weekChangePct", label: "Semana", align: "right" },
  { key: "volume", label: "Volume", align: "right" },
];

const Trend = ({ value }: { value: number }) => {
  const positive = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono text-sm ${
        positive ? "text-emerald-500" : "text-red-500"
      }`}
    >
      {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
      {fmtPct(value)}
    </span>
  );
};

const StockList = ({ rows, kind }: { rows: Stock[]; kind: "up" | "down" }) => {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const positive = kind === "up";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = rows.map((r, i) => ({ ...r, _rank: i + 1 }));
    const f = q
      ? base.filter(
          (r) =>
            r.ticker.toLowerCase().includes(q) ||
            r.name.toLowerCase().includes(q) ||
            r.sector?.toLowerCase().includes(q),
        )
      : base;
    if (sortKey === "rank") {
      return sortDir === "asc" ? f : [...f].reverse();
    }
    const sorted = [...f].sort((a, b) => {
      const av = (a[sortKey as keyof Stock] as number) ?? 0;
      const bv = (b[sortKey as keyof Stock] as number) ?? 0;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return sorted;
  }, [rows, query, sortKey, sortDir]);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir(k === "rank" ? "asc" : "desc");
    }
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.market.searchPlaceholder}
          className="pl-9 h-10 text-sm rounded-none border-border/60 bg-transparent focus-visible:ring-0 focus-visible:border-gold/60"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-[10px] uppercase tracking-luxury text-muted-foreground">
              <th className="text-left font-normal py-3 px-4 w-10">
                <button onClick={() => toggleSort("rank")} className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                  # <SortIcon k="rank" />
                </button>
              </th>
              <th className="text-left font-normal py-3 px-4">{t.market.colAsset}</th>
              <th className="text-left font-normal py-3 px-4 hidden lg:table-cell">7d</th>
              <th className="text-right font-normal py-3 px-4">
                <button onClick={() => toggleSort("price")} className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                  {t.market.colPrice} <SortIcon k="price" />
                </button>
              </th>
              <th className="text-right font-normal py-3 px-4">
                <button onClick={() => toggleSort("changePct")} className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                  {t.market.colDay} <SortIcon k="changePct" />
                </button>
              </th>
              <th className="text-right font-normal py-3 px-4 hidden lg:table-cell">
                <button onClick={() => toggleSort("weekChangePct")} className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                  {t.market.colWeek} <SortIcon k="weekChangePct" />
                </button>
              </th>
              <th className="text-right font-normal py-3 px-4 hidden xl:table-cell">{t.market.colRange}</th>
              <th className="text-right font-normal py-3 px-4 hidden lg:table-cell">
                <button onClick={() => toggleSort("volume")} className="inline-flex items-center gap-1 hover:text-foreground transition-colors ml-auto">
                  {t.market.colVolume} <SortIcon k="volume" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.ticker}
                className="border-b border-border/40 last:border-0 hover:bg-foreground/[0.02] transition-colors"
              >
                <td className="py-4 px-4 text-muted-foreground font-mono text-xs">{s._rank}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <StockLogo ticker={s.ticker} name={s.name} domain={s.domain} />
                    <div className="min-w-0">
                      <div className="font-mono text-sm tracking-wide">{s.ticker}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate">{s.name}</div>
                      {s.sector && (
                        <div className="text-[10px] uppercase tracking-luxury text-muted-foreground/70 mt-0.5">
                          {s.sector}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 hidden lg:table-cell">
                  {s.spark && <Sparkline points={s.spark} positive={positive} />}
                </td>
                <td className="py-4 px-4 text-right font-mono">{fmtPrice(s.price, s.currency)}</td>
                <td className="py-4 px-4 text-right">
                  <Trend value={s.changePct} />
                </td>
                <td className="py-4 px-4 text-right hidden lg:table-cell">
                  {s.weekChangePct !== undefined && <Trend value={s.weekChangePct} />}
                </td>
                <td className="py-4 px-4 text-right hidden xl:table-cell font-mono text-xs text-muted-foreground">
                  {s.dayLow !== undefined && s.dayHigh !== undefined
                    ? `${fmtPrice(s.dayLow, s.currency)} · ${fmtPrice(s.dayHigh, s.currency)}`
                    : "—"}
                </td>
                <td className="py-4 px-4 text-right hidden lg:table-cell font-mono text-xs text-muted-foreground">
                  {s.volume !== undefined ? fmtVolume(s.volume) : "—"}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-sm text-muted-foreground">
                  {t.market.empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {filtered.map((s) => (
          <div key={s.ticker} className="border border-border/60 p-4 hover:border-gold/40 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <span className="font-mono text-[10px] text-muted-foreground mt-1.5 w-5">{s._rank}</span>
                <StockLogo ticker={s.ticker} name={s.name} domain={s.domain} size="sm" />
                <div className="min-w-0">
                  <div className="font-mono text-sm tracking-wide">{s.ticker}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">{s.name}</div>
                  {s.sector && (
                    <div className="text-[10px] uppercase tracking-luxury text-muted-foreground/70 mt-1">
                      {s.sector}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-sm">{fmtPrice(s.price, s.currency)}</div>
                <div className="mt-1">
                  <Trend value={s.changePct} />
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-end justify-between gap-3 pt-3 border-t border-border/40">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] uppercase tracking-luxury text-muted-foreground">
                <span>{t.market.week}</span>
                <span className="text-right text-foreground font-mono normal-case tracking-normal text-xs">
                  {s.weekChangePct !== undefined ? fmtPct(s.weekChangePct) : "—"}
                </span>
                <span>{t.market.colVolume}</span>
                <span className="text-right text-foreground font-mono normal-case tracking-normal text-xs">
                  {s.volume !== undefined ? fmtVolume(s.volume) : "—"}
                </span>
              </div>
              {s.spark && <Sparkline points={s.spark} positive={positive} width={80} height={28} />}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="border border-border/60 py-12 text-center text-sm text-muted-foreground">
            {t.market.empty}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockList;