import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Products from "@/components/site/Products";
import Services from "@/components/site/Services";
import Blog from "@/components/site/Blog";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { useLang } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLang();
  const location = useLocation();

  useEffect(() => {
    document.title = t.meta.homeTitle;
    const desc = t.meta.homeDesc;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/");
  }, [t]);

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
      <About />
      <Products />
      <Services />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
