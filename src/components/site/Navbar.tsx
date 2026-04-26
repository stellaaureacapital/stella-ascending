import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLang } from "@/i18n/LanguageContext";
import LangSwitch from "./LangSwitch";

const Navbar = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.home, href: "#inicio" },
    { label: t.nav.about, href: "#sobre" },
    { label: t.nav.products, href: "#produtos" },
    { label: t.nav.services, href: "#servicos" },
    { label: t.nav.market, href: "/mercado", route: true },
    { label: t.nav.blog, href: "#blog" },
    { label: t.nav.contact, href: "#contato" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-20">
        <a href="#inicio" className="flex items-center gap-3 group">
          <img src={logo} alt="Stella Aurea Capital" className="h-10 w-10 object-contain" />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-lg tracking-wide">Stella Aurea</span>
            <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Capital</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              {l.route ? (
                <Link
                  to={l.href}
                  className="text-xs uppercase tracking-luxury text-foreground/80 hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  className="text-xs uppercase tracking-luxury text-foreground/80 hover:text-gold transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full"
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <LangSwitch />
          <a
            href="#contato"
            className="inline-flex items-center justify-center px-5 py-3 text-[11px] uppercase tracking-luxury border border-foreground/80 hover:bg-foreground hover:text-background transition-all duration-500"
          >
            {t.nav.cta}
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <LangSwitch />
          <button
            className="p-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <ul className="container py-6 flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.label}>
                {l.route ? (
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm uppercase tracking-luxury py-1"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm uppercase tracking-luxury py-1"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
