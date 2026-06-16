import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/stellaaureacapital/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575679150055", icon: Facebook },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@stellaaureacapital",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/StellaAureaCap",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-6.99L4.6 22H1.34l8.02-9.16L1 2h7.02l4.84 6.4L18.24 2zm-2.4 18h1.9L7.27 4H5.25l10.59 16z" />
      </svg>
    ),
  },
  { label: "YouTube", href: "https://www.youtube.com/@stellaaureacapital", icon: Youtube },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/stellaaureacapital/", icon: Linkedin },
  {
    label: "Threads",
    href: "https://www.threads.com/@stellaaureacapital",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.18 22h-.06C8.38 21.98 5.5 20.79 3.55 18.46 1.82 16.4.92 13.52.89 12v-.02c.03-1.52.93-4.4 2.66-6.46C5.5 3.21 8.38 2.02 12.12 2h.06c2.86.02 5.25.76 7.1 2.19 1.74 1.36 2.96 3.3 3.6 5.76l-1.94.51c-1.09-4.17-4.04-6.3-8.78-6.34-3.13.02-5.5.99-7.04 2.86C3.69 8.55 2.92 11 2.89 12c.03 1 .8 3.45 2.23 5.02 1.54 1.87 3.91 2.84 7.04 2.86 2.82-.02 4.69-.68 6.24-2.21 1.77-1.75 1.74-3.9 1.17-5.21-.34-.77-.95-1.42-1.77-1.9-.21 1.46-.67 2.64-1.39 3.53-.96 1.18-2.34 1.83-4.1 1.93-1.34.08-2.63-.24-3.63-.89-1.19-.78-1.89-1.96-1.97-3.34-.16-2.7 2-4.64 5.39-4.84.96-.06 1.86-.02 2.69.12-.11-.66-.34-1.18-.68-1.55-.47-.51-1.19-.77-2.15-.78h-.03c-.77 0-1.81.21-2.48 1.19l-1.65-1.11C9.07 5.21 10.51 4.7 12.04 4.7h.05c2.55.02 4.07 1.58 4.22 4.3.09.04.17.08.26.12 1.21.57 2.1 1.44 2.57 2.5.65 1.49.71 3.93-1.27 5.89-1.51 1.5-3.35 2.17-5.96 2.19zm.86-10.13c-.21 0-.43.01-.65.02-2.32.13-3.78 1.19-3.69 2.66.09 1.54 1.79 2.25 3.43 2.16 1.51-.08 3.47-.67 3.8-4.62-.78-.17-1.74-.27-2.89-.22z" />
      </svg>
    ),
  },
  {
    label: "Kwai",
    href: "https://kwai-video.com/u/@stellaaureacap/CAgN8tma",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.2 14.6l-3.6-2.6v2.6h-1.2v-9.2h1.2v4.4l3.4-3.4 .85.85-3.3 3.3 3.5 3.25-.85.8z"/>
      </svg>
    ),
  },
];

const Footer = () => {
  const { t } = useLang();
  const routes = ["/sobre", "/solucoes", "/mercado", "/contato"];
  const labels = [t.nav.about, `${t.nav.products} & ${t.nav.services}`, t.nav.market, t.nav.contact];
  const L = t.footer.legal;
  const legalLinks: { to: string; label: string }[] = [
    { to: "/privacidade", label: L.privacy },
    { to: "/cookies", label: L.cookies },
    { to: "/termos", label: L.terms },
    { to: "/disclaimer", label: L.disclaimer },
    { to: "/lgpd", label: L.lgpd },
    { to: "/seguranca", label: L.security },
  ];
  return (
    <footer className="bg-secondary/40 text-foreground py-20 border-t border-border">
      <div className="container grid md:grid-cols-5 gap-12">
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
          <div className="flex flex-wrap items-center gap-4 mt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-foreground/60 hover:text-gold transition-colors"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
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
          <p className="text-[10px] tracking-luxury uppercase text-gold mb-5">{t.footer.legalTitle}</p>
          <ul className="space-y-3 text-sm text-foreground/70">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-gold transition-colors">
                  {l.label}
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

      <div className="container mt-16 pt-8 border-t border-border">
        <p className="text-[11px] text-muted-foreground leading-relaxed max-w-4xl">
          {t.footer.disclaimerA}{" "}
          <Link to="/disclaimer" className="text-gold hover:underline">{t.footer.disclaimerLink}</Link>.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4 text-[10px] tracking-luxury uppercase text-muted-foreground">
          <p>© {new Date().getFullYear()} Stella Aurea Capital. {t.footer.rights}</p>
          <p>{t.footer.motto}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
