import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useSeo } from "@/hooks/use-seo";
import { useLang } from "@/i18n/LanguageContext";
import { getArticles } from "@/i18n/articles";

const copy = {
  pt: {
    title: "Artigos — Diário Aurea | Stella Aurea Capital",
    desc: "Análises completas sobre macroeconomia, renda variável e estratégia de portfólio pela Stella Aurea Capital.",
    heading: "Diário Aurea",
    sub: "Análises completas, escritas com método e visão de longo prazo.",
    read: "Ler artigo",
  },
  es: {
    title: "Artículos — Diario Aurea | Stella Aurea Capital",
    desc: "Análisis completos sobre macroeconomía paraguaya, BVA y estrategia de cartera por Stella Aurea Capital.",
    heading: "Diario Aurea",
    sub: "Análisis completos, escritos con método y visión de largo plazo.",
    read: "Leer artículo",
  },
  en: {
    title: "Articles — Aurea Journal | Stella Aurea Capital",
    desc: "In-depth analysis on global macro, equities and portfolio strategy by Stella Aurea Capital.",
    heading: "Aurea Journal",
    sub: "In-depth analysis, written with method and a long-term view.",
    read: "Read article",
  },
} as const;

const Artigos = () => {
  const { lang } = useLang();
  const c = copy[lang] ?? copy.pt;
  const articles = getArticles(lang);
  useSeo({ title: c.title, description: c.desc, path: "/artigos" });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">{c.heading}</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl mb-6">
            {c.sub}
          </h1>
          <div className="hairline w-24 mb-16" />

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={`/artigos/${a.slug}`}
                className="bg-background p-8 sm:p-10 group hover:bg-secondary/50 transition-colors duration-500 flex flex-col min-h-[340px]"
              >
                <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-luxury uppercase text-muted-foreground mb-8">
                  <span className="text-gold">{a.cat}</span>
                  <span className="w-4 h-px bg-border" />
                  <span>{a.date}</span>
                </div>
                <h2 className="font-serif text-2xl leading-snug mb-6 group-hover:text-gold transition-colors duration-500">
                  {a.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-auto">{a.excerpt}</p>
                <span className="flex items-center gap-2 mt-10 text-xs uppercase tracking-luxury">
                  {c.read}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Artigos;
