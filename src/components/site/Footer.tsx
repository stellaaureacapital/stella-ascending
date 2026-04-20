import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-obsidian text-primary-foreground py-20">
      <div className="container grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="Stella Aurea Capital" className="h-10 w-10 object-contain" />
            <div className="leading-none">
              <p className="font-serif text-xl">Stella Aurea</p>
              <p className="text-[10px] tracking-luxury uppercase text-gold mt-1">Capital</p>
            </div>
          </div>
          <p className="text-primary-foreground/60 max-w-md leading-relaxed text-sm">
            Educação financeira séria, estratégica e acessível. Um ponto de referência,
            orientação e valor no universo dos investimentos.
          </p>
        </div>

        <div>
          <p className="text-[10px] tracking-luxury uppercase text-gold mb-5">Navegação</p>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            {["Sobre", "Produtos", "Serviços", "Blog", "Contato"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-gold transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-luxury uppercase text-gold mb-5">Contato</p>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li>contato@stellaaureacapital.com.br</li>
            <li>São Paulo · Brasil</li>
          </ul>
        </div>
      </div>

      <div className="container mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between gap-4 text-[10px] tracking-luxury uppercase text-primary-foreground/50">
        <p>© {new Date().getFullYear()} Stella Aurea Capital. Todos os direitos reservados.</p>
        <p>Feito com cuidado · Visão de longo prazo</p>
      </div>
    </footer>
  );
};

export default Footer;
