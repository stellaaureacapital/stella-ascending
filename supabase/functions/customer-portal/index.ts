import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data } = await supabase.auth.getUser(token);
    const user = data.user;
    if (!user?.email) return json({ error: "Não autenticado" }, 401);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (!customers.data.length) return json({ error: "Nenhuma assinatura encontrada" }, 404);

    const origin = req.headers.get("origin") ?? "https://stellaaureacapital.com.br";
    const portal = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: `${origin}/area/assinatura`,
    });
    return json({ url: portal.url });
  } catch (e) {
    console.error("[CUSTOMER-PORTAL]", e);
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
