import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { type IndexQuote } from "@/data/market";
import { fmtIndex, fmtPct } from "./format";

const IndexTicker = ({ items }: { items: IndexQuote[] }) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-foreground/[0.015]">
      <div className="flex gap-10 py-3 animate-[ticker_60s_linear_infinite] whitespace-nowrap">
        {doubled.map((q, i) => {
          const positive = q.changePct >= 0;
          return (
            <div key={`${q.symbol}-${i}`} className="flex items-center gap-3 text-xs font-mono">
              <span className="text-muted-foreground tracking-wider">{q.symbol}</span>
              <span className="text-foreground">{fmtIndex(q.value)}</span>
              <span className={`inline-flex items-center gap-0.5 ${positive ? "text-emerald-500" : "text-red-500"}`}>
                {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {fmtPct(q.changePct)}
              </span>
              <span className="text-border">·</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndexTicker;