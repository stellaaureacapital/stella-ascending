import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import NotFound from "./NotFound";
import { useSeo } from "@/hooks/use-seo";
import { useLang } from "@/i18n/LanguageContext";
import { getArticle, getArticles } from "@/i18n/articles";

const copy = {
  pt: { back: "Voltar aos artigos", more: "Continue lendo", read: "Ler artigo" },
  es: { back: "Volver a los artículos", more: "Seguí leyendo", read: "Leer artículo" },
  en: { back: "Back to articles", more: "Keep reading", read: "Read article" },
} as const;

const Artigo = () => {
  const { slug = "" } = useParams();
  const { lang } = useLang();
  const c = copy[lang] ?? copy.pt;
  const article = getArticle(lang, slug);

  useSeo({
    title: article ? `${article.title} | Stella Aurea Capital` : "Stella Aurea Capital",
    description: article?.excerpt ?? "",
    path: `/artigos/${slug}`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt,
      articleSection: article.cat,
      inLanguage: lang === "es" ? "es-PY" : lang === "en" ? "en" : "pt-BR",
      author: { "@type": "Organization", name: "Stella Aurea Capital" },
      publisher: { "@type": "Organization", name: "Stella Aurea Capital" },
    });
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, [article, lang]);

  if (!article) return <NotFound />;

  const others = getArticles(lang).filter((a) => a.slug !== article.slug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <article className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <Link
            to="/artigos"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-muted-foreground hover:text-gold transition-colors mb-10"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {c.back}
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-luxury uppercase text-muted-foreground mb-6">
            <span className="text-gold">{article.cat}</span>
            <span className="w-4 h-px bg-border" />
            <span>{article.date}</span>
            <span className="w-4 h-px bg-border" />
            <span>{article.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
            {article.excerpt}
          </p>
          <div className="hairline w-24 mb-12" />

          <div className="space-y-6">
            {article.blocks.map((b, i) => {
              if (b.type === "h2")
                return (
                  <h2 key={i} className="font-serif text-2xl sm:text-3xl leading-snug pt-6">
                    {b.text}
                  </h2>
                );
              if (b.type === "h3")
                return (
                  <h3 key={i} className="font-serif text-xl leading-snug pt-2 text-gold">
                    {b.text}
                  </h3>
                );
              if (b.type === "ul")
                return (
                  <ul key={i} className="space-y-3 pl-1">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 text-sm sm:text-base text-foreground/80 leading-relaxed">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              if (b.type === "quote")
                return (
                  <blockquote
                    key={i}
                    className="border-l border-gold pl-6 py-2 my-8 font-serif text-lg sm:text-xl italic text-foreground/90"
                  >
                    {b.text}
                  </blockquote>
                );
              return (
                <p key={i} className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                  {b.text}
                </p>
              );
            })}
          </div>
        </div>

        <div className="container mt-24">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-8">{c.more}</p>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {others.map((a) => (
              <Link
                key={a.slug}
                to={`/artigos/${a.slug}`}
                className="bg-background p-8 group hover:bg-secondary/50 transition-colors duration-500"
              >
                <div className="flex items-center gap-3 text-[10px] tracking-luxury uppercase text-muted-foreground mb-5">
                  <span className="text-gold">{a.cat}</span>
                  <span className="w-4 h-px bg-border" />
                  <span>{a.date}</span>
                </div>
                <h3 className="font-serif text-xl leading-snug mb-4 group-hover:text-gold transition-colors">
                  {a.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury">
                  {c.read}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default Artigo;
