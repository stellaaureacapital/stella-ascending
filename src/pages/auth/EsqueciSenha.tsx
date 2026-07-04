import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/use-seo";
import AuthLayout from "./AuthLayout";

const schema = z.object({ email: z.string().trim().email("E-mail inválido").max(255) });

const EsqueciSenha = () => {
  useSeo({
    title: "Recuperar senha | Stella Aurea Capital",
    description: "Enviaremos um link seguro para redefinir sua senha.",
    path: "/esqueci-senha",
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    setSent(true);
  };

  return (
    <AuthLayout
      title="Recuperar acesso"
      subtitle="Informe seu e-mail e enviaremos um link seguro para redefinir sua senha."
      footer={
        <>
          Lembrou?{" "}
          <Link to="/login" className="text-gold hover:underline">Voltar ao login</Link>
        </>
      }
    >
      {sent ? (
        <div className="text-center space-y-4">
          <p className="text-sm text-foreground/90">
            Enviamos um link para <span className="text-gold">{email}</span>.
          </p>
          <p className="text-xs text-muted-foreground">
            Verifique também sua caixa de spam. O link expira em breve por segurança.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-2">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-5 py-3 text-[11px] uppercase tracking-luxury bg-foreground text-background hover:bg-gold hover:text-obsidian transition-all duration-500 disabled:opacity-50"
          >
            {loading ? "Enviando…" : "Enviar link"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default EsqueciSenha;