import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Produtos", href: "#produtos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Mercado", href: "/mercado", route: true },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

        <ul className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
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

        <a
          href="#contato"
          className="hidden lg:inline-flex items-center justify-center px-6 py-3 text-[11px] uppercase tracking-luxury border border-foreground/80 hover:bg-foreground hover:text-background transition-all duration-500"
        >
          Fale conosco
        </a>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <ul className="container py-6 flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
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
