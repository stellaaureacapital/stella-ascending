import LegalLayout from "@/components/legal/LegalLayout";

const Cookies = () => (
  <LegalLayout
    title="Política de Cookies · Stella Aurea Capital"
    description="Como a Stella Aurea Capital utiliza cookies e como você pode gerenciar suas preferências."
    path="/cookies"
    eyebrow="Legal · Cookies"
    heading="Política de Cookies"
    updatedAt="14 de junho de 2026"
  >
    <p>Cookies são pequenos arquivos armazenados no seu dispositivo para permitir o funcionamento adequado do site e melhorar sua experiência.</p>

    <h2>Categorias utilizadas</h2>
    <ul>
      <li><strong>Necessários:</strong> indispensáveis ao funcionamento do site. Sempre ativos.</li>
      <li><strong>Analíticos:</strong> coletam dados agregados sobre o uso do site (ex.: Google Analytics, Microsoft Clarity).</li>
      <li><strong>Marketing:</strong> permitem mensurar campanhas e personalizar comunicações.</li>
      <li><strong>Funcionais:</strong> habilitam recursos adicionais como preferências de idioma e conteúdo incorporado.</li>
    </ul>

    <h2>Como gerenciar</h2>
    <p>Ao acessar o site, você pode aceitar todos, recusar ou personalizar suas preferências no banner de cookies. Para alterar a qualquer momento, limpe os cookies do navegador e visite novamente o site, ou entre em contato em <a href="mailto:stellaaureacapital@gmail.com">stellaaureacapital@gmail.com</a>.</p>

    <h2>Cookies de terceiros</h2>
    <p>Quando carregados (mediante seu consentimento), Google Analytics, Google Tag Manager e Microsoft Clarity podem armazenar cookies próprios, sujeitos às respectivas políticas de privacidade.</p>
  </LegalLayout>
);

export default Cookies;