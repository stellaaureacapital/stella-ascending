import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, Library, BookOpen, GraduationCap, FileText, Crown, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/use-auth";

const items = [
  { to: "/area/minha-conta", label: "Minha conta", icon: LayoutDashboard },
  { to: "/area/meus-produtos", label: "Meus produtos", icon: Library },
  { to: "/area/meus-ebooks", label: "Ebooks", icon: BookOpen },
  { to: "/area/meus-cursos", label: "Cursos", icon: GraduationCap },
  { to: "/area/relatorios-premium", label: "Relatórios premium", icon: FileText },
  { to: "/area/assinatura", label: "Assinatura", icon: Crown },
];

const AreaLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col lg:flex-row">
        <aside className="lg:w-72 lg:min-h-screen lg:sticky lg:top-0 lg:h-screen flex flex-col border-b lg:border-b-0 lg:border-r border-border/60 bg-secondary/30">
          <div className="p-6 flex items-center justify-between gap-3 border-b border-border/50">
            <Link to="/" className="flex items-center gap-3 min-w-0 group">
              <img src={logo} alt="Stella Aurea Capital" className="h-9 w-9 object-contain" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg tracking-wide">Stella Aurea</span>
                <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Capital</span>
              </span>
            </Link>
          </div>

          <Link
            to="/"
            className="hidden lg:flex items-center gap-2 px-6 py-4 text-[11px] uppercase tracking-luxury text-foreground/70 hover:text-gold border-b border-border/50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao site
          </Link>

          <nav className="p-4 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:flex-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-luxury transition-colors duration-300 whitespace-nowrap ${
                      isActive
                        ? "bg-background border-l-2 border-gold text-gold"
                        : "text-foreground/70 hover:text-gold border-l-2 border-transparent"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden lg:block p-4 mt-auto border-t border-border/50">
            <div className="text-[10px] uppercase tracking-luxury text-muted-foreground mb-1">Sessão</div>
            <div className="text-xs truncate text-foreground/80">{user?.email}</div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-[11px] uppercase tracking-luxury border border-foreground/70 hover:bg-foreground hover:text-background transition-all duration-500"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="lg:hidden flex items-center justify-between gap-3 px-6 py-4 border-b border-border/50">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-foreground/80 hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Site
            </Link>
            <div className="text-xs truncate text-muted-foreground flex-1 text-center">{user?.email}</div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxury text-foreground/80 hover:text-gold"
            >
              <LogOut className="h-3.5 w-3.5" /> Sair
            </button>
          </div>
          <div className="p-6 sm:p-10 lg:p-14">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AreaLayout;