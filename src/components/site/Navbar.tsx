import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useLang } from "@/i18n/LanguageContext";
import LangSwitch from "./LangSwitch";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/use-auth";
import { UserRound } from "lucide-react";

const Navbar = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { session } = useAuth();

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

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

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
        scrolled || open
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-20">
        <Button variant="ghost" onClick={goHome} aria-label="Stella Aurea Capital" className="h-auto shrink-0 p-0 gap-3 rounded-none hover:bg-transparent group">
          <img src={logo} alt="" className="h-10 w-10 shrink-0 object-contain" />
          <span className="hidden sm:flex flex-col gap-1 leading-none text-left">
            <span className="font-serif text-lg whitespace-nowrap">Stella Aurea</span>
            <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Capital</span>
          </span>
        </Button>

        <ul className="hidden xl:flex items-center gap-4 2xl:gap-7 whitespace-nowrap">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-[10px] 2xl:text-xs uppercase tracking-[0.16em] py-3 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-px after:bg-gold after:transition-all after:duration-500 hover:after:w-full hover:text-gold ${
                    isActive ? "text-gold after:w-full" : "text-foreground/80 after:w-0"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex shrink-0 items-center gap-2 2xl:gap-4">
          <ThemeToggle />
          <LangSwitch />
          <Button variant="ghost"
            onClick={() => { setOpen(false); navigate(session ? "/area/minha-conta" : "/login"); }}
            className="h-11 px-2 rounded-none text-[11px] uppercase tracking-[0.16em] text-foreground/80 hover:text-gold hover:bg-transparent"
            aria-label={session ? "Área do cliente" : "Entrar"}
          >
            <UserRound className="h-4 w-4" />
            <span className="hidden 2xl:inline">{session ? "Área do cliente" : "Entrar"}</span>
          </Button>
          <Button variant="outline"
            onClick={goContact}
            className="h-11 rounded-none bg-transparent px-4 text-[10px] uppercase tracking-[0.16em] border-foreground/80 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {t.nav.cta}
          </Button>
        </div>

        <div className="xl:hidden flex items-center gap-1 sm:gap-3">
          <ThemeToggle />
          <LangSwitch />
          <Button variant="ghost" size="icon"
            className="h-11 w-11 -mr-2 rounded-none hover:bg-secondary/60"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div id="site-mobile-menu" className="xl:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-background/95 backdrop-blur-xl border-t border-border">
          <ul className="container py-5 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.label}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `block min-h-11 py-3 text-sm uppercase tracking-[0.16em] transition-colors ${isActive ? "text-gold" : "text-foreground/80 hover:text-gold"}`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to={session ? "/area/minha-conta" : "/login"}
                onClick={() => setOpen(false)}
                className="block min-h-11 text-sm uppercase tracking-[0.16em] py-3 mt-2 border-t border-border/60 text-gold"
              >
                {session ? "Área do cliente" : "Entrar"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
