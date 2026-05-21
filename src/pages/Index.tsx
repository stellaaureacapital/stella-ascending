import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import HomePillars from "@/components/site/HomePillars";
import Blog from "@/components/site/Blog";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/use-seo";

const Index = () => {
  const { t } = useLang();
  const location = useLocation();

  useSeo({ title: t.meta.homeTitle, description: t.meta.homeDesc, path: "/" });

  // Scroll to hash anchor when navigating to /#anchor (e.g. from a service page)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <HomePillars />
      <Blog />
      <Footer />
    </main>
  );
};

export default Index;
