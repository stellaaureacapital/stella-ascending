import type { ReactNode } from "react";
import type { Lang } from "./translations";

export type LegalMeta = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  updatedAt: string;
};

export type LegalPage = {
  meta: LegalMeta;
  body: ReactNode;
};

type Key = "privacidade" | "cookies" | "termos" | "disclaimer" | "lgpd" | "seguranca";

const EMAIL = "stellaaureacapital@gmail.com";

/* ---------------- PORTUGUÊS ---------------- */
const pt: Record<Key, LegalPage> = {
  privacidade: {
    meta: {
      title: "Política de Privacidade · Stella Aurea Capital",
      description:
        "Política de Privacidade da Stella Aurea Capital — como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.",
      eyebrow: "Legal · LGPD",
      heading: "Política de Privacidade",
      updatedAt: "14 de junho de 2026",
    },
    body: (
      <>
        <p>
          A Stella Aurea Capital ("nós", "nosso") respeita sua privacidade e está
          comprometida com a proteção dos seus dados pessoais, em conformidade com a
          Lei Geral de Proteção de Dados Pessoais — Lei nº 13.709/2018 ("LGPD").
        </p>
        <h2>1. Dados que coletamos</h2>
        <ul>
          <li><strong>Dados de contato:</strong> nome, e-mail, telefone (quando informados em formulários).</li>
          <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas, tempo de permanência, via cookies e tecnologias similares.</li>
          <li><strong>Dados fornecidos voluntariamente:</strong> conteúdo de mensagens enviadas pelos formulários de contato.</li>
        </ul>
        <h2>2. Finalidades do tratamento</h2>
        <ul>
          <li>Responder a solicitações e fornecer atendimento.</li>
          <li>Enviar comunicações sobre serviços e conteúdos educacionais (com consentimento).</li>
          <li>Melhorar a experiência de navegação e a qualidade do site.</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>
        <h2>3. Base legal</h2>
        <p>Tratamos dados com base em: consentimento do titular, execução de contrato, cumprimento de obrigação legal e legítimo interesse, conforme art. 7º da LGPD.</p>
        <h2>4. Compartilhamento de dados</h2>
        <p>Não vendemos seus dados. Compartilhamos apenas com prestadores essenciais à operação (ex.: hospedagem, e-mail, analytics), todos contratualmente obrigados a proteger seus dados.</p>
        <h2>5. Direitos do titular</h2>
        <p>Você pode, a qualquer momento: confirmar a existência de tratamento, acessar, corrigir, anonimizar, portar, eliminar dados, revogar consentimento e solicitar informações sobre compartilhamento. Para exercer seus direitos, acesse nosso <a href="/lgpd">Canal LGPD</a>.</p>
        <h2>6. Segurança</h2>
        <p>Adotamos medidas técnicas e administrativas para proteger seus dados — incluindo criptografia em trânsito (HTTPS), controle de acesso e monitoramento. Detalhes em <a href="/seguranca">Segurança e Privacidade</a>.</p>
        <h2>7. Retenção</h2>
        <p>Mantemos os dados pelo tempo necessário para as finalidades informadas ou exigido por lei. Após esse período, são eliminados ou anonimizados.</p>
        <h2>8. Cookies</h2>
        <p>Utilizamos cookies necessários, analíticos, de marketing e funcionais. Saiba mais e gerencie suas preferências em <a href="/cookies">Política de Cookies</a>.</p>
        <h2>9. Encarregado pelo Tratamento de Dados (DPO)</h2>
        <p>Contato: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <h2>10. Alterações</h2>
        <p>Esta política pode ser atualizada. Recomendamos revisão periódica desta página.</p>
      </>
    ),
  },
  cookies: {
    meta: {
      title: "Política de Cookies · Stella Aurea Capital",
      description:
        "Como a Stella Aurea Capital utiliza cookies e como você pode gerenciar suas preferências.",
      eyebrow: "Legal · Cookies",
      heading: "Política de Cookies",
      updatedAt: "14 de junho de 2026",
    },
    body: (
      <>
        <p>Cookies são pequenos arquivos armazenados no seu dispositivo para permitir o funcionamento adequado do site e melhorar sua experiência.</p>
        <h2>Categorias utilizadas</h2>
        <ul>
          <li><strong>Necessários:</strong> indispensáveis ao funcionamento do site. Sempre ativos.</li>
          <li><strong>Analíticos:</strong> coletam dados agregados sobre o uso do site (ex.: Google Analytics, Microsoft Clarity).</li>
          <li><strong>Marketing:</strong> permitem mensurar campanhas e personalizar comunicações.</li>
          <li><strong>Funcionais:</strong> habilitam recursos adicionais como preferências de idioma e conteúdo incorporado.</li>
        </ul>
        <h2>Como gerenciar</h2>
        <p>Ao acessar o site, você pode aceitar todos, recusar ou personalizar suas preferências no banner de cookies. Para alterar a qualquer momento, limpe os cookies do navegador e visite novamente o site, ou entre em contato em <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        <h2>Cookies de terceiros</h2>
        <p>Quando carregados (mediante seu consentimento), Google Analytics, Google Tag Manager e Microsoft Clarity podem armazenar cookies próprios, sujeitos às respectivas políticas de privacidade.</p>
      </>
    ),
  },
  termos: {
    meta: {
      title: "Termos de Uso · Stella Aurea Capital",
      description: "Termos de Uso que regulam o acesso e a utilização do site da Stella Aurea Capital.",
      eyebrow: "Legal · Termos",
      heading: "Termos de Uso",
      updatedAt: "14 de junho de 2026",
    },
    body: (
      <>
        <p>Ao acessar e utilizar o site da Stella Aurea Capital, você concorda com os presentes Termos de Uso. Caso não concorde, recomendamos que não utilize o site.</p>
        <h2>1. Objeto</h2>
        <p>O site oferece conteúdo educacional, informativo e institucional sobre mercado financeiro, consultoria patrimonial e investimentos.</p>
        <h2>2. Natureza do conteúdo</h2>
        <p>As informações disponibilizadas têm caráter exclusivamente educacional e informativo, não constituindo recomendação de investimento, oferta de valores mobiliários ou consultoria financeira individualizada. Veja nosso <a href="/disclaimer">Disclaimer Financeiro</a>.</p>
        <h2>3. Propriedade intelectual</h2>
        <p>Todo o conteúdo (textos, logotipos, identidade visual, materiais) é de propriedade da Stella Aurea Capital ou de seus licenciantes, sendo vedada reprodução sem autorização prévia.</p>
        <h2>4. Conduta do usuário</h2>
        <p>É vedado utilizar o site para fins ilícitos, tentar burlar mecanismos de segurança, executar engenharia reversa, enviar spam ou conteúdo ofensivo.</p>
        <h2>5. Links externos</h2>
        <p>O site pode conter links para terceiros. Não nos responsabilizamos pelo conteúdo ou políticas desses sites.</p>
        <h2>6. Limitação de responsabilidade</h2>
        <p>A Stella Aurea Capital não se responsabiliza por decisões de investimento tomadas com base em conteúdo do site. Investimentos envolvem riscos.</p>
        <h2>7. Foro</h2>
        <p>Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de São Paulo/SP para dirimir controvérsias.</p>
        <h2>8. Contato</h2>
        <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </>
    ),
  },
  disclaimer: {
    meta: {
      title: "Disclaimer Financeiro · Stella Aurea Capital",
      description: "Aviso legal sobre a natureza educacional e informativa do conteúdo disponibilizado pela Stella Aurea Capital.",
      eyebrow: "Legal · Disclaimer",
      heading: "Disclaimer Financeiro",
      updatedAt: "14 de junho de 2026",
    },
    body: (
      <>
        <p><strong>Atenção:</strong> as informações disponibilizadas neste site possuem caráter exclusivamente educacional e informativo. Não constituem, em nenhuma hipótese:</p>
        <ul>
          <li>Recomendação personalizada de investimento;</li>
          <li>Oferta pública de valores mobiliários;</li>
          <li>Análise de investimento nos termos da Resolução CVM nº 20/2021;</li>
          <li>Consultoria de valores mobiliários nos termos da Resolução CVM nº 19/2021;</li>
          <li>Promessa, garantia ou indicação de rentabilidade futura.</li>
        </ul>
        <h2>Riscos</h2>
        <p>Todo investimento envolve riscos, incluindo a possibilidade de perda total do capital investido. Rentabilidade passada não é garantia de rentabilidade futura. Antes de investir, avalie cuidadosamente seus objetivos, perfil de risco e situação financeira, e — se necessário — consulte um profissional habilitado e devidamente credenciado pela CVM.</p>
        <h2>Independência editorial</h2>
        <p>O conteúdo é produzido com base em fontes consideradas confiáveis, mas a Stella Aurea Capital não garante exatidão, integridade ou atualidade absoluta das informações, e pode atualizá-las sem aviso prévio.</p>
        <h2>Responsabilidade</h2>
        <p>A Stella Aurea Capital não se responsabiliza por decisões de investimento, prejuízos ou danos diretos ou indiretos resultantes do uso das informações aqui veiculadas.</p>
      </>
    ),
  },
  lgpd: {
    meta: {
      title: "Canal LGPD · Stella Aurea Capital",
      description: "Canal oficial da Stella Aurea Capital para solicitações relativas a dados pessoais conforme a LGPD.",
      eyebrow: "Titular de Dados · LGPD",
      heading: "Canal LGPD",
      updatedAt: "14 de junho de 2026",
    },
    body: (
      <>
        <p>Este é o canal oficial para o exercício dos direitos previstos no art. 18 da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
        <h2>Direitos do titular</h2>
        <ul>
          <li>Confirmação da existência de tratamento;</li>
          <li>Acesso aos dados;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a LGPD;</li>
          <li>Portabilidade dos dados;</li>
          <li>Eliminação dos dados tratados com consentimento;</li>
          <li>Informação sobre compartilhamentos;</li>
          <li>Revogação do consentimento.</li>
        </ul>
        <h2>Como solicitar</h2>
        <p>Envie um e-mail para <a href={`mailto:${EMAIL}?subject=Solicita%C3%A7%C3%A3o%20LGPD`}>{EMAIL}</a> com:</p>
        <ul>
          <li>Nome completo;</li>
          <li>E-mail/telefone cadastrado;</li>
          <li>Descrição clara da solicitação (qual direito deseja exercer);</li>
          <li>Documento que comprove identidade (para sua proteção).</li>
        </ul>
        <p>Atenderemos sua solicitação no menor prazo possível, observado o limite legal de 15 dias para resposta a requisições de acesso e portabilidade.</p>
        <h2>Encarregado pelo Tratamento (DPO)</h2>
        <p>E-mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <h2>ANPD</h2>
        <p>Caso entenda necessário, você pode também apresentar reclamação à Autoridade Nacional de Proteção de Dados (<a href="https://www.gov.br/anpd" target="_blank" rel="noopener">gov.br/anpd</a>).</p>
      </>
    ),
  },
  seguranca: {
    meta: {
      title: "Segurança e Privacidade · Stella Aurea Capital",
      description: "Como a Stella Aurea Capital protege os dados de seus clientes e visitantes — práticas, criptografia, conformidade e canais de incidente.",
      eyebrow: "Segurança · Privacidade",
      heading: "Segurança e Privacidade",
      updatedAt: "14 de junho de 2026",
    },
    body: (
      <>
        <p>A segurança da informação é parte estrutural da Stella Aurea Capital. Adotamos práticas alinhadas a referenciais de mercado (OWASP, ISO 27001 — princípios) e à LGPD.</p>
        <h2>Proteção em camadas</h2>
        <ul>
          <li><strong>Criptografia em trânsito:</strong> todas as conexões utilizam HTTPS/TLS.</li>
          <li><strong>Cabeçalhos de segurança:</strong> Content-Security-Policy, X-Content-Type-Options, Referrer-Policy e Permissions-Policy aplicados.</li>
          <li><strong>Validação de entrada:</strong> todos os formulários validam dados client-side e são tratados com sanitização adequada.</li>
          <li><strong>Anti-spam:</strong> mecanismos de honeypot e tempo mínimo de submissão; estrutura preparada para Google reCAPTCHA v3.</li>
          <li><strong>Privacidade por padrão:</strong> coletamos apenas os dados estritamente necessários; analytics carregam somente com consentimento.</li>
        </ul>
        <h2>LGPD</h2>
        <p>Cumprimos integralmente a Lei nº 13.709/2018. Detalhes em <a href="/privacidade">Política de Privacidade</a> e <a href="/lgpd">Canal LGPD</a>.</p>
        <h2>Boas práticas para você</h2>
        <ul>
          <li>Desconfie de mensagens não solicitadas em nome da Stella Aurea Capital pedindo dados sensíveis.</li>
          <li>Verifique sempre o domínio oficial: stellaaureacapital.com.br.</li>
          <li>Não compartilhamos senhas, tokens ou dados bancários por mensagem.</li>
        </ul>
        <h2>Reporte de incidente</h2>
        <p>Se identificar uma vulnerabilidade ou incidente, escreva para <a href={`mailto:${EMAIL}?subject=Reporte%20de%20Seguran%C3%A7a`}>{EMAIL}</a> com o título "Reporte de Segurança" e descreva o ocorrido. Agradecemos a divulgação responsável.</p>
      </>
    ),
  },
};

/* ---------------- ENGLISH ---------------- */
const en: Record<Key, LegalPage> = {
  privacidade: {
    meta: {
      title: "Privacy Policy · Stella Aurea Capital",
      description:
        "Stella Aurea Capital's Privacy Policy — how we collect, use and protect your personal data in compliance with Brazil's LGPD.",
      eyebrow: "Legal · Data Protection",
      heading: "Privacy Policy",
      updatedAt: "June 14, 2026",
    },
    body: (
      <>
        <p>
          Stella Aurea Capital ("we", "our") respects your privacy and is committed
          to protecting your personal data, in compliance with Brazil's General Data
          Protection Law — Law No. 13,709/2018 ("LGPD"), the reference framework
          for all data processing carried out by us.
        </p>
        <h2>1. Data we collect</h2>
        <ul>
          <li><strong>Contact data:</strong> name, email, phone (when provided via forms).</li>
          <li><strong>Browsing data:</strong> IP address, browser type, pages visited and time spent, through cookies and similar technologies.</li>
          <li><strong>Voluntarily provided data:</strong> content of messages sent through our contact forms.</li>
        </ul>
        <h2>2. Purposes of processing</h2>
        <ul>
          <li>Respond to requests and provide service.</li>
          <li>Send communications about services and educational content (with consent).</li>
          <li>Improve the browsing experience and site quality.</li>
          <li>Comply with legal and regulatory obligations.</li>
        </ul>
        <h2>3. Legal basis</h2>
        <p>We process data based on: the data subject's consent, performance of a contract, compliance with legal obligations and legitimate interest, pursuant to Article 7 of the LGPD.</p>
        <h2>4. Data sharing</h2>
        <p>We do not sell your data. We only share with providers essential to operations (e.g., hosting, email, analytics), all contractually bound to protect your data.</p>
        <h2>5. Data subject rights</h2>
        <p>You may at any time: confirm the existence of processing, access, correct, anonymize, port, delete data, revoke consent and request information about sharing. To exercise your rights, please use our <a href="/lgpd">Data Protection Channel</a>.</p>
        <h2>6. Security</h2>
        <p>We adopt technical and administrative measures to protect your data — including encryption in transit (HTTPS), access control and monitoring. Details at <a href="/seguranca">Security &amp; Privacy</a>.</p>
        <h2>7. Retention</h2>
        <p>We keep data for as long as necessary for the stated purposes or as required by law. After this period, data is deleted or anonymized.</p>
        <h2>8. Cookies</h2>
        <p>We use necessary, analytics, marketing and functional cookies. Learn more and manage your preferences in our <a href="/cookies">Cookie Policy</a>.</p>
        <h2>9. Data Protection Officer (DPO)</h2>
        <p>Contact: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <h2>10. Changes</h2>
        <p>This policy may be updated. We recommend reviewing this page periodically.</p>
      </>
    ),
  },
  cookies: {
    meta: {
      title: "Cookie Policy · Stella Aurea Capital",
      description: "How Stella Aurea Capital uses cookies and how you can manage your preferences.",
      eyebrow: "Legal · Cookies",
      heading: "Cookie Policy",
      updatedAt: "June 14, 2026",
    },
    body: (
      <>
        <p>Cookies are small files stored on your device to enable the site to function properly and improve your experience.</p>
        <h2>Categories used</h2>
        <ul>
          <li><strong>Necessary:</strong> indispensable for the site to operate. Always active.</li>
          <li><strong>Analytics:</strong> collect aggregated data on site usage (e.g., Google Analytics, Microsoft Clarity).</li>
          <li><strong>Marketing:</strong> allow campaign measurement and personalized communications.</li>
          <li><strong>Functional:</strong> enable additional features such as language preferences and embedded content.</li>
        </ul>
        <h2>How to manage</h2>
        <p>When accessing the site, you can accept all, reject or customize your preferences in the cookie banner. To change preferences at any time, clear your browser cookies and visit the site again, or contact us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        <h2>Third-party cookies</h2>
        <p>When loaded (subject to your consent), Google Analytics, Google Tag Manager and Microsoft Clarity may store their own cookies, governed by their respective privacy policies.</p>
      </>
    ),
  },
  termos: {
    meta: {
      title: "Terms of Use · Stella Aurea Capital",
      description: "Terms of Use governing access to and use of the Stella Aurea Capital website.",
      eyebrow: "Legal · Terms",
      heading: "Terms of Use",
      updatedAt: "June 14, 2026",
    },
    body: (
      <>
        <p>By accessing and using the Stella Aurea Capital website you agree to these Terms of Use. If you do not agree, we recommend that you do not use the site.</p>
        <h2>1. Purpose</h2>
        <p>The site provides educational, informational and institutional content about financial markets, wealth advisory and investments.</p>
        <h2>2. Nature of content</h2>
        <p>All information has an exclusively educational and informational character and does not constitute an investment recommendation, an offer of securities or individualized financial advice. See our <a href="/disclaimer">Financial Disclaimer</a>.</p>
        <h2>3. Intellectual property</h2>
        <p>All content (texts, logos, visual identity, materials) is the property of Stella Aurea Capital or its licensors and may not be reproduced without prior authorization.</p>
        <h2>4. User conduct</h2>
        <p>You may not use the site for unlawful purposes, attempt to bypass security mechanisms, perform reverse engineering, send spam or offensive content.</p>
        <h2>5. External links</h2>
        <p>The site may contain third-party links. We are not responsible for the content or policies of those sites.</p>
        <h2>6. Limitation of liability</h2>
        <p>Stella Aurea Capital is not liable for investment decisions made based on the site's content. Investments involve risks.</p>
        <h2>7. Jurisdiction</h2>
        <p>These Terms are governed by Brazilian law. The courts of São Paulo/SP are elected to resolve any disputes.</p>
        <h2>8. Contact</h2>
        <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </>
    ),
  },
  disclaimer: {
    meta: {
      title: "Financial Disclaimer · Stella Aurea Capital",
      description: "Legal notice regarding the educational and informational nature of the content provided by Stella Aurea Capital.",
      eyebrow: "Legal · Disclaimer",
      heading: "Financial Disclaimer",
      updatedAt: "June 14, 2026",
    },
    body: (
      <>
        <p><strong>Notice:</strong> the information provided on this site has an exclusively educational and informational character. Under no circumstances does it constitute:</p>
        <ul>
          <li>A personalized investment recommendation;</li>
          <li>A public offering of securities;</li>
          <li>Investment analysis under CVM Resolution No. 20/2021;</li>
          <li>Securities advisory under CVM Resolution No. 19/2021;</li>
          <li>Any promise, guarantee or indication of future returns.</li>
        </ul>
        <h2>Risks</h2>
        <p>All investments involve risks, including the possible total loss of invested capital. Past performance is no guarantee of future results. Before investing, carefully evaluate your objectives, risk profile and financial situation and — if necessary — consult a professional duly authorized by the CVM.</p>
        <h2>Editorial independence</h2>
        <p>Content is produced based on sources considered reliable, but Stella Aurea Capital does not guarantee absolute accuracy, completeness or timeliness and may update content without prior notice.</p>
        <h2>Liability</h2>
        <p>Stella Aurea Capital is not liable for investment decisions, losses or direct or indirect damages arising from the use of the information published here.</p>
      </>
    ),
  },
  lgpd: {
    meta: {
      title: "Data Protection Channel · Stella Aurea Capital",
      description: "Stella Aurea Capital's official channel for personal data requests under Brazil's LGPD.",
      eyebrow: "Data Subject · LGPD",
      heading: "Data Protection Channel",
      updatedAt: "June 14, 2026",
    },
    body: (
      <>
        <p>This is the official channel for exercising the rights set out in Article 18 of Brazil's General Data Protection Law (Law No. 13,709/2018 — LGPD).</p>
        <h2>Data subject rights</h2>
        <ul>
          <li>Confirmation that processing exists;</li>
          <li>Access to data;</li>
          <li>Correction of incomplete, inaccurate or outdated data;</li>
          <li>Anonymization, blocking or deletion of unnecessary data or data processed in non-compliance with the LGPD;</li>
          <li>Data portability;</li>
          <li>Deletion of data processed with consent;</li>
          <li>Information about data sharing;</li>
          <li>Revocation of consent.</li>
        </ul>
        <h2>How to submit a request</h2>
        <p>Send an email to <a href={`mailto:${EMAIL}?subject=LGPD%20Request`}>{EMAIL}</a> with:</p>
        <ul>
          <li>Full name;</li>
          <li>Registered email/phone;</li>
          <li>Clear description of your request (which right you wish to exercise);</li>
          <li>Identity document (for your protection).</li>
        </ul>
        <p>We will respond as soon as possible, observing the 15-day legal deadline for access and portability requests.</p>
        <h2>Data Protection Officer (DPO)</h2>
        <p>Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <h2>ANPD</h2>
        <p>If you deem it necessary, you may also file a complaint with the Brazilian National Data Protection Authority (<a href="https://www.gov.br/anpd" target="_blank" rel="noopener">gov.br/anpd</a>).</p>
      </>
    ),
  },
  seguranca: {
    meta: {
      title: "Security &amp; Privacy · Stella Aurea Capital",
      description: "How Stella Aurea Capital protects its clients' and visitors' data — practices, encryption, compliance and incident channels.",
      eyebrow: "Security · Privacy",
      heading: "Security & Privacy",
      updatedAt: "June 14, 2026",
    },
    body: (
      <>
        <p>Information security is structural to Stella Aurea Capital. We follow market-standard references (OWASP, ISO 27001 principles) and Brazil's LGPD.</p>
        <h2>Layered protection</h2>
        <ul>
          <li><strong>Encryption in transit:</strong> all connections use HTTPS/TLS.</li>
          <li><strong>Security headers:</strong> Content-Security-Policy, X-Content-Type-Options, Referrer-Policy and Permissions-Policy are applied.</li>
          <li><strong>Input validation:</strong> all forms validate data client-side and are handled with proper sanitization.</li>
          <li><strong>Anti-spam:</strong> honeypot mechanisms and minimum submission time; architecture ready for Google reCAPTCHA v3.</li>
          <li><strong>Privacy by default:</strong> we only collect strictly necessary data; analytics only load with consent.</li>
        </ul>
        <h2>LGPD</h2>
        <p>We fully comply with Law No. 13,709/2018. Details in our <a href="/privacidade">Privacy Policy</a> and <a href="/lgpd">Data Protection Channel</a>.</p>
        <h2>Good practices for you</h2>
        <ul>
          <li>Be suspicious of unsolicited messages claiming to be from Stella Aurea Capital and requesting sensitive data.</li>
          <li>Always verify the official domain: stellaaureacapital.com.br.</li>
          <li>We do not share passwords, tokens or banking data via messaging.</li>
        </ul>
        <h2>Incident reporting</h2>
        <p>If you identify a vulnerability or incident, write to <a href={`mailto:${EMAIL}?subject=Security%20Report`}>{EMAIL}</a> with the subject "Security Report" and describe what happened. We appreciate responsible disclosure.</p>
      </>
    ),
  },
};

/* ---------------- ESPAÑOL ---------------- */
const es: Record<Key, LegalPage> = {
  privacidade: {
    meta: {
      title: "Política de Privacidad · Stella Aurea Capital",
      description:
        "Política de Privacidad de Stella Aurea Capital — cómo recopilamos, usamos y protegemos sus datos personales conforme a la LGPD de Brasil.",
      eyebrow: "Legal · Protección de Datos",
      heading: "Política de Privacidad",
      updatedAt: "14 de junio de 2026",
    },
    body: (
      <>
        <p>
          Stella Aurea Capital ("nosotros") respeta su privacidad y está comprometida
          con la protección de sus datos personales, conforme a la Ley General de
          Protección de Datos Personales de Brasil — Ley nº 13.709/2018 ("LGPD"),
          marco normativo aplicable a nuestros tratamientos.
        </p>
        <h2>1. Datos que recopilamos</h2>
        <ul>
          <li><strong>Datos de contacto:</strong> nombre, correo electrónico, teléfono (cuando se informan en formularios).</li>
          <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia, mediante cookies y tecnologías similares.</li>
          <li><strong>Datos proporcionados voluntariamente:</strong> contenido de los mensajes enviados a través de los formularios de contacto.</li>
        </ul>
        <h2>2. Finalidades del tratamiento</h2>
        <ul>
          <li>Atender solicitudes y prestar servicio.</li>
          <li>Enviar comunicaciones sobre servicios y contenidos educativos (con consentimiento).</li>
          <li>Mejorar la experiencia de navegación y la calidad del sitio.</li>
          <li>Cumplir obligaciones legales y regulatorias.</li>
        </ul>
        <h2>3. Base legal</h2>
        <p>Tratamos los datos sobre la base de: consentimiento del titular, ejecución de contrato, cumplimiento de obligación legal e interés legítimo, conforme al art. 7º de la LGPD.</p>
        <h2>4. Compartición de datos</h2>
        <p>No vendemos sus datos. Solo los compartimos con proveedores esenciales para la operación (alojamiento, correo, analítica), todos contractualmente obligados a protegerlos.</p>
        <h2>5. Derechos del titular</h2>
        <p>En cualquier momento usted puede: confirmar la existencia de tratamiento, acceder, corregir, anonimizar, portar y eliminar datos, revocar el consentimiento y solicitar información sobre la compartición. Para ejercer sus derechos, utilice nuestro <a href="/lgpd">Canal LGPD</a>.</p>
        <h2>6. Seguridad</h2>
        <p>Adoptamos medidas técnicas y administrativas para proteger sus datos — incluyendo cifrado en tránsito (HTTPS), control de acceso y monitoreo. Detalles en <a href="/seguranca">Seguridad y Privacidad</a>.</p>
        <h2>7. Retención</h2>
        <p>Conservamos los datos durante el tiempo necesario para las finalidades informadas o exigido por ley. Transcurrido ese plazo, se eliminan o anonimizan.</p>
        <h2>8. Cookies</h2>
        <p>Utilizamos cookies necesarias, analíticas, de marketing y funcionales. Más información y gestión de preferencias en nuestra <a href="/cookies">Política de Cookies</a>.</p>
        <h2>9. Encargado del Tratamiento de Datos (DPO)</h2>
        <p>Contacto: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <h2>10. Modificaciones</h2>
        <p>Esta política puede ser actualizada. Recomendamos revisarla periódicamente.</p>
      </>
    ),
  },
  cookies: {
    meta: {
      title: "Política de Cookies · Stella Aurea Capital",
      description: "Cómo utiliza Stella Aurea Capital las cookies y cómo puede gestionar sus preferencias.",
      eyebrow: "Legal · Cookies",
      heading: "Política de Cookies",
      updatedAt: "14 de junio de 2026",
    },
    body: (
      <>
        <p>Las cookies son pequeños archivos almacenados en su dispositivo para permitir el funcionamiento adecuado del sitio y mejorar su experiencia.</p>
        <h2>Categorías utilizadas</h2>
        <ul>
          <li><strong>Necesarias:</strong> imprescindibles para el funcionamiento del sitio. Siempre activas.</li>
          <li><strong>Analíticas:</strong> recopilan datos agregados sobre el uso del sitio (p. ej., Google Analytics, Microsoft Clarity).</li>
          <li><strong>Marketing:</strong> permiten medir campañas y personalizar comunicaciones.</li>
          <li><strong>Funcionales:</strong> habilitan funciones adicionales como preferencias de idioma y contenido incrustado.</li>
        </ul>
        <h2>Cómo gestionar</h2>
        <p>Al acceder al sitio puede aceptar todo, rechazar o personalizar sus preferencias en el banner de cookies. Para cambiarlas en cualquier momento, borre las cookies del navegador y vuelva a visitar el sitio, o escríbanos a <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        <h2>Cookies de terceros</h2>
        <p>Cuando se cargan (previo consentimiento), Google Analytics, Google Tag Manager y Microsoft Clarity pueden almacenar cookies propias, sujetas a sus respectivas políticas de privacidad.</p>
      </>
    ),
  },
  termos: {
    meta: {
      title: "Términos de Uso · Stella Aurea Capital",
      description: "Términos de Uso que regulan el acceso y la utilización del sitio de Stella Aurea Capital.",
      eyebrow: "Legal · Términos",
      heading: "Términos de Uso",
      updatedAt: "14 de junio de 2026",
    },
    body: (
      <>
        <p>Al acceder y utilizar el sitio de Stella Aurea Capital, usted acepta los presentes Términos de Uso. Si no está de acuerdo, le recomendamos no utilizar el sitio.</p>
        <h2>1. Objeto</h2>
        <p>El sitio ofrece contenido educativo, informativo e institucional sobre mercado financiero, asesoría patrimonial e inversiones.</p>
        <h2>2. Naturaleza del contenido</h2>
        <p>La información tiene carácter exclusivamente educativo e informativo y no constituye recomendación de inversión, oferta de valores ni asesoría financiera individualizada. Vea nuestro <a href="/disclaimer">Aviso Financiero</a>.</p>
        <h2>3. Propiedad intelectual</h2>
        <p>Todo el contenido (textos, logotipos, identidad visual, materiales) es propiedad de Stella Aurea Capital o de sus licenciantes, estando prohibida su reproducción sin autorización previa.</p>
        <h2>4. Conducta del usuario</h2>
        <p>Está prohibido utilizar el sitio con fines ilícitos, intentar eludir mecanismos de seguridad, ejecutar ingeniería inversa, enviar spam o contenido ofensivo.</p>
        <h2>5. Enlaces externos</h2>
        <p>El sitio puede contener enlaces a terceros. No nos responsabilizamos por el contenido ni por las políticas de esos sitios.</p>
        <h2>6. Limitación de responsabilidad</h2>
        <p>Stella Aurea Capital no se responsabiliza por decisiones de inversión tomadas con base en el contenido del sitio. Toda inversión implica riesgos.</p>
        <h2>7. Jurisdicción</h2>
        <p>Estos Términos se rigen por la legislación brasileña. Se elige el foro de São Paulo/SP para dirimir controversias.</p>
        <h2>8. Contacto</h2>
        <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </>
    ),
  },
  disclaimer: {
    meta: {
      title: "Aviso Financiero · Stella Aurea Capital",
      description: "Aviso legal sobre la naturaleza educativa e informativa del contenido publicado por Stella Aurea Capital.",
      eyebrow: "Legal · Aviso",
      heading: "Aviso Financiero",
      updatedAt: "14 de junio de 2026",
    },
    body: (
      <>
        <p><strong>Atención:</strong> la información disponible en este sitio tiene carácter exclusivamente educativo e informativo. En ningún caso constituye:</p>
        <ul>
          <li>Recomendación personalizada de inversión;</li>
          <li>Oferta pública de valores;</li>
          <li>Análisis de inversión conforme a la Resolución CVM nº 20/2021;</li>
          <li>Asesoría de valores conforme a la Resolución CVM nº 19/2021;</li>
          <li>Promesa, garantía o indicación de rentabilidad futura.</li>
        </ul>
        <h2>Riesgos</h2>
        <p>Toda inversión implica riesgos, incluida la posibilidad de pérdida total del capital invertido. La rentabilidad pasada no garantiza la rentabilidad futura. Antes de invertir, evalúe cuidadosamente sus objetivos, perfil de riesgo y situación financiera y, si es necesario, consulte a un profesional debidamente habilitado por la CVM.</p>
        <h2>Independencia editorial</h2>
        <p>El contenido se produce a partir de fuentes consideradas confiables, pero Stella Aurea Capital no garantiza exactitud, integridad ni actualidad absolutas, y puede actualizarlo sin previo aviso.</p>
        <h2>Responsabilidad</h2>
        <p>Stella Aurea Capital no se responsabiliza por decisiones de inversión, pérdidas o daños directos o indirectos derivados del uso de la información aquí publicada.</p>
      </>
    ),
  },
  lgpd: {
    meta: {
      title: "Canal LGPD · Stella Aurea Capital",
      description: "Canal oficial de Stella Aurea Capital para solicitudes sobre datos personales conforme a la LGPD de Brasil.",
      eyebrow: "Titular de Datos · LGPD",
      heading: "Canal LGPD",
      updatedAt: "14 de junio de 2026",
    },
    body: (
      <>
        <p>Este es el canal oficial para el ejercicio de los derechos previstos en el art. 18 de la Ley General de Protección de Datos de Brasil (Ley nº 13.709/2018 — LGPD).</p>
        <h2>Derechos del titular</h2>
        <ul>
          <li>Confirmación de la existencia de tratamiento;</li>
          <li>Acceso a los datos;</li>
          <li>Corrección de datos incompletos, inexactos o desactualizados;</li>
          <li>Anonimización, bloqueo o eliminación de datos innecesarios o tratados en desacuerdo con la LGPD;</li>
          <li>Portabilidad de los datos;</li>
          <li>Eliminación de los datos tratados con consentimiento;</li>
          <li>Información sobre compartición;</li>
          <li>Revocación del consentimiento.</li>
        </ul>
        <h2>Cómo solicitar</h2>
        <p>Envíe un correo a <a href={`mailto:${EMAIL}?subject=Solicitud%20LGPD`}>{EMAIL}</a> con:</p>
        <ul>
          <li>Nombre completo;</li>
          <li>Correo/teléfono registrado;</li>
          <li>Descripción clara de la solicitud (qué derecho desea ejercer);</li>
          <li>Documento que acredite identidad (para su protección).</li>
        </ul>
        <p>Atenderemos su solicitud en el menor plazo posible, observado el límite legal de 15 días para respuestas a solicitudes de acceso y portabilidad.</p>
        <h2>Encargado del Tratamiento (DPO)</h2>
        <p>Correo: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <h2>ANPD</h2>
        <p>Si lo considera necesario, también puede presentar una reclamación ante la Autoridad Nacional de Protección de Datos de Brasil (<a href="https://www.gov.br/anpd" target="_blank" rel="noopener">gov.br/anpd</a>).</p>
      </>
    ),
  },
  seguranca: {
    meta: {
      title: "Seguridad y Privacidad · Stella Aurea Capital",
      description: "Cómo Stella Aurea Capital protege los datos de sus clientes y visitantes — prácticas, cifrado, cumplimiento y canales de incidente.",
      eyebrow: "Seguridad · Privacidad",
      heading: "Seguridad y Privacidad",
      updatedAt: "14 de junio de 2026",
    },
    body: (
      <>
        <p>La seguridad de la información es parte estructural de Stella Aurea Capital. Adoptamos prácticas alineadas con referencias de mercado (OWASP, principios de ISO 27001) y con la LGPD de Brasil.</p>
        <h2>Protección por capas</h2>
        <ul>
          <li><strong>Cifrado en tránsito:</strong> todas las conexiones utilizan HTTPS/TLS.</li>
          <li><strong>Cabeceras de seguridad:</strong> Content-Security-Policy, X-Content-Type-Options, Referrer-Policy y Permissions-Policy aplicadas.</li>
          <li><strong>Validación de entrada:</strong> todos los formularios validan datos en el cliente y son tratados con la sanitización adecuada.</li>
          <li><strong>Anti-spam:</strong> mecanismos de honeypot y tiempo mínimo de envío; arquitectura preparada para Google reCAPTCHA v3.</li>
          <li><strong>Privacidad por defecto:</strong> recopilamos solo los datos estrictamente necesarios; la analítica solo se carga con consentimiento.</li>
        </ul>
        <h2>LGPD</h2>
        <p>Cumplimos íntegramente la Ley nº 13.709/2018. Detalles en <a href="/privacidade">Política de Privacidad</a> y <a href="/lgpd">Canal LGPD</a>.</p>
        <h2>Buenas prácticas para usted</h2>
        <ul>
          <li>Desconfíe de mensajes no solicitados que aparenten ser de Stella Aurea Capital y soliciten datos sensibles.</li>
          <li>Verifique siempre el dominio oficial: stellaaureacapital.com.br.</li>
          <li>No compartimos contraseñas, tokens ni datos bancarios por mensajería.</li>
        </ul>
        <h2>Reporte de incidente</h2>
        <p>Si identifica una vulnerabilidad o incidente, escriba a <a href={`mailto:${EMAIL}?subject=Reporte%20de%20Seguridad`}>{EMAIL}</a> con el asunto "Reporte de Seguridad" y describa lo ocurrido. Agradecemos la divulgación responsable.</p>
      </>
    ),
  },
};

const all: Record<Lang, Record<Key, LegalPage>> = { pt, en, es };

export const getLegal = (lang: Lang, key: Key): LegalPage => all[lang][key];
export type { Key as LegalKey };