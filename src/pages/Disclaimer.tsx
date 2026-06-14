import LegalLayout from "@/components/legal/LegalLayout";

const Disclaimer = () => (
  <LegalLayout
    title="Disclaimer Financeiro · Stella Aurea Capital"
    description="Aviso legal sobre a natureza educacional e informativa do conteúdo disponibilizado pela Stella Aurea Capital."
    path="/disclaimer"
    eyebrow="Legal · Disclaimer"
    heading="Disclaimer Financeiro"
    updatedAt="14 de junho de 2026"
  >
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
  </LegalLayout>
);

export default Disclaimer;