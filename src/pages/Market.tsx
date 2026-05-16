import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, ExternalLink, TrendingDown, TrendingUp } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Blog from "@/components/site/Blog";
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
  pyGainers,
  pyLosers,
  pyIndices,
  pyNews,
  euGainers,
  euLosers,
  globalIndices,
  globalNews,
  type IndexQuote,
  type NewsItem,
} from "@/data/market";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/use-seo";

type Region = "LOCAL" | "US";

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

const NewsCard = ({ n, lang, label }: { n: NewsItem; lang: "pt" | "es" | "en"; label: string }) => (
  <a
    href={n.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block border border-border/60 p-6 hover:border-gold/40 transition-colors duration-500"
  >
    <div className="flex items-center gap-3 text-[10px] uppercase tracking-luxury text-muted-foreground">
      <span>{n.source}</span>
      <span className="h-px w-6 bg-border" />
      <span>{fmtTime(n.publishedAt, lang)}</span>
    </div>
    <h3 className="font-serif text-xl mt-3 leading-snug group-hover:text-gold transition-colors duration-500">
      {n.title}
    </h3>
    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{n.summary}</p>
    <div className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-foreground/70 group-hover:text-gold transition-colors">
      {label} <ExternalLink className="h-3 w-3" />
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
  const { lang, t } = useLang();
  useSeo({ title: t.meta.marketTitle, description: t.meta.marketDesc, path: "/mercado" });
  const [region, setRegion] = useState<Region>("LOCAL");
  const isPY = lang === "es";
  const isEN = lang === "en";

  const tickerIndices = isEN
    ? globalIndices
    : isPY
      ? [...pyIndices, ...indices.filter((i) => i.region === "US")]
      : indices;

  const localGainers = isEN ? euGainers : isPY ? pyGainers : brGainers;
  const localLosers = isEN ? euLosers : isPY ? pyLosers : brLosers;
  const gainers = region === "LOCAL" ? localGainers : usGainers;
  const losers = region === "LOCAL" ? localLosers : usLosers;

  const allNews = isEN
    ? [...globalNews, ...news.filter((n) => n.region === "US")]
    : isPY
      ? [...pyNews, ...news.filter((n) => n.region === "US")]
      : news;
  const filteredNews = useMemo(
    () =>
      allNews.filter((n) =>
        region === "LOCAL"
          ? isEN
            ? n.region === "EU" || n.region === "UK" || n.region === "GLOBAL"
            : isPY
              ? n.region === "PY"
              : n.region === "BR"
          : n.region === "US",
      ),
    [region, isPY, isEN, allNews],
  );
  const regionalIndices = useMemo(() => {
    if (region === "LOCAL") {
      if (isEN)
        return globalIndices.filter(
          (i) => i.region === "EU" || i.region === "UK" || i.region === "GLOBAL" || i.region === "FX",
        );
      return isPY ? pyIndices : indices.filter((i) => i.region === "BR" || i.region === "FX");
    }
    if (isEN) return globalIndices.filter((i) => i.region === "US" || i.region === "FX");
    return indices.filter((i) => i.region === "US" || i.region === "FX");
  }, [region, isPY, isEN]);

  const summary = useMemo(() => {
    const topUp = gainers[0];
    const topDown = losers[0];
    const mainIndex = regionalIndices[0];
    const advancers = gainers.length;
    const decliners = losers.length;
    return { topUp, topDown, mainIndex, advancers, decliners };
  }, [gainers, losers, regionalIndices]);

  const tabs = [
    { v: "gainers", label: t.market.tabGainers },
    { v: "losers", label: t.market.tabLosers },
    { v: "indices", label: t.market.tabIndices },
    { v: "news", label: t.market.tabNews },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <IndexTicker items={tickerIndices} />

      <section className="container pt-16 pb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t.market.backHome}
        </Link>

        <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-luxury text-gold">{t.market.eyebrow}</div>
            <h1 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">{t.market.title}</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">{t.market.desc}</p>
          </div>

          <div className="inline-flex border border-border/60 self-start lg:self-end">
            {(["LOCAL", "US"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-5 py-2.5 text-[11px] uppercase tracking-luxury transition-colors ${
                  region === r
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r === "LOCAL" ? t.market.regionLocal : t.market.regionUS}
              </button>
            ))}
          </div>
        </div>

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
              label={t.market.summaryTopUp}
              value={summary.topUp.ticker}
              change={fmtPct(summary.topUp.changePct)}
              positive
            />
          )}
          {summary.topDown && (
            <SummaryStat
              label={t.market.summaryTopDown}
              value={summary.topDown.ticker}
              change={fmtPct(summary.topDown.changePct)}
              positive={false}
            />
          )}
          <SummaryStat
            label={t.market.summaryBreadth}
            value={`${summary.advancers} · ${summary.decliners}`}
            change={`${Math.round((summary.advancers / (summary.advancers + summary.decliners)) * 100)}%`}
            positive={summary.advancers >= summary.decliners}
          />
        </div>
      </section>

      <section className="container pb-24">
        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="bg-transparent p-0 h-auto border-b border-border/60 rounded-none w-full justify-start gap-6 md:gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.v}
                value={tab.v}
                className="rounded-none bg-transparent px-0 py-4 text-[11px] uppercase tracking-luxury text-muted-foreground border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-gold data-[state=active]:shadow-none whitespace-nowrap"
              >
                {tab.label}
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
                <NewsCard key={n.id} n={n} lang={lang} label={t.market.readNews} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <p className="text-[10px] uppercase tracking-luxury text-muted-foreground mt-12 text-center">
          {t.market.disclaimer}
        </p>
      </section>

      <Blog />

      <Footer />
    </main>
  );
};

export default Market;
