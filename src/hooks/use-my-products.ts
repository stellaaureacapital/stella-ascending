import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export type MyProduct = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  product_type: "ebook" | "curso" | "relatorio";
  cover_url: string | null;
  thumbnail_url: string | null;
  content_url: string | null;
  is_premium: boolean;
  access_status: "active" | "expired" | "revoked";
  granted_at: string;
  expires_at: string | null;
};

export const useMyProducts = (type?: "ebook" | "curso" | "relatorio") => {
  const { user } = useAuth();
  const [data, setData] = useState<MyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user) return;
      setLoading(true);
      const { data: rows, error } = await supabase
        .from("user_access")
        .select(
          "access_status, granted_at, expires_at, products!inner(id, title, slug, short_description, description, product_type, cover_url, thumbnail_url, content_url, is_premium, status)"
        )
        .eq("user_id", user.id)
        .eq("access_status", "active")
        .order("granted_at", { ascending: false });

      if (!active) return;
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      const mapped: MyProduct[] = (rows ?? [])
        .filter((r: any) => r.products && r.products.status === "active")
        .map((r: any) => ({
          ...r.products,
          access_status: r.access_status,
          granted_at: r.granted_at,
          expires_at: r.expires_at,
        }));
      setData(type ? mapped.filter((p) => p.product_type === type) : mapped);
      setError(null);
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [user, type]);

  return { data, loading, error };
};