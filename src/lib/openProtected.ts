import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { MyProduct } from "@/hooks/use-my-products";

// Opens a product's content. If content_url starts with "protected:", treat the
// remainder as a path in the private storage bucket and generate a signed URL.
// Otherwise, open the URL directly in a new tab.
export const openProductContent = async (p: MyProduct) => {
  const url = p.content_url;
  if (!url) {
    toast({
      title: "Conteúdo indisponível",
      description: "Este produto ainda não possui material publicado.",
    });
    return;
  }

  if (url.startsWith("protected:")) {
    const path = url.replace(/^protected:/, "");
    const { data, error } = await supabase.storage
      .from("protected-content")
      .createSignedUrl(path, 60 * 10);
    if (error || !data?.signedUrl) {
      toast({
        title: "Não foi possível abrir",
        description: error?.message ?? "Tente novamente em instantes.",
        variant: "destructive",
      });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
};