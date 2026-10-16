import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calculator, Search, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/use-seo";
import { toast } from "@/hooks/use-toast";
import { CALCULATORS, CalcPage } from "./calc/calculators";
import NotFound from "../NotFound";

type Saved = { id: string; name: string; calculator: string; created_at: string };

export const CalculadoraDetalhe = () => {
  const { slug } = useParams();
  const meta = CALCULATORS.find((c) => c.slug === slug);
  if (!meta) return <NotFound />;
  return <CalcPage key={meta.slug} meta={meta} />;
};

const Calculadoras = () => {
  useSeo({ title: "Calculadoras financeiras | Stella Aurea Capital", description: "Central de calculadoras financeiras.", path: "/area/calculadoras" });
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");
  const [saved, setSaved] = useState<Saved[] | null>(null);

  const load = () =>
    supabase.from("saved_simulations").select("id,name,calculator,created_at").order("created_at", { ascending: false }).limit(50)
      .then(({ data }) => setSaved((data as Saved[]) ?? []));
  useEffect(() => { load(); }, []);

  const cats = ["Todas", ...Array.from(new Set(CALCULATORS.map((c) => c.category)))];
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return CALCULATORS.filter((c) => (cat === "Todas" || c.category === cat) && (!t || `${c.title} ${c.description}`.toLowerCase().includes(t)));
  }, [q, cat]);

  const remove = async (id: string) => {
    const { error } = await supabase.from("saved_simulations").delete().eq("id", id);
    if (error) toast({ title: "Não foi possível excluir", variant: "destructive" });
    else setSaved((s) => s?.filter((x) => x.id !== id) ?? null);
  };

  return (
    <div className="max-w-6xl">
      <div className="text-[10px] uppercase tracking-luxury text-gold mb-4">Área do cliente</div>
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-3">Calculadoras financeiras</h1>
      <p className="text-sm text-muted-foreground max-w-xl mb-10">Ferramentas para simular investimentos, planejamento e crédito. Salve suas simulações para consultar depois.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <label className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar calculadora" className="w-full bg-background border border-border pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
        </label>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-3 py-2 text-[10px] uppercase tracking-luxury border transition-colors ${cat === c ? "border-gold text-gold" : "border-border hover:border-gold"}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {list.map((c) => (
          <Link key={c.slug} to={`/area/calculadoras/${c.slug}`} className="group border border-border/60 bg-secondary/30 p-6 flex flex-col hover:border-gold transition-colors duration-500">
            <div className="flex items-center justify-between mb-6">
              <Calculator className="h-5 w-5 text-gold" />
              <span className="text-[10px] uppercase tracking-luxury text-muted-foreground">{c.category}</span>
            </div>
            <h2 className="font-serif text-xl mb-2">{c.title}</h2>
            <p className="text-xs text-muted-foreground flex-1">{c.description}</p>
            <ArrowRight className="h-4 w-4 mt-4 text-gold opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
        {!list.length && <p className="text-sm text-muted-foreground">Nenhuma calculadora encontrada.</p>}
      </div>

      <section className="border border-border/60 p-6 sm:p-8">
        <h2 className="font-serif text-2xl mb-6">Minhas simulações</h2>
        {saved === null ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : !saved.length ? (
          <p className="text-sm text-muted-foreground">Você ainda não salvou nenhuma simulação.</p>
        ) : (
          <ul className="divide-y divide-border/50">
            {saved.map((s) => {
              const meta = CALCULATORS.find((c) => c.slug === s.calculator);
              return (
                <li key={s.id} className="flex items-center gap-3 py-3">
                  <Link to={`/area/calculadoras/${s.calculator}?sim=${s.id}`} className="flex-1 min-w-0 hover:text-gold">
                    <div className="text-sm truncate">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground">{meta?.title ?? s.calculator} · {new Date(s.created_at).toLocaleDateString("pt-BR")}</div>
                  </Link>
                  <button onClick={() => remove(s.id)} aria-label="Excluir simulação" className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Calculadoras;
