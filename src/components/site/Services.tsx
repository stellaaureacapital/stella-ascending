import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { servicesEs } from "@/i18n/servicesEs";
import { useLang } from "@/i18n/LanguageContext";

const Services = () => {
  const { lang, t } = useLang();
  const list = lang === "es" ? servicesEs : services;
  return (
    <section
      id="servicos"
      className="py-32 bg-background relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-16 items-end mb-20">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
              {t.services.eyebrow}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
              {t.services.titleA}{" "}
              <em className="text-gradient-gold not-italic">{t.services.titleEm}</em>{" "}
              {t.services.titleB}
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground leading-relaxed">
            {t.services.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {list.map(({ icon: Icon, title, shortDesc, slug, topics }, i) => (
            <Link
              key={slug}
              to={`/servicos/${slug}`}
              className="group relative bg-background p-8 lg:p-10 hover:bg-secondary/40 transition-colors duration-700 flex flex-col"
            >
              <span className="absolute top-6 right-6 font-serif text-xs text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>

              <Icon
                className="h-7 w-7 text-gold mb-8 transition-transform duration-700 group-hover:scale-110"
                strokeWidth={1.25}
              />

              <h3 className="font-serif text-2xl mb-4 leading-tight">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {shortDesc}
              </p>

              <ul className="space-y-2 pt-6 border-t border-border">
                {topics.slice(0, 4).map((it) => (
                  <li
                    key={it.title}
                    className="flex items-start gap-3 text-xs text-foreground/70"
                  >
                    <span className="mt-[7px] block w-1 h-1 rounded-full bg-gold shrink-0" />
                    {it.title}
                  </li>
                ))}
              </ul>

              <span className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-luxury uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {t.services.ctaCard}
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        {/* Pillars strip */}
        <div className="mt-24 pt-16 border-t border-border">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-10 text-center">
            {t.services.pillarsEyebrow}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {t.services.pillars.map((p) => (
              <div key={p.n} className="flex flex-col gap-3">
                <span className="font-serif text-3xl text-gold">{p.n}</span>
                <h4 className="font-serif text-xl">{p.t}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
