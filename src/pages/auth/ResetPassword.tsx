import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useSeo } from "@/hooks/use-seo";
import AuthLayout from "./AuthLayout";

const schema = z
  .object({
    password: z.string().min(8, "Mínimo 8 caracteres").max(128),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { path: ["confirm"], message: "Senhas não conferem" });

const ResetPassword = () => {
  useSeo({
    title: "Redefinir senha | Stella Aurea Capital",
    description: "Defina sua nova senha de acesso.",
    path: "/reset-password",
  });
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ password, confirm });
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
    setLoading(false);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Senha atualizada" });
    navigate("/area/minha-conta", { replace: true });
  };

  return (
    <AuthLayout title="Redefinir senha" subtitle="Escolha uma nova senha segura para sua conta.">
      {!ready ? (
        <p className="text-sm text-muted-foreground text-center">
          Link inválido ou expirado. Solicite um novo em “Esqueci senha”.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-2">Nova senha</label>
            <input
              type="password"
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
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-5 py-3 text-[11px] uppercase tracking-luxury bg-foreground text-background hover:bg-gold hover:text-obsidian transition-all duration-500 disabled:opacity-50"
          >
            {loading ? "Salvando…" : "Salvar nova senha"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;