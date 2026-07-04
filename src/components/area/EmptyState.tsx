import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const EmptyState = ({
  title = "Nada por aqui ainda",
  description = "Você ainda não possui conteúdos liberados nesta área. Assim que adquirir um produto ou receber um acesso, ele aparecerá aqui automaticamente.",
  ctaLabel = "Ver produtos & serviços",
  ctaTo = "/solucoes",
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaTo?: string;
}) => (
  <div className="border border-border/60 bg-secondary/30 px-8 py-16 sm:py-20 text-center">
    <Sparkles className="h-6 w-6 text-gold mx-auto mb-6" />
    <h3 className="font-serif text-2xl sm:text-3xl mb-3">{title}</h3>
    <p className="text-sm text-muted-foreground max-w-md mx-auto">{description}</p>
    <Link
      to={ctaTo}
      className="mt-8 inline-flex items-center justify-center px-5 py-3 text-[11px] uppercase tracking-luxury border border-foreground/70 hover:bg-foreground hover:text-background transition-all duration-500"
    >
      {ctaLabel}
    </Link>
  </div>
);

export default EmptyState;