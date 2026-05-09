import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useLang } from "@/i18n/LanguageContext";
import LangSwitch from "./LangSwitch";

const Navbar = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { label: t.nav.home, to: "/" },
    { label: t.nav.about, to: "/sobre" },
    { label: `${t.nav.products} & ${t.nav.services}`, to: "/solucoes" },
    { label: t.nav.market, to: "/mercado" },
    { label: t.nav.contact, to: "/contato" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goContact = () => {
    setOpen(false);
    navigate("/contato");
  };
  const goHome = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-20">
        <button onClick={goHome} className="flex items-center gap-3 group">
          <img src={logo} alt="Stella Aurea Capital" className="h-10 w-10 object-contain" />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-lg tracking-wide">Stella Aurea</span>
            <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Capital</span>
          </span>
        </button>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-luxury transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-px after:bg-gold after:transition-all after:duration-500 hover:after:w-full hover:text-gold ${
                    isActive ? "text-gold after:w-full" : "text-foreground/80 after:w-0"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <LangSwitch />
          <button
            onClick={goContact}
            className="inline-flex items-center justify-center px-5 py-3 text-[11px] uppercase tracking-luxury border border-foreground/80 hover:bg-foreground hover:text-background transition-all duration-500"
          >
            {t.nav.cta}
          </button>
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
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block text-sm uppercase tracking-luxury py-1"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
