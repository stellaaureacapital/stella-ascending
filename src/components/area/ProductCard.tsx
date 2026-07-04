import { BookOpen, GraduationCap, FileText } from "lucide-react";
import type { MyProduct } from "@/hooks/use-my-products";

const iconOf = (t: MyProduct["product_type"]) =>
  t === "ebook" ? BookOpen : t === "curso" ? GraduationCap : FileText;

const labelOf = (t: MyProduct["product_type"]) =>
  t === "ebook" ? "Ebook" : t === "curso" ? "Curso" : "Relatório";

const ProductCard = ({
  product,
  ctaLabel = "Acessar",
  onOpen,
}: {
  product: MyProduct;
  ctaLabel?: string;
  onOpen?: (p: MyProduct) => void;
}) => {
  const Icon = iconOf(product.product_type);
  return (
    <article className="group border border-border/60 bg-card/60 flex flex-col overflow-hidden">
      <div className="aspect-[16/10] bg-secondary/60 relative overflow-hidden">
        {product.cover_url || product.thumbnail_url ? (
          <img
            src={product.cover_url ?? product.thumbnail_url ?? ""}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="h-10 w-10 text-gold/60" />
          </div>
        )}
        {product.is_premium && (
          <span className="absolute top-3 right-3 text-[9px] uppercase tracking-luxury bg-obsidian text-gold px-2 py-1">
            Premium
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-luxury text-muted-foreground mb-3">
          <Icon className="h-3 w-3" /> {labelOf(product.product_type)}
        </div>
        <h3 className="font-serif text-xl mb-2">{product.title}</h3>
        {product.short_description && (
          <p className="text-xs text-muted-foreground line-clamp-3 mb-5">
            {product.short_description}
          </p>
        )}
        <button
          onClick={() => onOpen?.(product)}
          className="mt-auto inline-flex items-center justify-center px-4 py-2.5 text-[11px] uppercase tracking-luxury border border-foreground/70 hover:bg-foreground hover:text-background transition-all duration-500"
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;