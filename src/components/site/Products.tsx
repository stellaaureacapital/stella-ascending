import { BookOpen, LineChart, Newspaper, Mail } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const ICONS = [Newspaper, BookOpen, LineChart, Mail];

const Products = () => {
  const { t } = useLang();
  const items = t.products.items.map((it, i) => ({ ...it, icon: ICONS[i] }));
  return (
    <section id="produtos" className="py-32 bg-secondary/40 relative overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
            {t.products.eyebrow}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {t.products.titleA}{" "}
            <em className="text-gradient-gold not-italic">{t.products.titleEm}</em>
            {t.products.titleB}
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
