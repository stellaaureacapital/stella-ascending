import { useEffect, type ReactNode } from "react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useSeo } from "@/hooks/use-seo";
import { useLang } from "@/i18n/LanguageContext";

type Props = {
  title: string;
  description: string;
  path: string;
  eyebrow: string;
  heading: string;
  updatedAt?: string;
  children: ReactNode;
};

const LegalLayout = ({ title, description, path, eyebrow, heading, updatedAt, children }: Props) => {
  const { t } = useLang();
  useSeo({ title, description, path });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <article className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">{eyebrow}</p>
          <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-6">{heading}</h1>
          {updatedAt && (
            <p className="text-xs text-muted-foreground mb-10">{t.footer.updatedAt} {updatedAt}</p>
          )}
          <div className="hairline w-24 mb-12" />
          <div className="prose prose-sm sm:prose-base max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground/80 prose-li:text-foreground/80 prose-strong:text-foreground prose-a:text-[hsl(var(--gold))] prose-a:no-underline hover:prose-a:underline">
            {children}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default LegalLayout;