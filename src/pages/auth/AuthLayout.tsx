import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const AuthLayout = ({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => (
  <main className="min-h-screen bg-background text-foreground flex flex-col">
    <header className="container flex items-center justify-between h-20">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Stella Aurea Capital" className="h-9 w-9 object-contain" />
        <span className="flex flex-col leading-none">
          <span className="font-serif text-lg tracking-wide">Stella Aurea</span>
          <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Capital</span>
        </span>
      </Link>
      <Link
        to="/"
        className="text-[11px] uppercase tracking-luxury text-muted-foreground hover:text-gold transition-colors"
      >
        ← Voltar ao site
      </Link>
    </header>

    <section className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="text-[10px] uppercase tracking-luxury text-gold mb-4">
            Área do cliente
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl leading-tight">{title}</h1>
          {subtitle && (
            <p className="mt-4 text-sm text-muted-foreground max-w-sm mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="border border-border/60 bg-card/60 backdrop-blur p-8 sm:p-10">
          {children}
        </div>

        {footer && <div className="mt-8 text-center text-xs text-muted-foreground">{footer}</div>}
      </div>
    </section>
  </main>
);

export default AuthLayout;