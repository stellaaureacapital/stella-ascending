import type { ComponentType } from "react";
import {
  CalcShell, Field, FieldGrid, SelectField, Panel, Stat, StatGrid, ChartArea, ChartBars, DataTable,
  useCalcInputs, validate, brl, pct, num, useMemoCalc, type TableData,
} from "@/components/calc/kit";
import {
  compound, toMonthly, realRate, requiredContribution, monthsToGoal, rateForGoal, schedule,
  effectiveCost, simulateInvestment, retirement, payoffDebts, type RatePeriod,
} from "@/lib/finance/core";
import { useSeo } from "@/hooks/use-seo";

const periodOpts: { value: RatePeriod; label: string }[] = [
  { value: "year", label: "ao ano" },
  { value: "month", label: "ao mês" },
];
const timingOpts = [
  { value: "end" as const, label: "Final do mês" },
  { value: "start" as const, label: "Início do mês" },
];

/* ------------------------------ Juros compostos ------------------------------ */
const JurosCompostos = () => {
  const slug = "juros-compostos";
  const { inputs: i, set, reset } = useCalcInputs(slug, {
    initial: "10000", rate: "12", period: "year" as RatePeriod, years: "10", contribution: "1000",
    timing: "end" as "end" | "start", inflation: "4,5",
  });
  const { v, errors, ok } = validate(i, {
    initial: { label: "Inicial", min: 0 }, rate: { label: "Taxa", min: -50, max: 100 },
    years: { label: "Prazo", gt: 0, max: 100 }, contribution: { label: "Aporte", min: 0, optional: true },
    inflation: { label: "Inflação", min: -20, max: 100, optional: true },
  });
  const r = useMemoCalc(() => ok ? compound({
    initial: v.initial, monthlyRate: toMonthly(v.rate / 100, i.period), months: Math.round(v.years * 12),
    contribution: v.contribution, every: 1, timing: i.timing, annualInflation: v.inflation / 100,
  }) : null, [ok, JSON.stringify(v), i.period, i.timing]);
  const yearly = r ? r.rows.filter((x) => x.month % 12 === 0) : [];
  const table: TableData | null = r ? { headers: ["Ano", "Aportado", "Juros acumulados", "Saldo", "Saldo real"], rows: yearly.map((x) => [String(x.month / 12), x.contributed, x.interest, x.balance, x.real]) } : null;
  return (
    <CalcShell slug={slug} title="Juros compostos" category="Investimentos" description="Projete o crescimento de um capital com aportes mensais e veja o efeito da inflação."
      inputs={i} onReset={reset} table={table} valid={!!r}
      assumptions={["Capitalização mensal com taxa equivalente composta.", "Aportes constantes, sem reajuste.", "Não considera impostos nem taxas."]}
      form={<div className="space-y-4">
        <Field label="Valor inicial" prefix="R$" value={i.initial} onChange={(x) => set("initial", x)} error={errors.initial} />
        <FieldGrid>
          <Field label="Taxa de juros" suffix="%" value={i.rate} onChange={(x) => set("rate", x)} error={errors.rate} />
          <SelectField label="Período da taxa" value={i.period} onChange={(x) => set("period", x)} options={periodOpts} />
        </FieldGrid>
        <Field label="Prazo" suffix="anos" value={i.years} onChange={(x) => set("years", x)} error={errors.years} />
        <Field label="Aporte mensal" prefix="R$" value={i.contribution} onChange={(x) => set("contribution", x)} error={errors.contribution} />
        <SelectField label="Momento do aporte" value={i.timing} onChange={(x) => set("timing", x)} options={timingOpts} />
        <Field label="Inflação estimada" suffix="% a.a." value={i.inflation} onChange={(x) => set("inflation", x)} error={errors.inflation} />
      </div>}
      results={r && <>
        <StatGrid>
          <Stat emphasis label="Saldo final" value={brl(r.final)} />
          <Stat label="Total aportado" value={brl(r.invested)} />
          <Stat label="Juros ganhos" value={brl(r.interest)} />
          <Stat label="Saldo em valores de hoje" value={brl(r.realFinal)} />
          <Stat label="Retorno sobre aportes" value={pct(r.totalReturn)} />
        </StatGrid>
        <Panel title="Evolução"><ChartArea data={yearly.map((x) => ({ ano: x.month / 12, Saldo: x.balance, Aportado: x.contributed, Real: x.real }))} x="ano" series={[{ key: "Saldo", label: "Saldo" }, { key: "Aportado", label: "Aportado" }, { key: "Real", label: "Saldo real" }]} /></Panel>
        <Panel title="Tabela anual"><DataTable data={table!} /></Panel>
      </>}
    />
  );
};

/* ------------------------------ Metas ------------------------------ */
const Metas = () => {
  const slug = "metas";
  const { inputs: i, set, reset } = useCalcInputs(slug, {
    goal: "500000", initial: "20000", rate: "10", years: "15", contribution: "1500",
  });
  const { v, errors, ok } = validate(i, {
    goal: { label: "Meta", gt: 0 }, initial: { label: "Inicial", min: 0, optional: true },
    rate: { label: "Taxa", min: 0, max: 100 }, years: { label: "Prazo", gt: 0, max: 100 },
    contribution: { label: "Aporte", min: 0, optional: true },
  });
  const r = useMemoCalc(() => {
    if (!ok) return null;
    const m = toMonthly(v.rate / 100, "year");
    const n = Math.round(v.years * 12);
    return {
      need: requiredContribution(v.goal, v.initial, m, n),
      months: monthsToGoal(v.goal, v.initial, m, v.contribution),
      rate: rateForGoal(v.goal, v.initial, v.contribution, n),
    };
  }, [ok, JSON.stringify(v)]);
  return (
    <CalcShell slug={slug} title="Planejamento de metas" category="Planejamento" description="Descubra quanto aportar, em quanto tempo ou a que taxa você atinge seu objetivo."
      inputs={i} onReset={reset} valid={!!r}
      assumptions={["Taxa anual convertida para mensal equivalente.", "Aportes no final de cada mês.", "Valores nominais, sem impostos."]}
      form={<div className="space-y-4">
        <Field label="Meta" prefix="R$" value={i.goal} onChange={(x) => set("goal", x)} error={errors.goal} />
        <Field label="Patrimônio atual" prefix="R$" value={i.initial} onChange={(x) => set("initial", x)} error={errors.initial} />
        <Field label="Rentabilidade esperada" suffix="% a.a." value={i.rate} onChange={(x) => set("rate", x)} error={errors.rate} />
        <Field label="Prazo desejado" suffix="anos" value={i.years} onChange={(x) => set("years", x)} error={errors.years} />
        <Field label="Aporte que posso fazer" prefix="R$" value={i.contribution} onChange={(x) => set("contribution", x)} error={errors.contribution} />
      </div>}
      results={r && <StatGrid>
        <Stat emphasis label="Aporte mensal necessário" value={r.need === null ? "—" : brl(r.need)} />
        <Stat label="Tempo com seu aporte" value={r.months === null ? "Acima de 100 anos" : `${Math.floor(r.months / 12)} anos e ${r.months % 12} meses`} />
        <Stat label="Taxa necessária no prazo" value={r.rate === null ? "Acima de 20% a.m." : `${pct(r.rate)} a.m. · ${pct(Math.pow(1 + r.rate, 12) - 1)} a.a.`} />
      </StatGrid>}
    />
  );
};

/* ------------------------------ Rentabilidade real ------------------------------ */
const RentabilidadeReal = () => {
  const slug = "rentabilidade-real";
  const { inputs: i, set, reset } = useCalcInputs(slug, { nominal: "12", inflation: "4,5", tax: "15" });
  const { v, errors, ok } = validate(i, {
    nominal: { label: "Nominal", min: -100, max: 1000 }, inflation: { label: "Inflação", min: -50, max: 1000 },
    tax: { label: "IR", min: 0, max: 100, optional: true },
  });
  const r = ok ? (() => {
    const net = (v.nominal / 100) * (1 - v.tax / 100);
    return { real: realRate(v.nominal / 100, v.inflation / 100), netReal: realRate(net, v.inflation / 100), net };
  })() : null;
  return (
    <CalcShell slug={slug} title="Rentabilidade real" category="Investimentos" description="Desconte a inflação e o imposto para saber quanto seu dinheiro realmente rendeu."
      inputs={i} onReset={reset} valid={!!r}
      assumptions={["Fórmula de Fisher: (1 + nominal) / (1 + inflação) − 1.", "IR aplicado sobre o rendimento nominal."]}
      form={<div className="space-y-4">
        <Field label="Rentabilidade nominal" suffix="% a.a." value={i.nominal} onChange={(x) => set("nominal", x)} error={errors.nominal} />
        <Field label="Inflação do período" suffix="% a.a." value={i.inflation} onChange={(x) => set("inflation", x)} error={errors.inflation} />
        <Field label="Alíquota de IR" suffix="%" value={i.tax} onChange={(x) => set("tax", x)} error={errors.tax} />
      </div>}
      results={r && <StatGrid>
        <Stat emphasis label="Real líquida de IR" value={pct(r.netReal)} />
        <Stat label="Real bruta" value={pct(r.real)} />
        <Stat label="Nominal líquida" value={pct(r.net)} />
      </StatGrid>}
    />
  );
};

/* ------------------------------ Financiamento ------------------------------ */
const Financiamento = () => {
  const slug = "financiamento";
  const { inputs: i, set, reset } = useCalcInputs(slug, {
    principal: "300000", rate: "10,5", period: "year" as RatePeriod, months: "360", system: "sac" as "sac" | "price",
    fees: "0", extraAmount: "0", extraMonth: "12", mode: "term" as "term" | "installment",
  });
  const { v, errors, ok } = validate(i, {
    principal: { label: "Valor", gt: 0 }, rate: { label: "Taxa", min: 0, max: 100 },
    months: { label: "Prazo", gt: 0, max: 600, int: true }, fees: { label: "Encargos", min: 0, optional: true },
    extraAmount: { label: "Amortização", min: 0, optional: true }, extraMonth: { label: "Mês", min: 1, int: true, optional: true },
  });
  const r = useMemoCalc(() => ok ? schedule({
    principal: v.principal, rate: toMonthly(v.rate / 100, i.period), n: v.months, system: i.system, feesPerPeriod: v.fees,
    prepayments: v.extraAmount > 0 ? [{ period: v.extraMonth, amount: v.extraAmount }] : [], prepayMode: i.mode,
  }) : null, [ok, JSON.stringify(v), i.period, i.system, i.mode]);
  const table: TableData | null = r ? { headers: ["Mês", "Parcela", "Juros", "Amortização", "Encargos", "Extra", "Saldo"], rows: r.rows.map((x) => [String(x.period), x.total, x.interest, x.amortization, x.fees, x.extra, x.balance]) } : null;
  return (
    <CalcShell slug={slug} title="Financiamento (Price e SAC)" category="Crédito" description="Compare sistemas de amortização e veja o impacto de uma amortização extra."
      inputs={i} onReset={reset} table={table} valid={!!r}
      assumptions={["Taxa efetiva convertida para mensal equivalente.", "Encargos fixos somados a cada parcela.", "Valores arredondados ao centavo a cada mês."]}
      form={<div className="space-y-4">
        <Field label="Valor financiado" prefix="R$" value={i.principal} onChange={(x) => set("principal", x)} error={errors.principal} />
        <FieldGrid>
          <Field label="Taxa de juros" suffix="%" value={i.rate} onChange={(x) => set("rate", x)} error={errors.rate} />
          <SelectField label="Período da taxa" value={i.period} onChange={(x) => set("period", x)} options={periodOpts} />
        </FieldGrid>
        <FieldGrid>
          <Field label="Prazo" suffix="meses" value={i.months} onChange={(x) => set("months", x)} error={errors.months} />
          <SelectField label="Sistema" value={i.system} onChange={(x) => set("system", x)} options={[{ value: "sac", label: "SAC" }, { value: "price", label: "Price" }]} />
        </FieldGrid>
        <Field label="Seguros e tarifas por parcela" prefix="R$" value={i.fees} onChange={(x) => set("fees", x)} error={errors.fees} />
        <FieldGrid>
          <Field label="Amortização extra" prefix="R$" value={i.extraAmount} onChange={(x) => set("extraAmount", x)} error={errors.extraAmount} />
          <Field label="No mês" value={i.extraMonth} onChange={(x) => set("extraMonth", x)} error={errors.extraMonth} />
        </FieldGrid>
        <SelectField label="Após amortizar, reduzir" value={i.mode} onChange={(x) => set("mode", x)} options={[{ value: "term", label: "Prazo" }, { value: "installment", label: "Parcela" }]} />
      </div>}
      results={r && <>
        <StatGrid>
          <Stat emphasis label="Primeira parcela" value={brl(r.first)} />
          <Stat label="Última parcela" value={brl(r.last)} />
          <Stat label="Total de juros" value={brl(r.totalInterest)} />
          <Stat label="Total pago" value={brl(r.totalPaid)} />
          <Stat label="Número de parcelas" value={num(r.periods)} />
        </StatGrid>
        <Panel title="Saldo devedor"><ChartArea data={r.rows.filter((x) => x.period % 12 === 0 || x.period === r.periods).map((x) => ({ mes: x.period, Saldo: x.balance }))} x="mes" series={[{ key: "Saldo", label: "Saldo devedor" }]} /></Panel>
        <Panel title="Tabela de amortização"><DataTable data={table!} /></Panel>
      </>}
    />
  );
};

/* ------------------------------ CET ------------------------------ */
const Cet = () => {
  const slug = "cet";
  const { inputs: i, set, reset } = useCalcInputs(slug, { amount: "20000", upfront: "800", rate: "1,99", months: "24", fees: "25" });
  const { v, errors, ok } = validate(i, {
    amount: { label: "Valor", gt: 0 }, upfront: { label: "Tarifas", min: 0, optional: true },
    rate: { label: "Taxa", min: 0, max: 50 }, months: { label: "Prazo", gt: 0, max: 600, int: true },
    fees: { label: "Seguro", min: 0, optional: true },
  });
  const r = useMemoCalc(() => {
    if (!ok || v.upfront >= v.amount) return null;
    const s = schedule({ principal: v.amount, rate: v.rate / 100, n: v.months, system: "price", feesPerPeriod: v.fees });
    const cet = effectiveCost(v.amount - v.upfront, s.rows.map((x) => x.total));
    return { s, cet };
  }, [ok, JSON.stringify(v)]);
  return (
    <CalcShell slug={slug} title="Custo efetivo total (CET)" category="Crédito" description="Inclua tarifas e seguros para descobrir o custo real de um empréstimo."
      inputs={i} onReset={reset} valid={!!r}
      assumptions={["Parcelas pelo sistema Price.", "Tarifas iniciais descontadas do valor recebido.", "CET calculado pela taxa interna de retorno do fluxo."]}
      form={<div className="space-y-4">
        <Field label="Valor contratado" prefix="R$" value={i.amount} onChange={(x) => set("amount", x)} error={errors.amount} />
        <Field label="Tarifas e IOF na contratação" prefix="R$" value={i.upfront} onChange={(x) => set("upfront", x)} error={errors.upfront} />
        <Field label="Taxa de juros" suffix="% a.m." value={i.rate} onChange={(x) => set("rate", x)} error={errors.rate} />
        <Field label="Prazo" suffix="meses" value={i.months} onChange={(x) => set("months", x)} error={errors.months} />
        <Field label="Seguro por parcela" prefix="R$" value={i.fees} onChange={(x) => set("fees", x)} error={errors.fees} />
      </div>}
      results={r && <StatGrid>
        <Stat emphasis label="CET mensal" value={r.cet === null ? "—" : pct(r.cet)} />
        <Stat label="CET anual" value={r.cet === null ? "—" : pct(Math.pow(1 + r.cet, 12) - 1)} />
        <Stat label="Parcela com encargos" value={brl(r.s.first)} />
        <Stat label="Total pago" value={brl(r.s.totalPaid)} />
        <Stat label="Valor recebido" value={brl(v.amount - v.upfront)} />
      </StatGrid>}
    />
  );
};

/* ------------------------------ Comparador ------------------------------ */
const Comparador = () => {
  const slug = "comparador-investimentos";
  const { inputs: i, set, reset } = useCalcInputs(slug, {
    initial: "50000", monthly: "1000", years: "5", inflation: "4,5",
    aRate: "11,5", aFee: "0", aTax: "regressivo" as "regressivo" | "isento",
    bRate: "10", bFee: "0", bTax: "isento" as "regressivo" | "isento",
    cRate: "13", cFee: "1,5", cTax: "regressivo" as "regressivo" | "isento",
  });
  const { v, errors, ok } = validate(i, {
    initial: { label: "Inicial", min: 0 }, monthly: { label: "Aporte", min: 0, optional: true },
    years: { label: "Prazo", gt: 0, max: 60 }, inflation: { label: "Inflação", min: -20, max: 100, optional: true },
    aRate: { label: "A", min: -50, max: 200 }, aFee: { label: "A", min: 0, max: 20, optional: true },
    bRate: { label: "B", min: -50, max: 200 }, bFee: { label: "B", min: 0, max: 20, optional: true },
    cRate: { label: "C", min: -50, max: 200 }, cFee: { label: "C", min: 0, max: 20, optional: true },
  });
  const res = useMemoCalc(() => ok ? (["a", "b", "c"] as const).map((k, idx) => simulateInvestment(
    { name: ["CDB / Tesouro", "LCI / LCA", "Fundo"][idx], annualRate: v[`${k}Rate`] / 100, annualFee: v[`${k}Fee`] / 100, tax: i[`${k}Tax`], taxRate: 0 },
    v.initial, v.monthly, Math.round(v.years * 12), v.inflation / 100,
  )) : null, [ok, JSON.stringify(v), i.aTax, i.bTax, i.cTax]);
  const taxOpts = [{ value: "regressivo" as const, label: "IR regressivo" }, { value: "isento" as const, label: "Isento" }];
  const opt = (k: "a" | "b" | "c", label: string) => (
    <div className="border-t border-border/50 pt-4 space-y-3">
      <div className="text-[10px] uppercase tracking-luxury text-gold">{label}</div>
      <FieldGrid>
        <Field label="Rentab." suffix="% a.a." value={i[`${k}Rate`]} onChange={(x) => set(`${k}Rate`, x)} error={errors[`${k}Rate`]} />
        <Field label="Taxa adm." suffix="% a.a." value={i[`${k}Fee`]} onChange={(x) => set(`${k}Fee`, x)} error={errors[`${k}Fee`]} />
      </FieldGrid>
      <SelectField label="Tributação" value={i[`${k}Tax`]} onChange={(x) => set(`${k}Tax`, x)} options={taxOpts} />
    </div>
  );
  const table: TableData | null = res ? { headers: ["Opção", "Investido", "Custos", "IR", "Líquido", "Real"], rows: res.map((x) => [x.name, x.invested, x.costs, x.tax, x.net, x.realNet]) } : null;
  return (
    <CalcShell slug={slug} title="Comparador de investimentos" category="Investimentos" description="Compare três opções considerando taxas, IR regressivo e inflação."
      inputs={i} onReset={reset} table={table} valid={!!res}
      assumptions={["IR regressivo cobrado no resgate sobre o ganho total.", "Taxa de administração descontada mensalmente.", "Não considera come-cotas nem IOF."]}
      form={<div className="space-y-4">
        <Field label="Valor inicial" prefix="R$" value={i.initial} onChange={(x) => set("initial", x)} error={errors.initial} />
        <Field label="Aporte mensal" prefix="R$" value={i.monthly} onChange={(x) => set("monthly", x)} error={errors.monthly} />
        <FieldGrid>
          <Field label="Prazo" suffix="anos" value={i.years} onChange={(x) => set("years", x)} error={errors.years} />
          <Field label="Inflação" suffix="% a.a." value={i.inflation} onChange={(x) => set("inflation", x)} error={errors.inflation} />
        </FieldGrid>
        {opt("a", "Opção A · CDB / Tesouro")}{opt("b", "Opção B · LCI / LCA")}{opt("c", "Opção C · Fundo")}
      </div>}
      results={res && <>
        <StatGrid>{res.map((x) => <Stat key={x.name} emphasis={x.net === Math.max(...res.map((y) => y.net))} label={`${x.name} · líquido`} value={`${brl(x.net)} (${pct(x.netReturn)})`} />)}</StatGrid>
        <Panel title="Composição"><ChartBars data={res.map((x) => ({ nome: x.name, Investido: x.invested, Ganho: Math.max(0, x.netGain), IR: x.tax }))} x="nome" series={[{ key: "Investido", label: "Investido" }, { key: "Ganho", label: "Ganho líquido" }, { key: "IR", label: "IR" }]} /></Panel>
        <Panel title="Detalhamento"><DataTable data={table!} /></Panel>
      </>}
    />
  );
};

/* ------------------------------ Aposentadoria ------------------------------ */
const Aposentadoria = () => {
  const slug = "aposentadoria";
  const { inputs: i, set, reset } = useCalcInputs(slug, {
    currentAge: "35", retireAge: "60", endAge: "90", current: "100000", monthly: "2000",
    annualReturn: "10", annualInflation: "4,5", desiredIncome: "15000", otherIncome: "3000",
  });
  const { v, errors, ok } = validate(i, {
    currentAge: { label: "Idade", min: 0, max: 100 }, retireAge: { label: "Aposentadoria", min: 1, max: 110 },
    endAge: { label: "Expectativa", min: 1, max: 120 }, current: { label: "Atual", min: 0, optional: true },
    monthly: { label: "Aporte", min: 0, optional: true }, annualReturn: { label: "Retorno", min: -20, max: 100 },
    annualInflation: { label: "Inflação", min: -20, max: 100 }, desiredIncome: { label: "Renda", min: 0 },
    otherIncome: { label: "Outras", min: 0, optional: true },
  });
  const valid = ok && v.retireAge > v.currentAge && v.endAge > v.retireAge;
  const r = useMemoCalc(() => valid ? retirement({ ...v, annualReturn: v.annualReturn / 100, annualInflation: v.annualInflation / 100 }) : null, [valid, JSON.stringify(v)]);
  return (
    <CalcShell slug={slug} title="Aposentadoria" category="Planejamento" description="Estime o patrimônio necessário e a renda que seu plano sustenta, em valores de hoje."
      inputs={i} onReset={reset} valid={!!r}
      assumptions={["Cálculo em termos reais (já descontada a inflação).", "Renda consumida até a idade final.", "Idades devem ser crescentes: atual < aposentadoria < final."]}
      form={<div className="space-y-4">
        <FieldGrid>
          <Field label="Idade atual" value={i.currentAge} onChange={(x) => set("currentAge", x)} error={errors.currentAge} />
          <Field label="Aposentar aos" value={i.retireAge} onChange={(x) => set("retireAge", x)} error={errors.retireAge} />
        </FieldGrid>
        <Field label="Renda até a idade" value={i.endAge} onChange={(x) => set("endAge", x)} error={errors.endAge} />
        <Field label="Patrimônio atual" prefix="R$" value={i.current} onChange={(x) => set("current", x)} error={errors.current} />
        <Field label="Aporte mensal" prefix="R$" value={i.monthly} onChange={(x) => set("monthly", x)} error={errors.monthly} />
        <FieldGrid>
          <Field label="Retorno" suffix="% a.a." value={i.annualReturn} onChange={(x) => set("annualReturn", x)} error={errors.annualReturn} />
          <Field label="Inflação" suffix="% a.a." value={i.annualInflation} onChange={(x) => set("annualInflation", x)} error={errors.annualInflation} />
        </FieldGrid>
        <Field label="Renda mensal desejada" prefix="R$" value={i.desiredIncome} onChange={(x) => set("desiredIncome", x)} error={errors.desiredIncome} />
        <Field label="INSS e outras rendas" prefix="R$" value={i.otherIncome} onChange={(x) => set("otherIncome", x)} error={errors.otherIncome} />
      </div>}
      results={r && <>
        <StatGrid>
          <Stat emphasis label="Patrimônio necessário" value={brl(r.requiredCapital)} />
          <Stat label="Patrimônio projetado" value={brl(r.atRetire)} />
          <Stat label="Renda sustentável" value={brl(r.sustainableIncome)} />
          <Stat label="Aporte mensal necessário" value={brl(r.requiredMonthly)} />
          <Stat label="Recursos duram até" value={r.depletedAge === null ? `${v.endAge} anos ou mais` : `${num(r.depletedAge, 1)} anos`} />
        </StatGrid>
        <Panel title="Trajetória do patrimônio"><ChartArea data={r.points.map((p) => ({ idade: p.age, Patrimônio: p.balance }))} x="idade" series={[{ key: "Patrimônio", label: "Patrimônio (valores de hoje)" }]} /></Panel>
      </>}
    />
  );
};

/* ------------------------------ Dívidas ------------------------------ */
const Dividas = () => {
  const slug = "quitacao-dividas";
  const { inputs: i, set, reset } = useCalcInputs(slug, {
    d1b: "8000", d1r: "12", d1m: "400", d2b: "15000", d2r: "3,5", d2m: "600", d3b: "4000", d3r: "8", d3m: "200",
    budget: "2000", strategy: "avalanche" as "avalanche" | "snowball",
  });
  const spec = {} as Record<string, { label: string; min?: number; max?: number; optional?: boolean; gt?: number }>;
  for (const k of [1, 2, 3]) { spec[`d${k}b`] = { label: "Saldo", min: 0, optional: true }; spec[`d${k}r`] = { label: "Juros", min: 0, max: 50, optional: true }; spec[`d${k}m`] = { label: "Mínimo", min: 0, optional: true }; }
  spec.budget = { label: "Orçamento", gt: 0 };
  const { v, errors, ok } = validate(i, spec);
  const r = useMemoCalc(() => {
    if (!ok) return null;
    const debts = [1, 2, 3].map((k) => ({ name: `Dívida ${k}`, balance: v[`d${k}b`], monthlyRate: v[`d${k}r`] / 100, minPayment: v[`d${k}m`] })).filter((d) => d.balance > 0);
    if (!debts.length) return null;
    return payoffDebts(debts, v.budget, i.strategy);
  }, [ok, JSON.stringify(v), i.strategy]);
  return (
    <CalcShell slug={slug} title="Quitação de dívidas" category="Crédito" description="Compare as estratégias avalanche (maiores juros primeiro) e bola de neve (menor saldo primeiro)."
      inputs={i} onReset={reset} valid={!!r}
      assumptions={["Juros mensais compostos sobre o saldo.", "Pagamentos mínimos primeiro; o restante vai para a dívida prioritária.", "Limite de 50 anos de simulação."]}
      form={<div className="space-y-4">
        {[1, 2, 3].map((k) => (
          <div key={k} className="space-y-3 border-b border-border/50 pb-4">
            <div className="text-[10px] uppercase tracking-luxury text-gold">Dívida {k}</div>
            <Field label="Saldo" prefix="R$" value={i[`d${k}b` as "d1b"]} onChange={(x) => set(`d${k}b` as "d1b", x)} error={errors[`d${k}b`]} />
            <FieldGrid>
              <Field label="Juros" suffix="% a.m." value={i[`d${k}r` as "d1r"]} onChange={(x) => set(`d${k}r` as "d1r", x)} error={errors[`d${k}r`]} />
              <Field label="Mínimo" prefix="R$" value={i[`d${k}m` as "d1m"]} onChange={(x) => set(`d${k}m` as "d1m", x)} error={errors[`d${k}m`]} />
            </FieldGrid>
          </div>
        ))}
        <Field label="Quanto posso pagar por mês" prefix="R$" value={i.budget} onChange={(x) => set("budget", x)} error={errors.budget} />
        <SelectField label="Estratégia" value={i.strategy} onChange={(x) => set("strategy", x)} options={[{ value: "avalanche", label: "Avalanche" }, { value: "snowball", label: "Bola de neve" }]} />
      </div>}
      results={r && <>
        <StatGrid>
          <Stat emphasis label="Tempo para quitar" value={r.months === null ? "Orçamento insuficiente" : `${Math.floor(r.months / 12)} anos e ${r.months % 12} meses`} />
          <Stat label="Juros pagos" value={brl(r.totalInterest)} />
          {r.debts.map((d) => <Stat key={d.name} label={`${d.name} quitada no mês`} value={d.paidOffMonth === null ? "—" : String(d.paidOffMonth)} />)}
        </StatGrid>
        <Panel title="Saldo total"><ChartArea data={r.timeline.map((t) => ({ mes: t.month, Saldo: t.balance }))} x="mes" series={[{ key: "Saldo", label: "Saldo devedor" }]} /></Panel>
      </>}
    />
  );
};

/* ------------------------------ registro ------------------------------ */
export type CalcMeta = { slug: string; title: string; category: string; description: string; Component: ComponentType };
export const CALCULATORS: CalcMeta[] = [
  { slug: "juros-compostos", title: "Juros compostos", category: "Investimentos", description: "Crescimento do capital com aportes e inflação.", Component: JurosCompostos },
  { slug: "rentabilidade-real", title: "Rentabilidade real", category: "Investimentos", description: "Desconte inflação e IR do seu retorno.", Component: RentabilidadeReal },
  { slug: "comparador-investimentos", title: "Comparador de investimentos", category: "Investimentos", description: "CDB, LCI/LCA e fundos lado a lado.", Component: Comparador },
  { slug: "metas", title: "Planejamento de metas", category: "Planejamento", description: "Aporte, prazo ou taxa para sua meta.", Component: Metas },
  { slug: "aposentadoria", title: "Aposentadoria", category: "Planejamento", description: "Patrimônio necessário e renda sustentável.", Component: Aposentadoria },
  { slug: "financiamento", title: "Financiamento Price e SAC", category: "Crédito", description: "Tabela completa e amortização extra.", Component: Financiamento },
  { slug: "cet", title: "Custo efetivo total", category: "Crédito", description: "O custo real de um empréstimo.", Component: Cet },
  { slug: "quitacao-dividas", title: "Quitação de dívidas", category: "Crédito", description: "Avalanche x bola de neve.", Component: Dividas },
];

export const CalcPage = ({ meta }: { meta: CalcMeta }) => {
  useSeo({ title: `${meta.title} | Stella Aurea Capital`, description: meta.description, path: `/area/calculadoras/${meta.slug}` });
  const C = meta.Component;
  return <C />;
};
