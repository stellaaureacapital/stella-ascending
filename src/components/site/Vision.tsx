import { Compass, Target, Sparkles, ShieldCheck, Cpu, Eye, Award, Users, Hourglass } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const VALUE_ICONS = [ShieldCheck, Users, Cpu, Award, Hourglass, Eye, Sparkles];

const Vision = () => {
  const { t } = useLang();
  const v = t.vision;
  return (
    <section id="visao" className="py-20 sm:py-28 lg:py-32 bg-secondary/30 border-y border-border relative overflow-hidden">
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <p className="text-[10px] sm:text-[11px] tracking-luxury uppercase text-gold mb-4 sm:mb-6">{v.eyebrow}</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
            {v.titleA}{" "}
            <em className="text-gradient-gold not-italic">{v.titleEm}</em>{" "}
            {v.titleB}
          </h2>
          <div className="hairline w-16 sm:w-24 mt-6 sm:mt-8" />
        </div>

        {/* Vision + Mission */}
        <div className="grid lg:grid-cols-2 gap-px bg-border mb-12 sm:mb-16 lg:mb-20 border border-border">
          <article className="bg-background p-6 sm:p-10 lg:p-12 flex flex-col">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
              <Compass className="h-6 w-6 sm:h-7 sm:w-7 text-gold shrink-0" strokeWidth={1.25} />
              <p className="text-[10px] sm:text-[11px] tracking-luxury uppercase text-gold">{v.visionLabel}</p>
            </div>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
              {v.visionText}
            </p>
          </article>

          <article className="bg-background p-6 sm:p-10 lg:p-12 flex flex-col">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
              <Target className="h-6 w-6 sm:h-7 sm:w-7 text-gold shrink-0" strokeWidth={1.25} />
              <p className="text-[10px] sm:text-[11px] tracking-luxury uppercase text-gold">{v.missionLabel}</p>
            </div>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base lg:text-lg font-light">
              {v.missionText}
            </p>
          </article>
        </div>

        {/* Values */}
        <div>
          <div className="flex items-end justify-between gap-6 mb-6 sm:mb-10">
            <p className="text-[10px] sm:text-[11px] tracking-luxury uppercase text-gold">{v.valuesLabel}</p>
            <span className="hidden sm:block flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border border border-border">
            {v.values.map((val, i) => {
              const Icon = VALUE_ICONS[i] ?? Sparkles;
              return (
                <article
                  key={val.t}
                  className="bg-background p-5 sm:p-8 flex flex-col hover:bg-secondary/40 transition-colors duration-500 group"
                >
                  <Icon
                    className="h-5 w-5 sm:h-6 sm:w-6 text-gold mb-4 sm:mb-6 transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.25}
                  />
                  <span className="font-serif text-[10px] sm:text-xs text-gold/70 mb-1.5 sm:mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-base sm:text-xl mb-2 sm:mb-3 leading-tight">{val.t}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{val.d}</p>
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
