import { useState } from "react";
import { toast } from "sonner";
import { useLang } from "@/i18n/LanguageContext";

interface InterestFormProps {
  serviceTitle: string;
}

const InterestForm = ({ serviceTitle }: InterestFormProps) => {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success(t.interestForm.successTitle, {
        description: `${t.interestForm.successDescA} ${serviceTitle}.`,
      });
    }, 800);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-background border border-border p-8 lg:p-10 shadow-elegant grid sm:grid-cols-2 gap-6"
    >
      <input type="hidden" name="servico" value={serviceTitle} />

      <Field label={t.interestForm.name} name="nome" required />
      <Field label={t.interestForm.email} name="email" type="email" required />
      <Field label={t.interestForm.phone} name="telefone" />
      <div className="flex flex-col gap-2">
        <label className="text-[10px] tracking-luxury uppercase text-muted-foreground">
          {t.interestForm.profile}
        </label>
        <select
          name="perfil"
          required
          defaultValue=""
          className="bg-transparent border-b border-border focus:border-gold py-2 outline-none transition-colors"
        >
          <option value="" disabled>
            {t.interestForm.selectPlaceholder}
          </option>
          <option value="iniciante">{t.interestForm.profiles.iniciante}</option>
          <option value="intermediario">{t.interestForm.profiles.intermediario}</option>
          <option value="avancado">{t.interestForm.profiles.avancado}</option>
          <option value="profissional">{t.interestForm.profiles.profissional}</option>
        </select>
      </div>

      <div className="sm:col-span-2 flex flex-col gap-2">
        <label className="text-[10px] tracking-luxury uppercase text-muted-foreground">
          {t.interestForm.goal}
        </label>
        <textarea
          name="mensagem"
          rows={4}
          className="bg-transparent border-b border-border focus:border-gold py-2 outline-none transition-colors resize-none"
        />
      </div>

      <p className="sm:col-span-2 text-[11px] text-muted-foreground leading-relaxed">
        {t.interestForm.consentA}{" "}
        <span className="text-foreground">{serviceTitle}</span> {t.interestForm.consentB}
      </p>

      <button
        type="submit"
        disabled={loading}
        className="sm:col-span-2 mt-2 inline-flex items-center justify-center px-10 py-4 bg-foreground text-background text-xs uppercase tracking-luxury hover:bg-gradient-gold hover:text-accent-foreground transition-all duration-500 disabled:opacity-60"
      >
        {loading ? t.interestForm.sending : t.interestForm.submit}
      </button>
    </form>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-2">
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

export default InterestForm;
