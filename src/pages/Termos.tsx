import LegalLayout from "@/components/legal/LegalLayout";

const Termos = () => (
  <LegalLayout
    title="Termos de Uso · Stella Aurea Capital"
    description="Termos de Uso que regulam o acesso e a utilização do site da Stella Aurea Capital."
    path="/termos"
    eyebrow="Legal · Termos"
    heading="Termos de Uso"
    updatedAt="14 de junho de 2026"
  >
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
    <p><a href="mailto:stellaaureacapital@gmail.com">stellaaureacapital@gmail.com</a></p>
  </LegalLayout>
);

export default Termos;