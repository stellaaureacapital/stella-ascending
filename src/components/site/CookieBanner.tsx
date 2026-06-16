import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  acceptAll,
  getConsent,
  rejectAll,
  saveConsent,
  type ConsentCategories,
  defaultConsent,
} from "@/lib/consent";
import { useLang } from "@/i18n/LanguageContext";

const CookieBanner = () => {
  const { t } = useLang();
  const c = t.cookies;
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [prefs, setPrefs] = useState<ConsentCategories>(defaultConsent);

  useEffect(() => {
    if (!getConsent()) setOpen(true);
  }, []);

  if (!open) return null;

  const close = () => setOpen(false);

  return (
    <div
      role="dialog"
      aria-label={c.ariaLabel}
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl bg-background border border-border shadow-elegant p-6 sm:p-8">
        {!customize ? (
          <>
            <p className="text-[10px] tracking-luxury uppercase text-gold mb-3">
              {c.eyebrow}
            </p>
            <h2 className="font-serif text-2xl mb-3">{c.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {c.bodyA}{" "}
              <Link to="/cookies" className="text-gold underline underline-offset-4">
                {c.cookiesLink}
              </Link>{" "}
              {c.and}{" "}
              <Link to="/privacidade" className="text-gold underline underline-offset-4">
                {c.privacyLink}
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  acceptAll();
                  close();
                }}
                className="px-6 py-3 bg-foreground text-background text-[11px] uppercase tracking-luxury hover:bg-gradient-gold hover:text-accent-foreground transition-all"
              >
                {c.acceptAll}
              </button>
              <button
                onClick={() => {
                  rejectAll();
                  close();
                }}
                className="px-6 py-3 border border-border text-[11px] uppercase tracking-luxury hover:border-gold transition-all"
              >
                {c.reject}
              </button>
              <button
                onClick={() => setCustomize(true)}
                className="px-6 py-3 text-[11px] uppercase tracking-luxury text-foreground/70 hover:text-gold transition-all"
              >
                {c.customize}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[10px] tracking-luxury uppercase text-gold mb-3">
              {c.prefsEyebrow}
            </p>
            <h2 className="font-serif text-2xl mb-4">{c.prefsTitle}</h2>
            <div className="space-y-3">
              <Row
                title={c.rows.necessaryTitle}
                desc={c.rows.necessaryDesc}
                checked
                disabled
              />
              <Row
                title={c.rows.analyticsTitle}
                desc={c.rows.analyticsDesc}
                checked={prefs.analytics}
                onChange={(v) => setPrefs({ ...prefs, analytics: v })}
              />
              <Row
                title={c.rows.marketingTitle}
                desc={c.rows.marketingDesc}
                checked={prefs.marketing}
                onChange={(v) => setPrefs({ ...prefs, marketing: v })}
              />
              <Row
                title={c.rows.functionalTitle}
                desc={c.rows.functionalDesc}
                checked={prefs.functional}
                onChange={(v) => setPrefs({ ...prefs, functional: v })}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  saveConsent(prefs);
                  close();
                }}
                className="px-6 py-3 bg-foreground text-background text-[11px] uppercase tracking-luxury hover:bg-gradient-gold hover:text-accent-foreground transition-all"
              >
                {c.save}
              </button>
              <button
                onClick={() => {
                  acceptAll();
                  close();
                }}
                className="px-6 py-3 border border-border text-[11px] uppercase tracking-luxury hover:border-gold transition-all"
              >
                {c.acceptAll}
              </button>
              <button
                onClick={() => setCustomize(false)}
                className="px-6 py-3 text-[11px] uppercase tracking-luxury text-foreground/70 hover:text-gold transition-all"
              >
                {c.back}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Row = ({
  title,
  desc,
  checked,
  onChange,
  disabled,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) => (
  <label className="flex items-start gap-4 p-4 border border-border hover:border-gold/50 transition-colors cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.checked)}
      className="mt-1 h-4 w-4 accent-[hsl(var(--gold))]"
    />
    <div className="flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
    </div>
  </label>
);

export default CookieBanner;