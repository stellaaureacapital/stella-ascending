import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const HomePillars = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const { eyebrow, titleA, titleEm, titleB, desc, cards } = t.homePillars;

  return (
    <section className="py-24 md:py-32 bg-secondary/30 border-y border-border/60">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
            {eyebrow}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {titleA}{" "}
            <em className="text-gradient-gold not-italic">{titleEm}</em>
            {titleB}
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-2xl">
            {desc}
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-border">
          {cards.map((c) => (
            <button
              key={c.kicker}
              onClick={() => navigate(c.to)}
              className="group bg-background text-left p-8 sm:p-10 hover:bg-background/60 transition-colors duration-500 flex flex-col min-h-[260px]"
            >
              <span className="text-[10px] tracking-luxury uppercase text-gold">
                {c.kicker}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl mt-4 group-hover:text-gold transition-colors duration-500">
                {c.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-auto">
                {c.desc}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury">
                {c.cta}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePillars;