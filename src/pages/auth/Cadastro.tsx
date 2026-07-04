import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/use-seo";
import AuthLayout from "./AuthLayout";

const schema = z
  .object({
    fullName: z.string().trim().min(2, "Informe seu nome").max(100),
    email: z.string().trim().email("E-mail inválido").max(255),
    password: z.string().min(8, "Senha com no mínimo 8 caracteres").max(128),
    confirm: z.string(),
    accept: z.literal(true, { errorMap: () => ({ message: "Aceite os termos" }) }),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "Senhas não conferem" });

const Cadastro = () => {
  useSeo({
    title: "Cadastro — Área do Cliente | Stella Aurea Capital",
    description: "Crie sua conta para acessar ebooks, cursos e relatórios premium.",
    path: "/cadastro",
  });
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ fullName, email, password, confirm, accept });
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/area/minha-conta`,
        data: { full_name: parsed.data.fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Não foi possível criar sua conta", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Conta criada", description: "Bem-vindo(a) à Stella Aurea Capital." });
    navigate("/area/minha-conta", { replace: true });
  };

  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Cadastre-se para acessar sua área privada."
      footer={
        <>
          Já possui conta?{" "}
          <Link to="/login" className="text-gold hover:underline">Entrar</Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-2">Nome completo</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-2">E-mail</label>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-2">Senha</label>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-2">Confirmar</label>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
            className="mt-0.5 accent-[hsl(var(--gold))]"
          />
          <span>
            Li e concordo com os{" "}
            <Link to="/termos" className="underline hover:text-gold">Termos</Link>{" "}
            e a{" "}
            <Link to="/privacidade" className="underline hover:text-gold">Política de Privacidade</Link>.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center px-5 py-3 text-[11px] uppercase tracking-luxury bg-foreground text-background hover:bg-gold hover:text-obsidian transition-all duration-500 disabled:opacity-50"
        >
          {loading ? "Criando…" : "Criar conta"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Cadastro;