import LegalLayout from "@/components/legal/LegalLayout";

const Lgpd = () => (
  <LegalLayout
    title="Canal LGPD · Stella Aurea Capital"
    description="Canal oficial da Stella Aurea Capital para solicitações relativas a dados pessoais conforme a LGPD."
    path="/lgpd"
    eyebrow="Titular de Dados · LGPD"
    heading="Canal LGPD"
    updatedAt="14 de junho de 2026"
  >
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
    <p>Envie um e-mail para <a href="mailto:stellaaureacapital@gmail.com?subject=Solicita%C3%A7%C3%A3o%20LGPD">stellaaureacapital@gmail.com</a> com:</p>
    <ul>
      <li>Nome completo;</li>
      <li>E-mail/telefone cadastrado;</li>
      <li>Descrição clara da solicitação (qual direito deseja exercer);</li>
      <li>Documento que comprove identidade (para sua proteção).</li>
    </ul>
    <p>Atenderemos sua solicitação no menor prazo possível, observado o limite legal de 15 dias para resposta a requisições de acesso e portabilidade.</p>

    <h2>Encarregado pelo Tratamento (DPO)</h2>
    <p>E-mail: <a href="mailto:stellaaureacapital@gmail.com">stellaaureacapital@gmail.com</a></p>

    <h2>ANPD</h2>
    <p>Caso entenda necessário, você pode também apresentar reclamação à Autoridade Nacional de Proteção de Dados (<a href="https://www.gov.br/anpd" target="_blank" rel="noopener">gov.br/anpd</a>).</p>
  </LegalLayout>
);

export default Lgpd;