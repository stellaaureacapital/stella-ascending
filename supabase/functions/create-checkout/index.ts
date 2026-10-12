import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const PRICES: Record<string, string> = {
  monthly: "price_1UPmM2Jc8Y8azw9xFqsVVcDY",
  yearly: "price_1UPmM6Jc8Y8azw9xhWPZe0ea",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = await req.json().catch(() => ({}));
    const plan = body?.plan;
    if (plan !== "monthly" && plan !== "yearly") return json({ error: "Plano inválido" }, 400);

    const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data } = await supabase.auth.getUser(token);
    const user = data.user;
    if (!user?.email) return json({ error: "Não autenticado" }, 401);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    const customerId = customers.data[0]?.id;

    const origin = req.headers.get("origin") ?? "https://stellaaureacapital.com.br";
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [{ price: PRICES[plan], quantity: 1 }],
      mode: "subscription",
      metadata: { user_id: user.id, plan },
      success_url: `${origin}/area/assinatura?checkout=success`,
      cancel_url: `${origin}/assinatura?checkout=cancel`,
    });
    return json({ url: session.url });
  } catch (e) {
    console.error("[CREATE-CHECKOUT]", e);
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
