import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Download, Printer, RotateCcw, Save } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

/* ------------------------------ formatação ------------------------------ */

export const parseNum = (s: string | number): number => {
  if (typeof s === "number") return s;
  const t = (s ?? "").trim().replace(/\s|R\$|%/g, "");
  if (!t) return NaN;
  const norm = t.includes(",") ? t.replace(/\./g, "").replace(",", ".") : t;
  return /^-?\d*\.?\d+$/.test(norm) ? Number(norm) : NaN;
};
const brlFmt = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const brl = (v: number) => (Number.isFinite(v) ? brlFmt.format(v) : "—");
export const pct = (v: number, d = 2) =>
  Number.isFinite(v) ? `${(v * 100).toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d })}%` : "—";
export const num = (v: number, d = 0) => (Number.isFinite(v) ? v.toLocaleString("pt-BR", { maximumFractionDigits: d }) : "—");

/* ------------------------------ validação ------------------------------ */

export type Rule = { label: string; min?: number; max?: number; int?: boolean; optional?: boolean; gt?: number };
export const validate = <K extends string>(inputs: Record<string, unknown>, spec: Record<K, Rule>) => {
  const v = {} as Record<K, number>;
  const errors: Partial<Record<K, string>> = {};
  for (const k in spec) {
    const r = spec[k];
    const raw = inputs[k] as string;
    let n = parseNum(raw);
    if (Number.isNaN(n)) {
      if (r.optional && (raw ?? "").toString().trim() === "") n = 0;
      else {
        errors[k] = "Informe um número válido";
        continue;
      }
    }
    if (r.int && !Number.isInteger(n)) errors[k] = "Use um número inteiro";
    else if (r.gt !== undefined && n <= r.gt) errors[k] = `Deve ser maior que ${num(r.gt, 2)}`;
    else if (r.min !== undefined && n < r.min) errors[k] = `Mínimo: ${num(r.min, 2)}`;
    else if (r.max !== undefined && n > r.max) errors[k] = `Máximo: ${num(r.max, 2)}`;
    v[k] = n;
  }
  return { v, errors, ok: Object.keys(errors).length === 0 };
};

/* ------------------------------ estado ------------------------------ */

export function useCalcInputs<T extends Record<string, unknown>>(slug: string, defaults: T) {
  const key = `stella.calc.${slug}`;
  const [params, setParams] = useSearchParams();
  const [inputs, setInputs] = useState<T>(() => {
    try {
      const s = sessionStorage.getItem(key);
      if (s) return { ...defaults, ...JSON.parse(s) };
    } catch {
      /* ignore */
    }
    return defaults;
  });
  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(inputs));
    } catch {
      /* ignore */
    }
  }, [key, inputs]);
  useEffect(() => {
    const id = params.get("sim");
    if (!id) return;
    supabase
      .from("saved_simulations")
      .select("inputs,name")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setInputs({ ...defaults, ...(data.inputs as object) });
          toast({ title: "Simulação carregada", description: data.name });
        }
        params.delete("sim");
        setParams(params, { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const set = <K extends keyof T>(k: K, val: T[K]) => setInputs((p) => ({ ...p, [k]: val }));
  const reset = () => setInputs(defaults);
  return { inputs, set, setInputs, reset };
}

/* ------------------------------ campos ------------------------------ */

const inputCls =
  "w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors";

export const Field = ({
  label, value, onChange, suffix, prefix, error, hint,
}: {
  label: string; value: string; onChange: (v: string) => void; suffix?: string; prefix?: string; error?: string; hint?: string;
}) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-1.5">{label}</span>
    <div className="relative flex items-center">
      {prefix && <span className="absolute left-3 text-xs text-muted-foreground">{prefix}</span>}
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`${inputCls} ${prefix ? "pl-9" : ""} ${suffix ? "pr-14" : ""} ${error ? "border-destructive" : ""}`}
      />
      {suffix && <span className="absolute right-3 text-xs text-muted-foreground">{suffix}</span>}
    </div>
    {error ? <span className="block text-[11px] text-destructive mt-1">{error}</span> : hint ? <span className="block text-[11px] text-muted-foreground mt-1">{hint}</span> : null}
  </label>
);

export const TextField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-1.5">{label}</span>
    <input value={value} onChange={(e) => onChange(e.target.value)} maxLength={60} className={inputCls} />
  </label>
);

export const SelectField = <V extends string>({
  label, value, onChange, options,
}: { label: string; value: V; onChange: (v: V) => void; options: { value: V; label: string }[] }) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-1.5">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value as V)} className={inputCls}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </label>
);

export const FieldGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
);

export const Panel = ({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) => (
  <section className={`border border-border/60 bg-secondary/20 p-5 sm:p-6 ${className}`}>
    {title && <h2 className="font-serif text-xl mb-5">{title}</h2>}
    {children}
  </section>
);

export const Stat = ({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) => (
  <div className={`border p-4 ${emphasis ? "border-gold bg-background" : "border-border/60"}`}>
    <div className="text-[10px] uppercase tracking-luxury text-muted-foreground mb-2">{label}</div>
    <div className={`font-serif break-words ${emphasis ? "text-2xl text-gold" : "text-xl"}`}>{value}</div>
  </div>
);
export const StatGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">{children}</div>
);

export const InvalidNotice = () => (
  <div className="border border-destructive/50 p-4 text-sm text-destructive">
    Corrija os campos destacados para ver os resultados.
  </div>
);

/* ------------------------------ gráficos ------------------------------ */

const PALETTE = ["hsl(var(--gold))", "hsl(var(--foreground) / 0.55)", "hsl(var(--gold-deep))", "hsl(var(--muted-foreground))"];
const tickFmt = (v: number) =>
  Math.abs(v) >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : Math.abs(v) >= 1e3 ? `${(v / 1e3).toFixed(0)}k` : `${v}`;

export const ChartArea = ({
  data, x, series, xLabel,
}: { data: Record<string, number>[]; x: string; series: { key: string; label: string }[]; xLabel?: string }) => (
  <div className="h-72 w-full">
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
        <XAxis dataKey={x} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} label={xLabel ? { value: xLabel, position: "insideBottomRight", offset: -2, fontSize: 10 } : undefined} />
        <YAxis tickFormatter={tickFmt} width={48} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <Tooltip formatter={(v: number) => brl(v)} contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {series.map((s, i) => (
          <Area key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={PALETTE[i % 4]} fill={PALETTE[i % 4]} fillOpacity={i === 0 ? 0.18 : 0.06} strokeWidth={1.5} isAnimationActive={false} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const ChartBars = ({ data, x, series }: { data: Record<string, number | string>[]; x: string; series: { key: string; label: string }[] }) => (
  <div className="h-72 w-full">
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
        <XAxis dataKey={x} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <YAxis tickFormatter={tickFmt} width={48} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
        <Tooltip formatter={(v: number) => brl(v)} contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {series.map((s, i) => (
          <Bar key={s.key} dataKey={s.key} name={s.label} stackId="a" fill={PALETTE[i % 4]} isAnimationActive={false} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

/* ------------------------------ tabela ------------------------------ */

export type TableData = { headers: string[]; rows: (string | number)[][] };

export const DataTable = ({ data, maxHeight = 420 }: { data: TableData; maxHeight?: number }) => (
  <div className="overflow-auto border border-border/60 print:max-h-none" style={{ maxHeight }}>
    <table className="w-full text-xs tabular-nums">
      <thead className="sticky top-0 bg-secondary">
        <tr>
          {data.headers.map((h) => (
            <th key={h} className="text-left font-normal uppercase tracking-luxury text-[10px] text-muted-foreground px-3 py-2 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((r, i) => (
          <tr key={i} className="border-t border-border/40">
            {r.map((c, j) => (
              <td key={j} className="px-3 py-1.5 whitespace-nowrap">{typeof c === "number" ? brl(c) : c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const downloadCsv = (title: string, data: TableData, assumptions: string[]) => {
  const esc = (c: string | number) => {
    const s = typeof c === "number" ? c.toFixed(2).replace(".", ",") : c;
    return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    `Stella Aurea Capital — ${title}`,
    `Data da simulação: ${new Date().toLocaleString("pt-BR")}`,
    ...assumptions.map((a) => `Premissa: ${a}`),
    "",
    data.headers.map(esc).join(";"),
    ...data.rows.map((r) => r.map(esc).join(";")),
  ];
  const blob = new Blob(["\ufeff" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${title.toLowerCase().normalize("NFD").replace(/[^\w]+/g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
};

/* ------------------------------ aviso ------------------------------ */

export const DISCLAIMER =
  "Esta ferramenta tem finalidade educacional e informativa. As simulações são estimativas baseadas nas premissas fornecidas e não representam garantia de rentabilidade, oferta de crédito ou recomendação individual de investimento. Custos, tributos, riscos, liquidez, inflação e condições contratuais podem alterar os resultados efetivos.";

export const Disclaimer = () => (
  <p className="text-[11px] leading-relaxed text-muted-foreground border-t border-border/50 pt-4">{DISCLAIMER}</p>
);

/* ------------------------------ shell ------------------------------ */

const btn =
  "inline-flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-luxury border border-border hover:border-gold hover:text-gold transition-colors disabled:opacity-40 disabled:pointer-events-none";

export const CalcShell = ({
  slug, title, description, category, inputs, onReset, table, assumptions, form, results, valid,
}: {
  slug: string; title: string; description: string; category: string;
  inputs: Record<string, unknown>; onReset: () => void; table?: TableData | null;
  assumptions: string[]; form: ReactNode; results: ReactNode; valid: boolean;
}) => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const save = async () => {
    const n = name.trim();
    if (!n || !user) return;
    setSaving(true);
    const { error } = await supabase.from("saved_simulations").insert({
      name: n.slice(0, 120), calculator: slug, category, inputs: inputs as never, user_id: user.id,
    });
    setSaving(false);
    if (error) toast({ title: "Não foi possível salvar", description: "Tente novamente em instantes.", variant: "destructive" });
    else {
      toast({ title: "Simulação salva", description: "Disponível em Minhas simulações." });
      setOpen(false);
      setName("");
    }
  };

  return (
    <div className="max-w-6xl">
      <Link to="/area/calculadoras" className="no-print inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-muted-foreground hover:text-gold mb-6">
        <ArrowLeft className="h-3.5 w-3.5" /> Central de calculadoras
      </Link>
      <div className="text-[10px] uppercase tracking-luxury text-gold mb-3">{category}</div>
      <h1 className="font-serif text-3xl sm:text-4xl leading-tight mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground max-w-2xl mb-6">{description}</p>
      <p className="hidden print:block text-xs mb-4">Data da simulação: {new Date().toLocaleString("pt-BR")}</p>

      <div className="no-print flex flex-wrap gap-2 mb-8">
        <button className={btn} onClick={onReset}><RotateCcw className="h-3.5 w-3.5" /> Limpar</button>
        <button className={btn} onClick={() => window.print()} disabled={!valid}><Printer className="h-3.5 w-3.5" /> Imprimir / PDF</button>
        <button className={btn} onClick={() => table && downloadCsv(title, table, assumptions)} disabled={!valid || !table}><Download className="h-3.5 w-3.5" /> CSV</button>
        <button className={btn} onClick={() => setOpen((o) => !o)} disabled={!valid}><Save className="h-3.5 w-3.5" /> Salvar</button>
      </div>
      {open && (
        <div className="no-print flex flex-col sm:flex-row gap-2 mb-8 max-w-lg">
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} maxLength={120} placeholder="Nome da simulação" className={inputCls} onKeyDown={(e) => e.key === "Enter" && save()} />
          <button className={`${btn} justify-center`} onClick={save} disabled={saving || !name.trim()}>{saving ? "Salvando…" : "Confirmar"}</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-6 items-start">
        <Panel title="Premissas" className="lg:sticky lg:top-6">{form}</Panel>
        <div className="space-y-6 min-w-0">
          {valid ? results : <InvalidNotice />}
          <Panel title="Premissas e limitações">
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4 mb-4">
              {assumptions.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <Disclaimer />
          </Panel>
        </div>
      </div>
    </div>
  );
};

export const useMemoCalc = useMemo;
