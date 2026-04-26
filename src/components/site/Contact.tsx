import { useState } from "react";
import { toast } from "sonner";
import { useLang } from "@/i18n/LanguageContext";

const Contact = () => {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success(t.contact.successTitle, {
        description: t.contact.successDesc,
      });
    }, 800);
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
