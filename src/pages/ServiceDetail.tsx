import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import InterestForm from "@/components/site/InterestForm";
import { getServiceBySlug, services } from "@/data/services";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    if (!service) return;
    document.title = `${service.title} · Stella Aurea Capital`;
    const desc = service.shortDesc;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `${window.location.origin}/servicos/${service.slug}`,
    );

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [service]);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const Icon = service.icon;
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 border-b border-border">
        <div className="container">
          <Link
            to="/#servicos"
            className="inline-flex items-center gap-2 text-[11px] tracking-luxury uppercase text-muted-foreground hover:text-gold transition-colors mb-12"
          >
            <ArrowLeft className="h-3 w-3" />
            Todos os serviços
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <Icon className="h-8 w-8 text-gold" strokeWidth={1.25} />
                <p className="text-[11px] tracking-luxury uppercase text-gold">
                  Serviço Stella Aurea
                </p>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] mb-8">
                {service.title}
              </h1>
              <p className="font-serif text-xl lg:text-2xl text-muted-foreground italic max-w-2xl">
                "{service.tagline}"
              </p>
            </div>
            <div className="lg:col-span-4">
              <div className="hairline w-full mb-6" />
              <p className="text-muted-foreground leading-relaxed">
                {service.heroIntro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For who */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
                Para quem é
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl leading-tight">
                Pensado para investidores em diferentes momentos.
              </h2>
            </div>
            <ul className="lg:col-span-8 space-y-6">
              {service.forWho.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 pb-6 border-b border-border"
                >
                  <Check
                    className="h-5 w-5 text-gold mt-1 shrink-0"
                    strokeWidth={1.5}
                  />
                  <p className="text-lg leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 lg:py-28 bg-secondary/40">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
              O que você verá
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
              Tópicos abordados em <em className="text-gradient-gold not-italic">profundidade</em>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {service.topics.map((topic, i) => (
              <article
                key={topic.title}
                className="bg-background p-8 lg:p-10 flex flex-col"
              >
                <span className="font-serif text-xs text-gold/70 mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-2xl mb-4 leading-tight">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {topic.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology + Deliverables */}
      <section className="py-20 lg:py-28">
        <div className="container grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
              Metodologia
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl leading-tight mb-12">
              Três etapas, um caminho claro.
            </h2>
            <ol className="space-y-10">
              {service.methodology.map((m) => (
                <li key={m.step} className="flex gap-6">
                  <span className="font-serif text-3xl text-gold/80 shrink-0 w-12">
                    {m.step}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl mb-2">{m.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-12">
            <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
              O que você recebe
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl leading-tight mb-12">
              Materiais e entregas.
            </h2>
            <ul className="space-y-4">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 text-base border-b border-border pb-4"
                >
                  <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-secondary/40">
        <div className="container max-w-4xl">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6 text-center">
            Perguntas frequentes
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl leading-tight text-center mb-16">
            Antes de começar.
          </h2>

          <div className="space-y-6">
            {service.faq.map((f) => (
              <details
                key={f.q}
                className="group border-b border-border pb-6 cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-6 list-none">
                  <h3 className="font-serif text-xl lg:text-2xl">{f.q}</h3>
                  <span className="text-gold text-2xl font-serif transition-transform group-open:rotate-45 shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Interest form */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
              Formulário de interesse
            </p>
            <h2 className="font-serif text-3xl lg:text-5xl leading-tight">
              Quero saber mais sobre{" "}
              <em className="text-gradient-gold not-italic">{service.title}</em>.
            </h2>
            <div className="hairline w-24 mx-auto mt-8" />
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Preencha abaixo e nossa equipe entrará em contato com materiais e próximos passos.
            </p>
          </div>

          <InterestForm serviceTitle={service.title} />
        </div>
      </section>

      {/* Other services */}
      <section className="py-20 lg:py-28 bg-obsidian text-primary-foreground">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
                Continue explorando
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl leading-tight">
                Outros serviços.
              </h2>
            </div>
            <Link
              to="/#servicos"
              className="inline-flex items-center gap-2 text-[11px] tracking-luxury uppercase text-gold hover:text-gold-soft transition-colors"
            >
              Ver todos
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-primary-foreground/10">
            {otherServices.map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={`/servicos/${s.slug}`}
                  className="bg-obsidian p-8 lg:p-10 hover:bg-primary-foreground/[0.03] transition-colors duration-700 group flex flex-col"
                >
                  <SIcon
                    className="h-7 w-7 text-gold mb-8 transition-transform duration-700 group-hover:scale-110"
                    strokeWidth={1.25}
                  />
                  <h3 className="font-serif text-2xl mb-4 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed mb-8">
                    {s.shortDesc}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 text-[11px] tracking-luxury uppercase text-gold">
                    Saber mais
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServiceDetail;
