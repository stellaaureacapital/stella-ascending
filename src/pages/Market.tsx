import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, ExternalLink, TrendingDown, TrendingUp } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockList from "@/components/market/StockList";
import IndexTicker from "@/components/market/IndexTicker";
import { fmtIndex, fmtPct, fmtTime } from "@/components/market/format";
import {
  brGainers,
  brLosers,
  indices,
  news,
  usGainers,
  usLosers,
  type IndexQuote,
  type NewsItem,
} from "@/data/market";

type Region = "BR" | "US";

const IndexCard = ({ q }: { q: IndexQuote }) => {
  const positive = q.changePct >= 0;
  return (
    <div className="border border-border/60 p-6 hover:border-gold/40 transition-colors duration-500 group">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-luxury text-muted-foreground">{q.symbol}</div>
          <div className="font-serif text-lg mt-1">{q.name}</div>
        </div>
        <span
          className={`inline-flex items-center gap-1 font-mono text-xs ${
            positive ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {fmtPct(q.changePct)}
        </span>
      </div>
      <div className="mt-6 font-mono text-2xl tracking-wide group-hover:text-gold transition-colors duration-500">
        {fmtIndex(q.value)}
      </div>
    </div>
  );
};

const NewsCard = ({ n }: { n: NewsItem }) => (
  <a
    href={n.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block border border-border/60 p-6 hover:border-gold/40 transition-colors duration-500"
  >
    <div className="flex items-center gap-3 text-[10px] uppercase tracking-luxury text-muted-foreground">
      <span>{n.source}</span>
      <span className="h-px w-6 bg-border" />
      <span>{fmtTime(n.publishedAt)}</span>
    </div>
    <h3 className="font-serif text-xl mt-3 leading-snug group-hover:text-gold transition-colors duration-500">
      {n.title}
    </h3>
    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{n.summary}</p>
    <div className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-foreground/70 group-hover:text-gold transition-colors">
      Ler matéria <ExternalLink className="h-3 w-3" />
    </div>
  </a>
);

const SummaryStat = ({
  label,
  value,
  change,
  positive,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) => (
  <div className="border border-border/60 p-5">
    <div className="text-[10px] uppercase tracking-luxury text-muted-foreground">{label}</div>
    <div className="mt-3 flex items-baseline justify-between gap-3">
      <div className="font-mono text-xl">{value}</div>
      <span
        className={`inline-flex items-center gap-1 font-mono text-xs ${
          positive ? "text-emerald-500" : "text-red-500"
        }`}
      >
        {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        {change}
      </span>
    </div>
  </div>
);

const Market = () => {
  const [region, setRegion] = useState<Region>("BR");

  useEffect(() => {
    document.title = "Mercado · Stella Aurea Capital";
    const desc =
      "Acompanhe o mercado: top altas e baixas do dia, principais índices e últimas notícias do Brasil e dos EUA.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const gainers = region === "BR" ? brGainers : usGainers;
  const losers = region === "BR" ? brLosers : usLosers;
  const filteredNews = useMemo(() => news.filter((n) => n.region === region), [region]);
  const regionalIndices = useMemo(
    () => indices.filter((i) => (region === "BR" ? i.region !== "US" : i.region !== "BR")),
    [region],
  );

  const summary = useMemo(() => {
    const topUp = gainers[0];
    const topDown = losers[0];
    const mainIndex = regionalIndices[0];
    const advancers = gainers.length;
    const decliners = losers.length;
    return { topUp, topDown, mainIndex, advancers, decliners };
  }, [gainers, losers, regionalIndices]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <IndexTicker items={indices} />

      <section className="container pt-16 pb-10">
        <Link
          to="/#inicio"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao início
        </Link>

        <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-luxury text-gold">Mercado</div>
            <h1 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
              Visão de mercado em tempo real
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
              Maiores altas, maiores baixas, principais índices e as notícias que movem o mercado —
              tudo em um só lugar.
            </p>
          </div>

          <div className="inline-flex border border-border/60 self-start lg:self-end">
            {(["BR", "US"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-5 py-2.5 text-[11px] uppercase tracking-luxury transition-colors ${
                  region === r
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r === "BR" ? "Brasil" : "EUA"}
              </button>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {summary.mainIndex && (
            <SummaryStat
              label={summary.mainIndex.name}
              value={fmtIndex(summary.mainIndex.value)}
              change={fmtPct(summary.mainIndex.changePct)}
              positive={summary.mainIndex.changePct >= 0}
            />
          )}
          {summary.topUp && (
            <SummaryStat
              label="Maior alta"
              value={summary.topUp.ticker}
              change={fmtPct(summary.topUp.changePct)}
              positive
            />
          )}
          {summary.topDown && (
            <SummaryStat
              label="Maior baixa"
              value={summary.topDown.ticker}
              change={fmtPct(summary.topDown.changePct)}
              positive={false}
            />
          )}
          <SummaryStat
            label="Avanços · Quedas"
            value={`${summary.advancers} · ${summary.decliners}`}
            change={`${Math.round((summary.advancers / (summary.advancers + summary.decliners)) * 100)}%`}
            positive={summary.advancers >= summary.decliners}
          />
        </div>
      </section>

      <section className="container pb-24">
        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="bg-transparent p-0 h-auto border-b border-border/60 rounded-none w-full justify-start gap-6 md:gap-8 overflow-x-auto">
            {[
              { v: "gainers", label: "Maiores altas" },
              { v: "losers", label: "Maiores baixas" },
              { v: "indices", label: "Índices" },
              { v: "news", label: "Notícias" },
            ].map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="rounded-none bg-transparent px-0 py-4 text-[11px] uppercase tracking-luxury text-muted-foreground border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-gold data-[state=active]:shadow-none whitespace-nowrap"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="gainers" className="mt-8">
            <StockList rows={gainers} kind="up" />
          </TabsContent>

          <TabsContent value="losers" className="mt-8">
            <StockList rows={losers} kind="down" />
          </TabsContent>

          <TabsContent value="indices" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionalIndices.map((q) => (
                <IndexCard key={q.symbol} q={q} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNews.map((n) => (
                <NewsCard key={n.id} n={n} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <p className="text-[10px] uppercase tracking-luxury text-muted-foreground mt-12 text-center">
          Dados ilustrativos · Em breve cotações em tempo real
        </p>
      </section>

      <Footer />
    </main>
  );
};

export default Market;