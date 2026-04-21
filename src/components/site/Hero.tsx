import logo from "@/assets/logo.png";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center bg-background overflow-hidden"
    >
      {/* Subtle decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Soft gold glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container relative pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <div className="reveal flex items-center gap-4 mb-10">
              <span className="block w-12 h-px bg-gold" />
              <p className="text-[11px] tracking-luxury uppercase text-gold">
                Stella Aurea Capital
              </p>
            </div>

            <h1 className="reveal reveal-delay-1 font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight">
              A estrela que orienta suas{" "}
              <em className="text-gradient-gold not-italic">decisões</em>{" "}
              financeiras.
            </h1>

            <p className="reveal reveal-delay-2 mt-8 sm:mt-10 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
              Educação financeira séria, estratégica e acessível. Conteúdo construído
              sobre dados, análise e visão de longo prazo — para investidores que
              buscam clareza.
            </p>

            <div className="reveal reveal-delay-3 mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="#produtos"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background text-xs uppercase tracking-luxury hover:bg-gradient-gold hover:text-accent-foreground transition-all duration-500"
              >
                Conheça nossos produtos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#sobre"
                className="inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-luxury text-foreground/80 hover:text-gold transition-colors"
              >
                Nossa filosofia →
              </a>
            </div>

            <div className="reveal reveal-delay-4 mt-16 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
              {[
                { k: "100%", v: "Gratuito" },
                { k: "LP", v: "Longo prazo" },
                { k: "+5k", v: "Leitores" },
              ].map((s) => (
                <div key={s.v} className="border-t border-border pt-4">
                  <p className="font-serif text-2xl text-gradient-gold">{s.k}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] sm:tracking-luxury text-muted-foreground mt-2">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: logo composition */}
          <div className="lg:col-span-5 reveal reveal-delay-2 order-first lg:order-last">
            <div className="relative aspect-square max-w-[260px] sm:max-w-md mx-auto">
              {/* concentric rings */}
              <div className="absolute inset-0 rounded-full border border-gold/20" />
              <div className="absolute inset-6 sm:inset-8 rounded-full border border-gold/15" />
              <div className="absolute inset-12 sm:inset-16 rounded-full border border-gold/10" />

              {/* corner ticks */}
              {[
                "top-0 left-0",
                "top-0 right-0",
                "bottom-0 left-0",
                "bottom-0 right-0",
              ].map((pos) => (
                <span
                  key={pos}
                  className={`absolute ${pos} w-4 h-4 border-gold`}
                  style={{
                    borderTopWidth: pos.includes("top") ? 1 : 0,
                    borderBottomWidth: pos.includes("bottom") ? 1 : 0,
                    borderLeftWidth: pos.includes("left") ? 1 : 0,
                    borderRightWidth: pos.includes("right") ? 1 : 0,
                  }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Stella Aurea Capital"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>

              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-luxury uppercase text-muted-foreground whitespace-nowrap">
                Estrela Dourada · Est. 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* bottom marquee */}
      <div className="absolute bottom-0 inset-x-0 border-t border-border bg-background/80 backdrop-blur">
        <div className="container flex items-center justify-between gap-4 py-4 text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-luxury uppercase text-muted-foreground whitespace-nowrap overflow-hidden">
          <span>Educação</span>
          <span className="hidden xs:inline">Análise</span>
          <span className="hidden sm:inline">Estratégia</span>
          <span>Longo prazo</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
