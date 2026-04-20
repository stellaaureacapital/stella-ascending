import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

const Services = () => {
  return (
    <section
      id="servicos"
      className="py-32 bg-obsidian text-primary-foreground relative overflow-hidden"
    >
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
              Serviços
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Oito frentes para{" "}
              <em className="text-gradient-gold not-italic">orientar</em> sua jornada
              financeira.
            </h2>
          </div>
          <p className="lg:col-span-5 text-primary-foreground/70 leading-relaxed">
            Cada serviço é construído sobre os mesmos pilares: método, transparência,
            dados confiáveis e visão de longo prazo. Sem atalhos — apenas a estrela
            certa para se orientar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-primary-foreground/10">
          {services.map(({ icon: Icon, title, shortDesc, slug, topics }, i) => (
            <Link
              key={slug}
              to={`/servicos/${slug}`}
              className="group relative bg-obsidian p-8 lg:p-10 hover:bg-primary-foreground/[0.03] transition-colors duration-700 flex flex-col"
            >
              <span className="absolute top-6 right-6 font-serif text-xs text-gold/50">
                {String(i + 1).padStart(2, "0")}
              </span>

              <Icon
                className="h-7 w-7 text-gold mb-8 transition-transform duration-700 group-hover:scale-110"
                strokeWidth={1.25}
              />

              <h3 className="font-serif text-2xl mb-4 leading-tight">{title}</h3>
              <p className="text-sm text-primary-foreground/60 leading-relaxed mb-6">
                {shortDesc}
              </p>

              <ul className="space-y-2 pt-6 border-t border-primary-foreground/10">
                {topics.slice(0, 4).map((it) => (
                  <li
                    key={it.title}
                    className="flex items-start gap-3 text-xs text-primary-foreground/70"
                  >
                    <span className="mt-[7px] block w-1 h-1 rounded-full bg-gold shrink-0" />
                    {it.title}
                  </li>
                ))}
              </ul>

              <span className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-luxury uppercase text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Conhecer
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        {/* Pillars strip */}
        <div className="mt-24 pt-16 border-t border-primary-foreground/15">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-10 text-center">
            Nossos quatro pilares
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { n: "01", t: "Educação séria", d: "Aprender a investir começa por aprender a pensar." },
              { n: "02", t: "Análise estratégica", d: "Decisões guiadas por dados e leitura de cenários." },
              { n: "03", t: "Acessibilidade", d: "Conteúdo gratuito, claro e de alto nível." },
              { n: "04", t: "Longo prazo", d: "Disciplina, método e a estrela certa para se orientar." },
            ].map((p) => (
              <div key={p.n} className="flex flex-col gap-3">
                <span className="font-serif text-3xl text-gold/80">{p.n}</span>
                <h4 className="font-serif text-xl">{p.t}</h4>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">
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
