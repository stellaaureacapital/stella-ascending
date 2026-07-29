import { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Pricing from "@/components/site/Pricing";
import { useSeo } from "@/hooks/use-seo";

const Assinatura = () => {
  useSeo({
    title: "Assinatura mensal e anual | Stella Aurea Capital",
    description:
      "Assine e tenha acesso ilimitado a todos os ebooks e cursos da Stella Aurea Capital. Planos mensal e anual.",
    path: "/assinatura",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
};

export default Assinatura;
