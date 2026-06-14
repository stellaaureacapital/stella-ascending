// Cookie consent + analytics loader (LGPD-compliant).
// Analytics scripts are loaded ONLY after the user accepts the corresponding category.

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

const STORAGE_KEY = "sac_cookie_consent_v1";

// ⚠️  Substitua pelos IDs reais quando disponíveis:
export const GA_ID = ""; // ex: "G-XXXXXXXXXX"
export const GTM_ID = ""; // ex: "GTM-XXXXXXX"
export const CLARITY_ID = ""; // ex: "abcdefghij"
export const RECAPTCHA_SITE_KEY = ""; // reCAPTCHA v3 site key

export const defaultConsent: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export function getConsent(): ConsentCategories | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...defaultConsent, ...parsed, necessary: true };
  } catch {
    return null;
  }
}

export function saveConsent(c: ConsentCategories) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...c, necessary: true, ts: Date.now() }));
  } catch {
    /* noop */
  }
  applyConsent(c);
  window.dispatchEvent(new CustomEvent("sac:consent-changed", { detail: c }));
}

export function acceptAll() {
  saveConsent({ necessary: true, analytics: true, marketing: true, functional: true });
}

export function rejectAll() {
  saveConsent({ necessary: true, analytics: false, marketing: false, functional: false });
}

let loaded = { ga: false, gtm: false, clarity: false };

export function applyConsent(c: ConsentCategories) {
  if (c.analytics && GA_ID && !loaded.ga) loadGA(GA_ID);
  if (c.analytics && GTM_ID && !loaded.gtm) loadGTM(GTM_ID);
  if (c.analytics && CLARITY_ID && !loaded.clarity) loadClarity(CLARITY_ID);
}

function injectScript(src: string, async = true) {
  const s = document.createElement("script");
  s.src = src;
  s.async = async;
  document.head.appendChild(s);
  return s;
}

function loadGA(id: string) {
  loaded.ga = true;
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${id}`);
  const inline = document.createElement("script");
  inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`;
  document.head.appendChild(inline);
}

function loadGTM(id: string) {
  loaded.gtm = true;
  const inline = document.createElement("script");
  inline.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;
  document.head.appendChild(inline);
}

function loadClarity(id: string) {
  loaded.clarity = true;
  const inline = document.createElement("script");
  inline.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`;
  document.head.appendChild(inline);
}

// Initialize on app load if consent already given.
export function initConsent() {
  const c = getConsent();
  if (c) applyConsent(c);
}