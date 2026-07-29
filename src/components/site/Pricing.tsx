import { Check, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { SUBSCRIPTION_PLANS } from "@/hooks/use-subscription";
import { toast } from "@/hooks/use-toast";

const benefits = [
  "Acesso ilimitado a todos os ebooks",
  "Acesso ilimitado a todos os cursos",
  "Novos lançamentos liberados automaticamente",
  "Continuidade de leitura e progresso salvos",
  "Cancelamento a qualquer momento",
];

const Pricing = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const onSubscribe = () => {
    if (!session) {
      navigate("/cadastro");
      return;
    }
    toast({
      title: "Pagamentos em ativação",
      description: "O checkout será liberado assim que a conta de pagamentos for ativada.",
    });
  };

  return (
    <section id="assinatura" className="py-20 sm:py-28 lg:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-[11px] tracking-luxury uppercase text-gold mb-4 sm:mb-6">
            Assinatura
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
            Tudo em um só <em className="text-gradient-gold not-italic">acesso</em>.
          </h2>
          <p className="text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
            Uma assinatura única libera a biblioteca completa de ebooks e cursos da Stella Aurea
            Capital, incluindo os próximos lançamentos.
          </p>
          <div className="hairline w-16 sm:w-24 mx-auto mt-6 sm:mt-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border max-w-4xl mx-auto">
          {(["monthly", "yearly"] as const).map((key) => {
            const plan = SUBSCRIPTION_PLANS[key];
            const featured = key === "yearly";
            return (
              <article
                key={key}
                className={`p-8 sm:p-10 flex flex-col ${
                  featured ? "bg-foreground text-background" : "bg-background"
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-luxury text-gold">{plan.label}</span>
                  {featured && (
                    <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-luxury border border-gold/40 text-gold px-2 py-1">
                      <Crown className="h-3 w-3" /> Melhor valor
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-1 mb-8">
                  <span className="font-serif text-4xl sm:text-5xl">{plan.price}</span>
                  <span className="text-xs text-muted-foreground mb-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-10 flex-1">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className={featured ? "text-background/85" : "text-foreground/80"}>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] uppercase tracking-luxury text-muted-foreground mb-5">
                  {plan.note}
                </p>
                <button
                  onClick={onSubscribe}
                  className={`w-full inline-flex items-center justify-center px-5 py-4 text-[11px] uppercase tracking-luxury transition-all duration-500 ${
                    featured
                      ? "bg-gradient-gold text-accent-foreground hover:opacity-90"
                      : "border border-foreground/70 hover:bg-foreground hover:text-background"
                  }`}
                >
                  Assinar {plan.label.toLowerCase()}
                </button>
              </article>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-xl mx-auto">
          Relatórios premium e consultoria sob medida são contratados separadamente.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
