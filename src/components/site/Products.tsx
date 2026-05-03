import { BookOpen, GraduationCap, Sparkles, ArrowRight, Check } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

type Item = { title: string; desc: string; meta: string; badge: string };

const ItemCard = ({
  item,
  Icon,
  cta,
  onClick,
}: {
  item: Item;
  Icon: typeof BookOpen;
  cta: string;
  onClick: () => void;
}) => (
  <article className="group bg-background p-6 sm:p-8 lg:p-10 flex flex-col transition-all duration-700 hover:bg-obsidian hover:text-primary-foreground">
    <div className="flex items-start justify-between mb-6 sm:mb-8 gap-3">
      <Icon
        className="h-6 w-6 sm:h-7 sm:w-7 text-gold shrink-0 transition-transform duration-700 group-hover:scale-110"
        strokeWidth={1.25}
      />
      {item.badge && (
        <span className="text-[9px] sm:text-[10px] tracking-luxury uppercase border border-gold/40 text-gold px-2 py-1">
          {item.badge}
        </span>
      )}
    </div>
    <h3 className="font-serif text-xl sm:text-2xl mb-3 leading-tight">{item.title}</h3>
    <p className="text-xs sm:text-sm leading-relaxed text-foreground/70 group-hover:text-primary-foreground/70 flex-1">
      {item.desc}
    </p>
    <p className="mt-5 sm:mt-6 text-[10px] tracking-luxury uppercase text-muted-foreground group-hover:text-gold/80">
      {item.meta}
    </p>
    <button
      onClick={onClick}
      className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-foreground/80 group-hover:text-gold transition-colors self-start"
    >
      {cta}
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </button>
  </article>
);

const Products = () => {
  const { t } = useLang();
  const p = t.products;

  const goContact = () =>
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });

  const Group = ({
    label,
    icon: Icon,
    items,
  }: {
    label: string;
    icon: typeof BookOpen;
    items: Item[];
  }) => (
    <div className="mb-16 sm:mb-20">
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <Icon className="h-5 w-5 text-gold" strokeWidth={1.25} />
        <p className="text-[10px] sm:text-[11px] tracking-luxury uppercase text-gold">{label}</p>
        <span className="flex-1 h-px bg-border" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
        {items.map((it) => (
          <ItemCard key={it.title} item={it} Icon={Icon} cta={p.ctaLearn} onClick={goContact} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="produtos" className="py-20 sm:py-28 lg:py-32 bg-secondary/40 relative overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <p className="text-[10px] sm:text-[11px] tracking-luxury uppercase text-gold mb-4 sm:mb-6">
            {p.eyebrow}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
            {p.titleA}{" "}
            <em className="text-gradient-gold not-italic">{p.titleEm}</em>
            {p.titleB}
          </h2>
          <div className="hairline w-16 sm:w-24 mx-auto mt-6 sm:mt-8" />
        </div>

        <Group label={p.ebooksLabel} icon={BookOpen} items={p.ebooks} />
        <Group label={p.coursesLabel} icon={GraduationCap} items={p.courses} />

        {/* Consulting */}
        <div>
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
            <Sparkles className="h-5 w-5 text-gold" strokeWidth={1.25} />
            <p className="text-[10px] sm:text-[11px] tracking-luxury uppercase text-gold">
              {p.consultingLabel}
            </p>
            <span className="flex-1 h-px bg-border" />
          </div>
          <article className="bg-obsidian text-primary-foreground p-8 sm:p-12 lg:p-16 grid lg:grid-cols-5 gap-8 lg:gap-12 border border-border">
            <div className="lg:col-span-3">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl mb-5 leading-tight">
                <span className="text-gradient-gold">{p.consulting.title}</span>
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-primary-foreground/75 mb-6">
                {p.consulting.desc}
              </p>
              <p className="text-[10px] tracking-luxury uppercase text-gold/80">
                {p.consulting.meta}
              </p>
            </div>
            <div className="lg:col-span-2 flex flex-col">
              <ul className="space-y-3 sm:space-y-4 mb-8 flex-1">
                {p.consulting.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-primary-foreground/85">
                    <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={goContact}
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-gold text-accent-foreground text-[11px] uppercase tracking-luxury hover:opacity-90 transition-all duration-500 self-start"
              >
                {p.ctaConsult}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Products;
