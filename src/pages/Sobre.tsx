import { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import About from "@/components/site/About";
import Vision from "@/components/site/Vision";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/use-seo";

const Sobre = () => {
  const { t } = useLang();
  useSeo({ title: t.meta.aboutTitle, description: t.meta.aboutDesc, path: "/sobre" });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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