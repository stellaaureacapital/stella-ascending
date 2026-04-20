import aboutImg from "@/assets/about-image.jpg";

const About = () => {
  return (
    <section id="sobre" className="py-32 bg-background relative">
      <div className="container grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 border border-gold/30 -z-10 translate-x-6 translate-y-6" />
          <img
            src={aboutImg}
            alt="Mesa de trabalho premium com caderno, caneta dourada e gráfico financeiro"
            width={1200}
            height={1400}
            loading="lazy"
            className="w-full h-[600px] object-cover shadow-elegant"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
            Sobre — Stella Aurea
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8">
            Uma <em className="text-gradient-gold not-italic">estrela dourada</em> no universo dos investimentos.
          </h2>
          <div className="hairline w-24 mb-8" />
          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p>
              Vivemos em uma era em que o acesso à informação é abundante — mas a
              qualidade nem sempre acompanha. No universo dos investimentos, isso se
              torna ainda mais delicado. Decisões financeiras precisam ser tomadas com
              base em dados confiáveis, análises sólidas e visão estratégica.
            </p>
            <p>
              A Stella Aurea Capital nasceu para transformar a forma como as pessoas se
              relacionam com seus investimentos. Nosso nome — <em>Stella Aurea</em>,
              estrela dourada — representa o que queremos ser para nossos leitores: um
              ponto de referência, orientação e valor.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-border">
            {[
              { k: "+5k", v: "Leitores ativos" },
              { k: "100%", v: "Conteúdo gratuito" },
              { k: "LP", v: "Visão de longo prazo" },
            ].map((s) => (
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
