import { useMyProducts } from "@/hooks/use-my-products";
import ProductCard from "@/components/area/ProductCard";
import EmptyState from "@/components/area/EmptyState";
import { openProductContent } from "@/lib/openProtected";
import { useSeo } from "@/hooks/use-seo";

type Kind = "ebook" | "curso" | "relatorio" | undefined;

const ProductGrid = ({
  kind,
  title,
  subtitle,
  ctaLabel,
  seoTitle,
  seoDesc,
  path,
}: {
  kind: Kind;
  title: string;
  subtitle: string;
  ctaLabel: string;
  seoTitle: string;
  seoDesc: string;
  path: string;
}) => {
  useSeo({ title: seoTitle, description: seoDesc, path });
  const { data, loading } = useMyProducts(kind);
  return (
    <div className="max-w-6xl">
      <div className="text-[10px] uppercase tracking-luxury text-gold mb-4">Área do cliente</div>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-3">{title}</h1>
      <p className="text-sm text-muted-foreground max-w-xl mb-12">{subtitle}</p>

      {loading ? (
        <div className="text-sm text-muted-foreground">Carregando…</div>
      ) : data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((p) => (
            <ProductCard key={p.id} product={p} ctaLabel={ctaLabel} onOpen={openProductContent} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;