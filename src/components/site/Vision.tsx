import { Compass, Target, Sparkles, ShieldCheck, Cpu, Eye, Award, Users, Hourglass } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const VALUE_ICONS = [ShieldCheck, Users, Cpu, Award, Hourglass, Eye, Sparkles];

const Vision = () => {
  const { t } = useLang();
  const v = t.vision;
  return (
    <section id="visao" className="py-32 bg-secondary/30 border-y border-border relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="max-w-3xl mb-20">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">{v.eyebrow}</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {v.titleA}{" "}
            <em className="text-gradient-gold not-italic">{v.titleEm}</em>{" "}
            {v.titleB}
          </h2>
          <div className="hairline w-24 mt-8" />
        </div>

        {/* Vision + Mission */}
        <div className="grid lg:grid-cols-2 gap-px bg-border mb-20">
          <article className="bg-background p-10 lg:p-12 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <Compass className="h-7 w-7 text-gold" strokeWidth={1.25} />
              <p className="text-[11px] tracking-luxury uppercase text-gold">{v.visionLabel}</p>
            </div>
            <p className="text-foreground/80 leading-relaxed text-base lg:text-lg font-light">
              {v.visionText}
            </p>
          </article>

          <article className="bg-background p-10 lg:p-12 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <Target className="h-7 w-7 text-gold" strokeWidth={1.25} />
              <p className="text-[11px] tracking-luxury uppercase text-gold">{v.missionLabel}</p>
            </div>
            <p className="text-foreground/80 leading-relaxed text-base lg:text-lg font-light">
              {v.missionText}
            </p>
          </article>
        </div>

        {/* Values */}
        <div>
          <div className="flex items-end justify-between gap-6 mb-10">
            <p className="text-[11px] tracking-luxury uppercase text-gold">{v.valuesLabel}</p>
            <span className="hidden sm:block flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border">
            {v.values.map((val, i) => {
              const Icon = VALUE_ICONS[i] ?? Sparkles;
              return (
                <article
                  key={val.t}
                  className="bg-background p-8 flex flex-col hover:bg-secondary/40 transition-colors duration-500 group"
                >
                  <Icon
                    className="h-6 w-6 text-gold mb-6 transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.25}
                  />
                  <span className="font-serif text-xs text-gold/70 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl mb-3 leading-tight">{val.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{val.d}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
