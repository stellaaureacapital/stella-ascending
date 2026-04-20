import { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Products from "@/components/site/Products";
import Services from "@/components/site/Services";
import Blog from "@/components/site/Blog";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "Stella Aurea Capital · Educação Financeira Estratégica";
    const desc =
      "Stella Aurea Capital — educação financeira séria, estratégica e acessível. Análises, guias e visão de longo prazo para investidores.";
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
  }, []);

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
