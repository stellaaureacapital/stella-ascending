const pillars = [
  {
    n: "01",
    t: "Educação financeira séria",
    d: "Conteúdo construído sobre fundamentos sólidos, longe de modismos e promessas vazias. Aprender a investir começa por aprender a pensar.",
  },
  {
    n: "02",
    t: "Análise estratégica",
    d: "Decisões guiadas por dados, leitura de cenários e estudo aprofundado dos mercados — com a paciência que o longo prazo exige.",
  },
  {
    n: "03",
    t: "Acessibilidade",
    d: "Conteúdo gratuito, claro e de alto nível. Democratizar a informação financeira é o primeiro passo para empoderar o investidor.",
  },
  {
    n: "04",
    t: "Visão de longo prazo",
    d: "Construímos referência. Não há atalho para o patrimônio — há disciplina, método e a estrela certa para se orientar.",
  },
];

const Services = () => {
  return (
    <section id="servicos" className="py-32 bg-obsidian text-primary-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(42 70% 70%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-16 items-end mb-20">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
              Serviços & Filosofia
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Quatro pilares que <em className="text-gradient-gold not-italic">orientam</em> o nosso trabalho.
            </h2>
          </div>
          <p className="lg:col-span-5 text-primary-foreground/70 leading-relaxed">
            Nossa missão é transformar a forma como as pessoas lidam com seus
            investimentos — com método, transparência e compromisso com a excelência.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {pillars.map((p) => (
            <div
              key={p.n}
              className="group flex gap-8 pt-10 border-t border-primary-foreground/15 hover:border-gold transition-colors duration-700"
            >
              <span className="font-serif text-5xl text-gold/80 leading-none w-16 shrink-0">
                {p.n}
              </span>
              <div>
                <h3 className="font-serif text-3xl mb-4">{p.t}</h3>
                <p className="text-primary-foreground/70 leading-relaxed text-sm">
                  {p.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
