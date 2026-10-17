import { useLang } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

const LangSwitch = ({ className = "" }: { className?: string }) => {
  const { lang, setLang, t } = useLang();
  return (
    <div
      className={`inline-flex items-center border border-border/60 ${className}`}
      role="group"
      aria-label={t.langSwitch.aria}
    >
      {(["pt", "es", "en"] as const).map((l) => (
        <Button variant="ghost"
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`h-10 sm:h-11 rounded-none gap-0 px-2 sm:px-2.5 text-[10px] uppercase tracking-[0.12em] transition-colors ${
            lang === l
              ? "bg-foreground text-background hover:bg-foreground hover:text-background"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
        >
          <span aria-hidden className="mr-1">
            {l === "pt" ? "🇧🇷" : l === "es" ? "🇵🇾" : "🌍"}
          </span>
          {t.langSwitch[l]}
        </Button>
      ))}
    </div>
  );
};

export default LangSwitch;
