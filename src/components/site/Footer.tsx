import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  const routes = ["/sobre", "/solucoes", "/mercado", "/contato"];
  const labels = [t.nav.about, `${t.nav.products} & ${t.nav.services}`, t.nav.market, t.nav.contact];
  return (
    <footer className="bg-secondary/40 text-foreground py-20 border-t border-border">
      <div className="container grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="Stella Aurea Capital" className="h-10 w-10 object-contain" />
            <div className="leading-none">
              <p className="font-serif text-xl">Stella Aurea</p>
              <p className="text-[10px] tracking-luxury uppercase text-gold mt-1">Capital</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-md leading-relaxed text-sm">
            {t.footer.desc}
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-luxury uppercase text-gold mb-5">{t.footer.navTitle}</p>
          <ul className="space-y-3 text-sm text-foreground/70">
            {routes.map((to, i) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold transition-colors">
                  {labels[i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-luxury uppercase text-gold mb-5">{t.footer.contactTitle}</p>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li>{t.footer.email}</li>
            <li>{t.footer.location}</li>
          </ul>
        </div>
      </div>

      <div className="container mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-[10px] tracking-luxury uppercase text-muted-foreground">
        <p>© {new Date().getFullYear()} Stella Aurea Capital. {t.footer.rights}</p>
        <p>{t.footer.motto}</p>
      </div>
    </footer>
  );
};

export default Footer;
