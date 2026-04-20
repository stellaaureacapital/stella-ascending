import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian text-primary-foreground"
    >
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/40 to-obsidian" />

      <div className="relative container text-center py-32">
        <div className="reveal flex justify-center mb-10">
          <img
            src={logo}
            alt="Stella Aurea Capital logo"
            className="h-24 w-24 object-contain float-star"
          />
        </div>

        <p className="reveal reveal-delay-1 text-[11px] tracking-luxury uppercase text-gold mb-8">
          Educação Financeira · Estratégia · Visão de longo prazo
        </p>

        <h1 className="reveal reveal-delay-2 font-serif text-5xl sm:text-7xl lg:text-8xl leading-[1.05] max-w-5xl mx-auto">
          A estrela que orienta suas{" "}
          <span className="shimmer-gold italic">decisões financeiras</span>
        </h1>

        <div className="reveal reveal-delay-3 hairline w-32 mx-auto my-10" />

        <p className="reveal reveal-delay-3 max-w-2xl mx-auto text-base sm:text-lg text-primary-foreground/75 font-light leading-relaxed">
          Conteúdo sério, estratégico e acessível para investidores que buscam clareza,
          análise sólida e uma visão de longo prazo no mercado financeiro.
        </p>

        <div className="reveal reveal-delay-4 mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#produtos"
            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-gold text-accent-foreground text-xs uppercase tracking-luxury hover:shadow-gold transition-all duration-500"
          >
            Conheça nossos produtos
          </a>
          <a
            href="#sobre"
            className="inline-flex items-center justify-center px-10 py-4 border border-primary-foreground/40 text-xs uppercase tracking-luxury hover:border-gold hover:text-gold transition-all duration-500"
          >
            Nossa filosofia
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-primary-foreground/60">
        <span className="text-[10px] tracking-luxury uppercase">Explorar</span>
        <span className="block w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
