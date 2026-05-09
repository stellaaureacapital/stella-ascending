import { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Contact from "@/components/site/Contact";
import { useLang } from "@/i18n/LanguageContext";

const Contato = () => {
  const { t } = useLang();
  useEffect(() => {
    document.title = `${t.nav.contact} · Stella Aurea Capital`;
    window.scrollTo(0, 0);
  }, [t]);
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