import { Link } from "react-router-dom";
import { Crown, Check } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { useSubscription, SUBSCRIPTION_PLANS } from "@/hooks/use-subscription";

const statusLabel: Record<string, string> = {
  active: "Ativa",
  trialing: "Período de teste",
  past_due: "Pagamento pendente",
  canceled: "Cancelada",
  expired: "Expirada",
};

const AreaAssinatura = () => {
  useSeo({
    title: "Minha assinatura | Stella Aurea Capital",
    description: "Gerencie sua assinatura Stella Aurea Capital.",
    path: "/area/assinatura",
  });
  const { subscription, isActive, isAdmin, loading } = useSubscription();

  return (
    <div className="max-w-3xl">
      <div className="text-[10px] uppercase tracking-luxury text-gold mb-4">Área do cliente</div>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-3">Minha assinatura</h1>
      <p className="text-sm text-muted-foreground max-w-xl mb-12">
        A assinatura libera todos os ebooks e cursos publicados, incluindo os próximos lançamentos.
      </p>

      {loading ? (
        <div className="text-sm text-muted-foreground">Carregando…</div>
      ) : isAdmin ? (
        <div className="border border-gold/40 bg-secondary/30 p-8">
          <Crown className="h-5 w-5 text-gold mb-4" />
          <h2 className="font-serif text-2xl mb-2">Acesso total (administrador)</h2>
          <p className="text-sm text-muted-foreground">
            Sua conta possui acesso irrestrito a todo o catálogo, sem necessidade de assinatura.
          </p>
        </div>
      ) : isActive && subscription ? (
        <div className="border border-border/60 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl">Plano {SUBSCRIPTION_PLANS[subscription.plan].label}</h2>
            <span className="text-[10px] uppercase tracking-luxury text-gold border border-gold/40 px-2 py-1">
              {statusLabel[subscription.status] ?? subscription.status}
            </span>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-luxury text-muted-foreground mb-1">Valor</dt>
              <dd>
                {SUBSCRIPTION_PLANS[subscription.plan].price}
                {SUBSCRIPTION_PLANS[subscription.plan].period}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-luxury text-muted-foreground mb-1">
                {subscription.cancel_at_period_end ? "Acesso até" : "Próxima renovação"}
              </dt>
              <dd>
                {subscription.current_period_end
                  ? new Date(subscription.current_period_end).toLocaleDateString("pt-BR")
                  : "—"}
              </dd>
            </div>
          </dl>
          <ul className="mt-8 space-y-3 text-sm">
            {["Todos os ebooks", "Todos os cursos", "Novos lançamentos incluídos"].map((b) => (
              <li key={b} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-gold" strokeWidth={1.5} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="border border-border/60 bg-secondary/30 p-8 sm:p-10 text-center">
          <Crown className="h-6 w-6 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl mb-3">Você ainda não é assinante</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Assine para desbloquear a biblioteca completa de ebooks e cursos.
          </p>
          <Link
            to="/assinatura"
            className="mt-8 inline-flex items-center justify-center px-5 py-3 text-[11px] uppercase tracking-luxury bg-gradient-gold text-accent-foreground hover:opacity-90 transition-all duration-500"
          >
            Ver planos
          </Link>
        </div>
      )}
    </div>
  );
};

export default AreaAssinatura;
