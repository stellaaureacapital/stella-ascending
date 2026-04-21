import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  brGainers,
  brLosers,
  indices,
  news,
  usGainers,
  usLosers,
  type IndexQuote,
  type NewsItem,
  type Stock,
} from "@/data/market";

type Region = "BR" | "US";

const fmtPrice = (v: number, currency: "BRL" | "USD") =>
  new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(v);

const fmtPct = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;

const fmtIndex = (v: number) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(v);

const fmtTime = (iso: string) => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `há ${mins} min`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `há ${hrs} h`;
  return new Date(iso).toLocaleDateString("pt-BR");
};

const StockTable = ({ rows, kind }: { rows: Stock[]; kind: "up" | "down" }) => {
  const positive = kind === "up";
  return (
    <div className="overflow-x-auto border border-border/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/60 text-[10px] uppercase tracking-luxury text-muted-foreground">
            <th className="text-left font-normal py-3 px-4 w-10">#</th>
            <th className="text-left font-normal py-3 px-4">Ativo</th>
            <th className="text-right font-normal py-3 px-4">Preço</th>
            <th className="text-right font-normal py-3 px-4">Variação</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr
              key={s.ticker}
              className="border-b border-border/40 last:border-0 hover:bg-foreground/[0.02] transition-colors"
            >
              <td className="py-4 px-4 text-muted-foreground font-mono text-xs">{i + 1}</td>
              <td className="py-4 px-4">
                <div className="font-mono text-sm tracking-wide">{s.ticker}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.name}</div>
              </td>
              <td className="py-4 px-4 text-right font-mono">{fmtPrice(s.price, s.currency)}</td>
              <td className="py-4 px-4 text-right">
                <span
                  className={`inline-flex items-center gap-1 font-mono text-sm ${
                    positive ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {fmtPct(s.changePct)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const IndexCard = ({ q }: { q: IndexQuote }) => {
  const positive = q.changePct >= 0;
  return (
    <div className="border border-border/60 p-6 hover:border-gold/40 transition-colors duration-500">
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
      <div className="mt-6 font-mono text-2xl tracking-wide">{fmtIndex(q.value)}</div>
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="container pt-32 pb-12">
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

          <div className="inline-flex border border-border/60">
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
      </section>

      <section className="container pb-24">
        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="bg-transparent p-0 h-auto border-b border-border/60 rounded-none w-full justify-start gap-8 overflow-x-auto">
            {[
              { v: "gainers", label: "Maiores altas" },
              { v: "losers", label: "Maiores baixas" },
              { v: "indices", label: "Índices" },
              { v: "news", label: "Notícias" },
            ].map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="rounded-none bg-transparent px-0 py-4 text-[11px] uppercase tracking-luxury text-muted-foreground border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-gold data-[state=active]:shadow-none"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="gainers" className="mt-10">
            <StockTable rows={gainers} kind="up" />
          </TabsContent>

          <TabsContent value="losers" className="mt-10">
            <StockTable rows={losers} kind="down" />
          </TabsContent>

          <TabsContent value="indices" className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionalIndices.map((q) => (
                <IndexCard key={q.symbol} q={q} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-10">
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