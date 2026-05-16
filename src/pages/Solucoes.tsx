import { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Products from "@/components/site/Products";
import Services from "@/components/site/Services";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/use-seo";

const Solucoes = () => {
  const { t } = useLang();
  useSeo({ title: t.meta.solutionsTitle, description: t.meta.solutionsDesc, path: "/solucoes" });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <Products />
        <Services />
      </div>
      <Footer />
    </main>
  );
};

export default Solucoes;