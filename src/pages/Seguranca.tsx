import LegalLayout from "@/components/legal/LegalLayout";

const Seguranca = () => (
  <LegalLayout
    title="Segurança e Privacidade · Stella Aurea Capital"
    description="Como a Stella Aurea Capital protege os dados de seus clientes e visitantes — práticas, criptografia, conformidade e canais de incidente."
    path="/seguranca"
    eyebrow="Segurança · Privacidade"
    heading="Segurança e Privacidade"
    updatedAt="14 de junho de 2026"
  >
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
    <p>Se identificar uma vulnerabilidade ou incidente, escreva para <a href="mailto:stellaaureacapital@gmail.com?subject=Reporte%20de%20Seguran%C3%A7a">stellaaureacapital@gmail.com</a> com o título "Reporte de Segurança" e descreva o ocorrido. Agradecemos a divulgação responsável.</p>
  </LegalLayout>
);

export default Seguranca;