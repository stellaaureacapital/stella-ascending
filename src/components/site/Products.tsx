import { BookOpen, LineChart, Newspaper, Mail } from "lucide-react";

const items = [
  {
    icon: Newspaper,
    title: "Blog Stella Aurea",
    desc: "Análises semanais sobre macroeconomia, mercado de ações, renda fixa e tendências globais — escritas em linguagem clara.",
    tag: "Conteúdo",
  },
  {
    icon: BookOpen,
    title: "Guias & E-books",
    desc: "Materiais aprofundados para construir uma base sólida de educação financeira, do iniciante ao investidor avançado.",
    tag: "Educação",
  },
  {
    icon: LineChart,
    title: "Relatórios Estratégicos",
    desc: "Visão de longo prazo sobre setores, ativos e oportunidades de investimento, com base em dados e análise fundamentalista.",
    tag: "Análise",
  },
  {
    icon: Mail,
    title: "Newsletter Aurea",
    desc: "Curadoria semanal direto no seu e-mail: o essencial do mercado, leituras recomendadas e insights estratégicos.",
    tag: "Inteligência",
  },
];

const Products = () => {
  return (
    <section id="produtos" className="py-32 bg-secondary/40 relative overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
            Produtos
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Conhecimento como <em className="text-gradient-gold not-italic">patrimônio</em>.
          </h2>
          <div className="hairline w-24 mx-auto mt-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {items.map(({ icon: Icon, title, desc, tag }) => (
            <article
              key={title}
              className="group bg-background p-10 lg:p-14 transition-all duration-700 hover:bg-obsidian hover:text-primary-foreground"
            >
              <div className="flex items-start justify-between mb-10">
                <Icon className="h-8 w-8 text-gold transition-transform duration-700 group-hover:scale-110" strokeWidth={1.25} />
                <span className="text-[10px] tracking-luxury uppercase text-muted-foreground group-hover:text-gold/80">
                  {tag}
                </span>
              </div>
              <h3 className="font-serif text-3xl mb-5 leading-tight">{title}</h3>
              <p className="text-sm leading-relaxed text-foreground/70 group-hover:text-primary-foreground/70">
                {desc}
              </p>
              <div className="hairline w-12 mt-10 opacity-60 group-hover:w-24 transition-all duration-700" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
