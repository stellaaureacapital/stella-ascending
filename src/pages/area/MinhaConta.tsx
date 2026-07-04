import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, FileText, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useMyProducts } from "@/hooks/use-my-products";
import { useSeo } from "@/hooks/use-seo";

const MinhaConta = () => {
  useSeo({ title: "Minha conta | Stella Aurea Capital", description: "Sua área privada.", path: "/area/minha-conta" });
  const { user } = useAuth();
  const { data, loading } = useMyProducts();
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setFullName(data?.full_name ?? ""));
  }, [user]);

  const counts = {
    ebook: data.filter((p) => p.product_type === "ebook").length,
    curso: data.filter((p) => p.product_type === "curso").length,
    relatorio: data.filter((p) => p.product_type === "relatorio").length,
  };

  const first = (fullName || user?.email || "").split(" ")[0].split("@")[0];

  const shortcuts = [
    { to: "/area/meus-ebooks", label: "Ebooks", icon: BookOpen, count: counts.ebook },
    { to: "/area/meus-cursos", label: "Cursos", icon: GraduationCap, count: counts.curso },
    { to: "/area/relatorios-premium", label: "Relatórios premium", icon: FileText, count: counts.relatorio },
  ];

  return (
    <div className="max-w-5xl">
      <div className="text-[10px] uppercase tracking-luxury text-gold mb-4">Área do cliente</div>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-3">
        Bem-vindo(a), {first || "investidor"}.
      </h1>
      <p className="text-sm text-muted-foreground max-w-xl mb-12">
        Este é o seu espaço privado na Stella Aurea Capital. Aqui você encontra ebooks, cursos e
        relatórios premium liberados para sua conta.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
        {shortcuts.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.to}
              to={s.to}
              className="group border border-border/60 bg-secondary/30 p-6 flex flex-col justify-between hover:border-gold transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-8">
                <Icon className="h-5 w-5 text-gold" />
                <span className="text-3xl font-serif">{loading ? "—" : s.count}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-luxury">{s.label}</span>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="border border-border/60 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl">Sua conta</h2>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <dt className="text-[10px] uppercase tracking-luxury text-muted-foreground mb-1">Nome</dt>
            <dd>{fullName || "—"}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-luxury text-muted-foreground mb-1">E-mail</dt>
            <dd className="break-all">{user?.email}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default MinhaConta;