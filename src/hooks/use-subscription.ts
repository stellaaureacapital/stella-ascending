import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export type Subscription = {
  id: string;
  plan: "monthly" | "yearly";
  status: "trialing" | "active" | "past_due" | "canceled" | "expired";
  current_period_end: string | null;
  cancel_at_period_end: boolean;
};

export const SUBSCRIPTION_PLANS = {
  monthly: { label: "Mensal", price: "R$ 49,90", period: "/mês", note: "Cancele quando quiser" },
  yearly: { label: "Anual", price: "R$ 499,00", period: "/ano", note: "Equivale a 2 meses grátis" },
} as const;

export const useSubscription = () => {
  const { user, isAdmin } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const [tick, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user) {
        setSubscription(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      // Sync with Stripe first (updates the subscriptions table server-side)
      await supabase.functions.invoke("check-subscription").catch(() => null);
      const { data } = await supabase
        .from("subscriptions")
        .select("id, plan, status, current_period_end, cancel_at_period_end")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!active) return;
      setSubscription((data as Subscription) ?? null);
      setLoading(false);
    };
    load();
    const id = setInterval(load, 60_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [user, tick]);

  const isActive =
    isAdmin ||
    (!!subscription &&
      ["active", "trialing"].includes(subscription.status) &&
      (!subscription.current_period_end || new Date(subscription.current_period_end) > new Date()));

  const openPortal = async () => {
    const { data, error } = await supabase.functions.invoke("customer-portal");
    if (!error && data?.url) window.location.href = data.url;
    return !error && !!data?.url;
  };

  return { subscription, isActive, isAdmin, loading, refresh, openPortal };
};
