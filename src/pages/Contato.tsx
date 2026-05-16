import { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Contact from "@/components/site/Contact";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/use-seo";

const Contato = () => {
  const { t } = useLang();
  useSeo({ title: t.meta.contactTitle, description: t.meta.contactDesc, path: "/contato" });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  );
};

export default Contato;