## Plano: padrão institucional para Stella Aurea Capital

Antes de implementar, preciso alinhar o que é viável dentro do ambiente atual (site estático React/Vite hospedado na Lovable) e o que depende de você ou de infraestrutura externa.

### O que NÃO é possível fazer só no código do site
Estes itens exigem configuração fora do código (servidor/hospedagem/contas externas). Vou deixar tudo "preparado" no código, mas eles não ficam 100% ativos sem você:

- **Cabeçalhos HTTP reais (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)** — A Lovable serve o site e não permite customizar headers do servidor. Posso adicionar equivalentes via `<meta http-equiv>` no `index.html` (CSP, Referrer-Policy, X-Content-Type-Options funcionam; HSTS e X-Frame-Options **só funcionam como header HTTP de verdade**, então ficariam apenas como recomendação para quando migrar para domínio próprio com Cloudflare/Vercel/Nginx).
- **HTTPS forçado** — já é automático no domínio `.lovable.app` e no custom domain da Lovable. Nada a fazer no código.
- **Rate limiting real e proteção CSRF de servidor** — o site não tem backend próprio (formulário vai pro Google Forms). Posso implementar limitação client-side (cooldown, honeypot, tempo mínimo de preenchimento), mas rate limiting de verdade exigiria uma Edge Function no Lovable Cloud substituindo o Google Forms.
- **SQL Injection** — não se aplica: o site não tem queries SQL expostas ao usuário.
- **Google reCAPTCHA v3** — precisa que você gere as chaves em google.com/recaptcha (site key + secret key) e me passe a site key. A secret key só seria usada se trocássemos o envio para uma Edge Function.
- **GA4, Search Console, Clarity, GTM** — preciso dos IDs (G-XXXX, GTM-XXXX, Clarity project ID). Deixo os snippets prontos com placeholders.

### O que vou implementar agora no código

**1. Segurança aplicável no frontend**
- Meta tags de segurança no `index.html`: CSP, Referrer-Policy, X-Content-Type-Options, Permissions-Policy.
- Validação com `zod` em todos os formulários (nome, email, assunto, mensagem) com limites de tamanho e sanitização.
- Honeypot + tempo mínimo de submissão anti-bot no formulário de contato.
- Cooldown client-side entre envios.
- Encoding correto de tudo que vai pro Google Forms.

**2. LGPD — novas páginas com design institucional consistente**
- `/privacidade` — Política de Privacidade
- `/cookies` — Política de Cookies
- `/termos` — Termos de Uso
- `/disclaimer` — Disclaimer Financeiro (caráter educacional, não recomendação de investimento)
- `/lgpd` — Canal LGPD (titular dos dados, solicitações, DPO/contato)
- `/seguranca` — Página "Segurança e Privacidade"

**3. Banner de cookies**
- Componente próprio com: Aceitar todos / Recusar / Personalizar.
- Categorias: Necessários (sempre on), Analíticos, Marketing, Funcionais.
- Persistência em `localStorage` + respeito às escolhas (GA/Clarity só carregam se aceito).
- Link para Política de Cookies.

**4. Formulário de contato**
- Checkbox obrigatório: *"Li e concordo com a Política de Privacidade e autorizo o tratamento dos meus dados conforme a LGPD."* com link para `/privacidade`.
- Honeypot oculto + validação Zod + mensagens de erro amigáveis.
- Estrutura pronta para plugar reCAPTCHA v3 (assim que você fornecer a site key).

**5. SEO**
- `react-helmet-async` com title/description/canonical/og/twitter por rota.
- Schemas JSON-LD: Organization, FinancialService, WebSite (sitewide); FAQPage, Article, BreadcrumbList por rota quando aplicável.
- `scripts/generate-sitemap.ts` automático (predev/prebuild) com todas as rotas públicas.
- `public/robots.txt` ajustado com `Sitemap:` apontando para o domínio.

**6. Analytics preparados (carregam apenas com consentimento)**
- Slots para GA4, GTM, Clarity, Search Console verification — com placeholders comentados, prontos para você colar os IDs.

**7. Rodapé institucional**
- Reorganizado com colunas: Empresa / Soluções / Legal / Contato.
- Links para todas as páginas legais novas.
- Texto: "© 2026 Stella Aurea Capital. Todos os direitos reservados." + parágrafo de disclaimer educacional/informativo.

**8. Performance**
- `loading="lazy"` e `decoding="async"` em imagens não-LCP.
- `fetchpriority="high"` + preload no LCP do hero.
- Revisão de imports para garantir code-splitting das páginas legais (lazy routes).

### O que vou pedir depois (não bloqueia este plano)
- Chaves do reCAPTCHA v3 (site key).
- IDs do GA4 / GTM / Clarity / Search Console verification.
- Nome jurídico, CNPJ, endereço completo, e-mail de DPO/encarregado LGPD — para as páginas legais ficarem reais (vou usar placeholders claros marcados como `[A PREENCHER]` até você me passar).

### Entregáveis
~10-12 arquivos novos (páginas legais, banner de cookies, helpers de validação, helmet/SEO, script de sitemap) e edições em `index.html`, `App.tsx`, `Footer.tsx`, `Contact.tsx`, `main.tsx`, `public/robots.txt`.

### Posso prosseguir?
Confirma que posso começar **com placeholders** nas páginas legais (CNPJ, endereço, DPO) e **sem reCAPTCHA ativo** (deixo plugável)? Ou prefere já me passar as informações jurídicas e a site key antes?