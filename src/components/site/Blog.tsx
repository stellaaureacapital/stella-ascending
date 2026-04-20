import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    cat: "Macroeconomia",
    date: "Abril, 2026",
    title: "Juros, inflação e a paciência do investidor de longo prazo",
    excerpt: "Como ler o ciclo econômico sem ceder ao ruído do curto prazo.",
  },
  {
    cat: "Renda Variável",
    date: "Abril, 2026",
    title: "Análise fundamentalista: o método por trás das grandes decisões",
    excerpt: "Os princípios que separam o investidor do especulador.",
  },
  {
    cat: "Estratégia",
    date: "Março, 2026",
    title: "Diversificação real: além da pulverização de ativos",
    excerpt: "Construindo um portfólio que resiste — e prospera — em qualquer cenário.",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-32 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
              Diário Aurea
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-2xl">
              Leituras recentes do nosso <em className="text-gradient-gold not-italic">blog</em>.
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury hover:text-gold transition-colors group"
          >
            Ver todas as publicações
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {posts.map((p) => (
            <article
              key={p.title}
              className="bg-background p-10 group cursor-pointer hover:bg-secondary/50 transition-colors duration-500 flex flex-col min-h-[360px]"
            >
              <div className="flex items-center gap-3 text-[10px] tracking-luxury uppercase text-muted-foreground mb-8">
                <span className="text-gold">{p.cat}</span>
                <span className="w-4 h-px bg-border" />
                <span>{p.date}</span>
              </div>
              <h3 className="font-serif text-2xl leading-snug mb-6 group-hover:text-gold transition-colors duration-500">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-auto">
                {p.excerpt}
              </p>
              <div className="flex items-center gap-2 mt-10 text-xs uppercase tracking-luxury">
                Ler artigo
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
