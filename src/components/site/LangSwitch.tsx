import { useLang } from "@/i18n/LanguageContext";

const LangSwitch = ({ className = "" }: { className?: string }) => {
  const { lang, setLang, t } = useLang();
  return (
    <div
      className={`inline-flex items-center border border-border/60 ${className}`}
      role="group"
      aria-label={t.langSwitch.aria}
    >
      {(["pt", "es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1 text-[10px] uppercase tracking-luxury transition-colors ${
            lang === l
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span aria-hidden className="mr-1">
            {l === "pt" ? "🇧🇷" : l === "es" ? "🇵🇾" : "🌍"}
          </span>
          {t.langSwitch[l]}
        </button>
      ))}
    </div>
  );
};

export default LangSwitch;
