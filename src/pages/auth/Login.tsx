import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/use-seo";
import AuthLayout from "./AuthLayout";

const schema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(128),
});

const Login = () => {
  useSeo({
    title: "Login — Área do Cliente | Stella Aurea Capital",
    description: "Acesse sua área privada da Stella Aurea Capital.",
    path: "/login",
  });
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) {
      toast({ title: "Não foi possível entrar", description: error.message, variant: "destructive" });
      return;
    }
    const to = location.state?.from && location.state.from !== "/login" ? location.state.from : "/area/minha-conta";
    navigate(to, { replace: true });
  };

  return (
    <AuthLayout
      title="Entrar"
      subtitle="Acesse ebooks, cursos e relatórios premium da sua conta."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="text-gold hover:underline">Criar conta</Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
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
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[10px] uppercase tracking-luxury text-muted-foreground">Senha</label>
            <Link to="/esqueci-senha" className="text-[10px] uppercase tracking-luxury text-gold hover:underline">
              Esqueci
            </Link>
          </div>
          <input
            type="password"
            autoComplete="current-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center px-5 py-3 text-[11px] uppercase tracking-luxury bg-foreground text-background hover:bg-gold hover:text-obsidian transition-all duration-500 disabled:opacity-50"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;