import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const PRICE_TO_PLAN: Record<string, "monthly" | "yearly"> = {
  price_1UPmM2Jc8Y8azw9xFqsVVcDY: "monthly",
  price_1UPmM6Jc8Y8azw9xhWPZe0ea: "yearly",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );
    const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
    const { data: u } = await admin.auth.getUser(token);
    const user = u.user;
    if (!user?.email) return json({ error: "Não autenticado" }, 401);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    const customer = customers.data[0];

    let sub: Stripe.Subscription | undefined;
    if (customer) {
      const subs = await stripe.subscriptions.list({ customer: customer.id, status: "all", limit: 10 });
      sub = subs.data.find((s) => ["active", "trialing", "past_due"].includes(s.status)) ?? subs.data[0];
    }

    const { data: existing } = await admin
      .from("subscriptions")
      .select("id")
      .eq("user_id", user.id)
      .eq("provider", "stripe")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!sub) {
      if (existing) await admin.from("subscriptions").update({ status: "expired" }).eq("id", existing.id);
      return json({ subscribed: false });
    }

    const item = sub.items.data[0];
    const periodEndUnix = (item as any)?.current_period_end ?? (sub as any).current_period_end;
    const periodEnd = periodEndUnix ? new Date(periodEndUnix * 1000).toISOString() : null;
    const statusMap: Record<string, string> = {
      active: "active",
      trialing: "trialing",
      past_due: "past_due",
      canceled: "canceled",
    };
    const row = {
      user_id: user.id,
      plan: PRICE_TO_PLAN[item?.price.id ?? ""] ?? "monthly",
      status: statusMap[sub.status] ?? "expired",
      provider: "stripe",
      provider_customer_id: customer!.id,
      provider_subscription_id: sub.id,
      current_period_end: periodEnd,
      cancel_at_period_end: sub.cancel_at_period_end,
    };
    if (existing) await admin.from("subscriptions").update(row).eq("id", existing.id);
    else await admin.from("subscriptions").insert(row);

    return json({
      subscribed: ["active", "trialing"].includes(sub.status),
      plan: row.plan,
      status: row.status,
      subscription_end: periodEnd,
    });
  } catch (e) {
    console.error("[CHECK-SUBSCRIPTION]", e);
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
