import { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import About from "@/components/site/About";
import Vision from "@/components/site/Vision";
import { useLang } from "@/i18n/LanguageContext";

const Sobre = () => {
  const { t } = useLang();
  useEffect(() => {
    document.title = `${t.nav.about} · Stella Aurea Capital`;
    window.scrollTo(0, 0);
  }, [t]);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-20">
        <About />
        <Vision />
      </div>
      <Footer />
    </main>
  );
};

export default Sobre;