import aboutImg from "@/assets/about-portrait.png.asset.json";
import { useLang } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLang();
  return (
    <section id="sobre" className="py-32 bg-background relative">
      <div className="container grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 border border-gold/30 -z-10 translate-x-6 translate-y-6" />
          <img
            src={aboutImg.url}
            alt={t.about.imgAlt}
            width={1200}
            height={1400}
            loading="lazy"
            className="w-full h-auto object-contain shadow-elegant"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
            {t.about.eyebrow}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8">
            {t.about.titleA}{" "}
            <em className="text-gradient-gold not-italic">{t.about.titleEm}</em>{" "}
            {t.about.titleB}
          </h2>
          <div className="hairline w-24 mb-8" />
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <dl className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-border">
            {t.about.stats.map((s) => (
              <div key={s.v}>
                <dt className="font-serif text-3xl text-gradient-gold">{s.k}</dt>
                <dd className="text-xs uppercase tracking-luxury text-muted-foreground mt-2">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
