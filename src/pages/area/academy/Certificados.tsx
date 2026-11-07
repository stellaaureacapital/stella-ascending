import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Award, Printer, ShieldCheck } from "lucide-react";

type Cert = {
  id: string;
  student_name: string;
  course_title: string;
  hours: number;
  score: number;
  code: string;
  issued_at: string;
  invalidated_reason: string | null;
};

const fmtDate = (d: string) => new Date(d).toLocaleDateString("pt-BR");

const Certificados = () => {
  const { user } = useAuth();
  const [certs, setCerts] = useState<Cert[] | null>(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | { ok: boolean; text: string }>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("academy_certificates")
      .select("id,student_name,course_title,hours,score,code,issued_at,invalidated_reason")
      .eq("user_id", user.id)
      .order("issued_at", { ascending: false })
      .then(({ data }) => setCerts((data as Cert[]) ?? []));
  }, [user]);

  const verify = async () => {
    const c = code.trim();
    if (!/^[0-9a-f-]{36}$/i.test(c)) {
      setResult({ ok: false, text: "Código inválido. Use o código completo impresso no certificado." });
      return;
    }
    setChecking(true);
    const { data, error } = await supabase.rpc("academy_verify", { _code: c });
    setChecking(false);
    const d = data as null | { student_name: string; course_title: string; hours: number; issued_at: string; valid: boolean };
    if (error || !d) return setResult({ ok: false, text: "Nenhum certificado encontrado com este código." });
    setResult({
      ok: d.valid,
      text: d.valid
        ? `Certificado válido: ${d.student_name} concluiu "${d.course_title}" (${d.hours} h) em ${fmtDate(d.issued_at)}.`
        : `Este certificado foi invalidado.`,
    });
  };

  return (
    <div className="space-y-10">
      <header className="no-print">
        <p className="text-[11px] uppercase tracking-[0.16em] text-primary">Academia</p>
        <h1 className="mt-2 font-serif text-3xl text-foreground">Certificados</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Os certificados são emitidos automaticamente quando todas as aulas de um curso são concluídas com a nota mínima.
        </p>
      </header>

      <section className="space-y-4">
        {certs === null ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : certs.length === 0 ? (
          <div className="border border-border bg-card p-8 text-center">
            <Award className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">
              Você ainda não possui certificados. Conclua um curso em "Minha jornada" para recebê-lo.
            </p>
          </div>
        ) : (
          certs.map((c) => (
            <article key={c.id} className="border border-primary/40 bg-card p-6 sm:p-10 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Stella Aurea Capital · Certificado</p>
              <p className="mt-6 text-sm text-muted-foreground">Certificamos que</p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-foreground">{c.student_name}</h2>
              <p className="mt-4 text-sm text-muted-foreground">concluiu o curso</p>
              <h3 className="mt-1 font-serif text-xl text-foreground">{c.course_title}</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Carga horária {c.hours} h · Aproveitamento {Number(c.score).toFixed(0)}% · Emitido em {fmtDate(c.issued_at)}
              </p>
              <p className="mt-6 break-all text-[11px] text-muted-foreground">Código de verificação: {c.code}</p>
              {c.invalidated_reason && (
                <p className="mt-3 text-sm text-destructive">Invalidado: {c.invalidated_reason}</p>
              )}
              <div className="no-print mt-6">
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" /> Imprimir / PDF
                </Button>
              </div>
            </article>
          ))
        )}
      </section>

      <section className="no-print border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 font-serif text-xl text-foreground">
          <ShieldCheck className="h-5 w-5 text-primary" /> Verificar autenticidade
        </h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Cole o código do certificado" />
          <Button onClick={verify} disabled={checking}>{checking ? "Verificando…" : "Verificar"}</Button>
        </div>
        {result && (
          <p className={`mt-3 text-sm ${result.ok ? "text-primary" : "text-destructive"}`}>{result.text}</p>
        )}
      </section>
    </div>
  );
};

export default Certificados;
