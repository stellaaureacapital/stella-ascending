import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useLang } from "@/i18n/LanguageContext";

const Contact = () => {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const mountedAt = useRef<number>(Date.now());
  const lastSubmitAt = useRef<number>(0);
  const e = t.contact.errors;
  const schema = z.object({
    nome: z.string().trim().min(2, e.name).max(100, e.nameLong),
    email: z.string().trim().email(e.email).max(254),
    assunto: z.string().trim().max(150).optional().or(z.literal("")),
    mensagem: z.string().trim().min(10, e.messageShort).max(2000, e.messageLong),
    consent: z.literal(true, { errorMap: () => ({ message: e.consent }) }),
    website: z.string().max(0, e.spam).optional().or(z.literal("")), // honeypot
  });

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const data = new FormData(form);

    // Anti-bot: minimum dwell time (3s) and per-submission cooldown (15s)
    if (Date.now() - mountedAt.current < 3000) {
      toast.error(e.tooFast);
      return;
    }
    if (Date.now() - lastSubmitAt.current < 15000) {
      toast.error(e.cooldown);
      return;
    }

    const parsed = schema.safeParse({
      nome: data.get("nome"),
      email: data.get("email"),
      assunto: data.get("assunto") || "",
      mensagem: data.get("mensagem"),
      consent: data.get("consent") === "on",
      website: data.get("website") || "",
    });

    if (!parsed.success) {
      const first = parsed.error.issues[0];
      toast.error(first?.message || e.generic);
      return;
    }

    const { nome, email, assunto, mensagem } = parsed.data;

    const payload = new URLSearchParams();
    payload.append("entry.2003835089", nome);
    payload.append("entry.1053861533", email);
    payload.append(
      "entry.679199944",
      assunto ? `[${assunto}]\n\n${mensagem}` : mensagem,
    );

    setLoading(true);
    lastSubmitAt.current = Date.now();
    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSe0WQ9ACSY2shGlIHQjR-usWheXlKJyZ14dPeiSV9czTYtKyg/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: payload.toString(),
        },
      );
      form.reset();
      toast.success(t.contact.successTitle, { description: t.contact.successDesc });
    } catch {
      toast.error(t.contact.errorTitle, { description: t.contact.errorDesc });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-32 bg-secondary/40">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-luxury uppercase text-gold mb-6">
            {t.contact.eyebrow}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {t.contact.titleA}{" "}
            <em className="text-gradient-gold not-italic">{t.contact.titleEm}</em>
            {t.contact.titleB}
          </h2>
          <div className="hairline w-24 mx-auto mt-8" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            {t.contact.desc}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-background border border-border p-8 lg:p-12 shadow-elegant grid sm:grid-cols-2 gap-6"
        >
          <Field label={t.contact.name} name="nome" required />
          <Field label={t.contact.email} name="email" type="email" required />
          <Field label={t.contact.subject} name="assunto" className="sm:col-span-2" />
          <div className="sm:col-span-2 flex flex-col gap-2">
            <label className="text-[10px] tracking-luxury uppercase text-muted-foreground">
              {t.contact.message}
            </label>
            <textarea
              name="mensagem"
              rows={5}
              required
              className="bg-transparent border-b border-border focus:border-gold py-2 outline-none transition-colors resize-none"
            />
          </div>
          {/* Honeypot field — hidden from real users */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <label className="sm:col-span-2 flex items-start gap-3 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4 w-4 accent-[hsl(var(--gold))]"
            />
            <span>
              {t.contact.consentA}{" "}
              <Link to="/privacidade" className="text-gold hover:underline">
                {t.contact.consentLink}
              </Link>{" "}
              {t.contact.consentB}
            </span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 mt-4 inline-flex items-center justify-center px-10 py-4 bg-foreground text-background text-xs uppercase tracking-luxury hover:bg-gradient-gold hover:text-accent-foreground transition-all duration-500 disabled:opacity-60"
          >
            {loading ? t.contact.sending : t.contact.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className="text-[10px] tracking-luxury uppercase text-muted-foreground">
      {label}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      className="bg-transparent border-b border-border focus:border-gold py-2 outline-none transition-colors"
    />
  </div>
);

export default Contact;
