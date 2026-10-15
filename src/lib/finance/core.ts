/**
 * Stella Aurea Capital — camada central de cálculo financeiro.
 * Todas as taxas são decimais (1% = 0.01). Sem dependência da interface.
 */

export type RatePeriod = "month" | "year";

export const round2 = (v: number) => Math.round((v + Math.sign(v) * Number.EPSILON) * 100) / 100;
export const safe = (v: number) => (Number.isFinite(v) ? v : 0);

/** Converte taxa composta para mensal equivalente. */
export const toMonthly = (rate: number, period: RatePeriod) =>
  period === "month" ? rate : Math.pow(1 + rate, 1 / 12) - 1;

/** Converte taxa composta para anual equivalente. */
export const toAnnual = (rate: number, period: RatePeriod) =>
  period === "year" ? rate : Math.pow(1 + rate, 12) - 1;

/** Taxa real (Fisher): (1+nominal)/(1+inflação) - 1. */
export const realRate = (nominal: number, inflation: number) => (1 + nominal) / (1 + inflation) - 1;

/** Prestação constante (Price). */
export const pmt = (rate: number, n: number, pv: number) => {
  if (n <= 0) return 0;
  if (rate === 0) return pv / n;
  return (pv * rate) / (1 - Math.pow(1 + rate, -n));
};

/** Valor presente de uma renda postecipada. */
export const pvAnnuity = (rate: number, n: number, payment: number) => {
  if (n <= 0) return 0;
  if (rate === 0) return payment * n;
  return (payment * (1 - Math.pow(1 + rate, -n))) / rate;
};

/** Valor futuro: capital + aportes periódicos. */
export const fv = (rate: number, n: number, pv: number, contribution: number, timing: "start" | "end" = "end") => {
  const g = Math.pow(1 + rate, n);
  const factor = rate === 0 ? n : ((g - 1) / rate) * (timing === "start" ? 1 + rate : 1);
  return pv * g + contribution * factor;
};

/** Taxa interna de retorno por período (bisseção robusta). cf[0] em t=0. */
export const irr = (cf: number[]): number | null => {
  const npv = (r: number) => cf.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);
  let lo = -0.9999;
  let hi = 10;
  let fLo = npv(lo);
  const fHi = npv(hi);
  if (!Number.isFinite(fLo) || !Number.isFinite(fHi) || fLo * fHi > 0) return null;
  for (let i = 0; i < 300; i++) {
    const mid = (lo + hi) / 2;
    const fMid = npv(mid);
    if (Math.abs(fMid) < 1e-10) return mid;
    if (fLo * fMid < 0) hi = mid;
    else {
      lo = mid;
      fLo = fMid;
    }
  }
  return (lo + hi) / 2;
};

/* ------------------------------ Juros compostos ------------------------------ */

export interface CompoundInput {
  initial: number;
  monthlyRate: number;
  months: number;
  contribution: number;
  /** a cada quantos meses o aporte ocorre (1 = mensal, 12 = anual) */
  every: number;
  timing: "start" | "end";
  annualInflation?: number;
}
export interface CompoundRow {
  month: number;
  contributed: number;
  interest: number;
  balance: number;
  real: number;
}
export const compound = (i: CompoundInput) => {
  const mInf = toMonthly(i.annualInflation ?? 0, "year");
  let bal = i.initial;
  let inv = i.initial;
  let int = 0;
  const rows: CompoundRow[] = [{ month: 0, contributed: inv, interest: 0, balance: bal, real: bal }];
  for (let m = 1; m <= i.months; m++) {
    const dueStart = i.timing === "start" && (m - 1) % i.every === 0;
    const dueEnd = i.timing === "end" && m % i.every === 0;
    if (dueStart) {
      bal += i.contribution;
      inv += i.contribution;
    }
    const j = bal * i.monthlyRate;
    bal += j;
    int += j;
    if (dueEnd) {
      bal += i.contribution;
      inv += i.contribution;
    }
    rows.push({ month: m, contributed: inv, interest: int, balance: bal, real: bal / Math.pow(1 + mInf, m) });
  }
  const last = rows[rows.length - 1];
  return {
    rows,
    final: last.balance,
    invested: last.contributed,
    interest: last.interest,
    realFinal: last.real,
    totalReturn: last.contributed > 0 ? last.interest / last.contributed : 0,
  };
};

/* ------------------------------ Metas ------------------------------ */

export const requiredContribution = (goal: number, pv: number, rate: number, n: number, timing: "start" | "end" = "end") => {
  if (n <= 0) return null;
  const g = Math.pow(1 + rate, n);
  const factor = rate === 0 ? n : ((g - 1) / rate) * (timing === "start" ? 1 + rate : 1);
  return Math.max(0, (goal - pv * g) / factor);
};

export const monthsToGoal = (goal: number, pv: number, rate: number, c: number, timing: "start" | "end" = "end", max = 1200) => {
  if (pv >= goal) return 0;
  let bal = pv;
  for (let m = 1; m <= max; m++) {
    if (timing === "start") bal += c;
    bal *= 1 + rate;
    if (timing === "end") bal += c;
    if (bal >= goal) return m;
  }
  return null;
};

export const rateForGoal = (goal: number, pv: number, c: number, n: number, timing: "start" | "end" = "end") => {
  if (n <= 0) return null;
  if (fv(0, n, pv, c, timing) >= goal) return 0;
  let lo = 0;
  let hi = 0.2;
  if (fv(hi, n, pv, c, timing) < goal) return null;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (fv(mid, n, pv, c, timing) >= goal) hi = mid;
    else lo = mid;
  }
  return hi;
};

/* ------------------------------ Amortização ------------------------------ */

export type AmortSystem = "price" | "sac";
export interface ScheduleInput {
  principal: number;
  rate: number; // por período
  n: number;
  system: AmortSystem;
  feesPerPeriod?: number; // seguros/tarifas fixos por parcela
  prepayments?: { period: number; amount: number }[];
  prepayMode?: "term" | "installment";
}
export interface ScheduleRow {
  period: number;
  installment: number; // juros + amortização
  interest: number;
  amortization: number;
  fees: number;
  extra: number;
  total: number; // parcela + encargos
  balance: number;
}
export const schedule = (s: ScheduleInput) => {
  const fees = round2(s.feesPerPeriod ?? 0);
  const mode = s.prepayMode ?? "term";
  let bal = round2(s.principal);
  let pay = round2(pmt(s.rate, s.n, bal));
  let amortFixed = round2(bal / s.n);
  const rows: ScheduleRow[] = [];
  for (let k = 1; bal > 0 && k <= s.n; k++) {
    const interest = round2(bal * s.rate);
    let amort = s.system === "price" ? round2(pay - interest) : amortFixed;
    if (k >= s.n || amort >= bal) amort = bal;
    if (amort < 0) amort = 0;
    bal = round2(bal - amort);
    let extra = 0;
    for (const p of s.prepayments ?? []) if (p.period === k) extra += p.amount;
    extra = round2(Math.min(Math.max(extra, 0), bal));
    bal = round2(bal - extra);
    if (extra > 0 && mode === "installment" && bal > 0) {
      const remaining = s.n - k;
      pay = round2(pmt(s.rate, remaining, bal));
      amortFixed = round2(bal / remaining);
    }
    const installment = round2(interest + amort);
    rows.push({ period: k, installment, interest, amortization: amort, fees, extra, total: round2(installment + fees), balance: bal });
  }
  const sum = (f: (r: ScheduleRow) => number) => round2(rows.reduce((a, r) => a + f(r), 0));
  return {
    rows,
    first: rows[0]?.total ?? 0,
    last: rows[rows.length - 1]?.total ?? 0,
    totalInterest: sum((r) => r.interest),
    totalFees: sum((r) => r.fees),
    totalExtra: sum((r) => r.extra),
    totalPaid: sum((r) => r.total + r.extra),
    periods: rows.length,
  };
};

/** CET por período: fluxo líquido recebido x parcelas pagas (inclui extras). */
export const effectiveCost = (netReceived: number, payments: number[]) => irr([netReceived, ...payments.map((p) => -p)]);

/* ------------------------------ Tributação ------------------------------ */

/** IR regressivo de renda fixa no Brasil (por dias corridos). */
export const irRegressivo = (days: number) => (days <= 180 ? 0.225 : days <= 360 ? 0.2 : days <= 720 ? 0.175 : 0.15);

export interface InvestOption {
  name: string;
  annualRate: number;
  annualFee: number; // taxa de administração/custódia a.a.
  tax: "regressivo" | "isento" | "custom";
  taxRate: number; // usado quando custom
}
export const simulateInvestment = (o: InvestOption, initial: number, monthly: number, months: number, annualInflation: number) => {
  const r = toMonthly(o.annualRate, "year");
  const f = toMonthly(o.annualFee, "year");
  let bal = initial;
  let gross = initial;
  let costs = 0;
  for (let m = 1; m <= months; m++) {
    const j = bal * r;
    const fee = (bal + j) * f;
    bal = bal + j - fee;
    gross = gross * (1 + r) + monthly;
    costs += fee;
    bal += monthly;
  }
  const invested = initial + monthly * months;
  const gainsAfterCosts = Math.max(0, bal - invested);
  const taxRate = o.tax === "isento" ? 0 : o.tax === "regressivo" ? irRegressivo(Math.round(months * 30.4375)) : o.taxRate;
  const tax = gainsAfterCosts * taxRate;
  const net = bal - tax;
  const inflFactor = Math.pow(1 + annualInflation, months / 12);
  return {
    name: o.name,
    invested,
    gross,
    costs,
    tax,
    taxRate,
    net,
    netGain: net - invested,
    netReturn: invested > 0 ? net / invested - 1 : 0,
    realNet: net / inflFactor,
  };
};

/* ------------------------------ Aposentadoria ------------------------------ */

export interface RetirementInput {
  currentAge: number;
  retireAge: number;
  endAge: number;
  current: number;
  monthly: number;
  annualReturn: number;
  annualInflation: number;
  desiredIncome: number; // em valores de hoje
  otherIncome: number; // INSS/aluguéis, em valores de hoje
}
export const retirement = (i: RetirementInput) => {
  const r = toMonthly(realRate(i.annualReturn, i.annualInflation), "year");
  const accM = Math.round((i.retireAge - i.currentAge) * 12);
  const useM = Math.round((i.endAge - i.retireAge) * 12);
  const need = Math.max(0, i.desiredIncome - i.otherIncome);
  const atRetire = fv(r, accM, i.current, i.monthly);
  const requiredCapital = pvAnnuity(r, useM, need);
  const sustainableIncome = pmt(r, useM, atRetire);
  const requiredMonthly = requiredContribution(requiredCapital, i.current, r, accM) ?? 0;
  // trajetória anual
  const points: { age: number; balance: number }[] = [];
  let bal = i.current;
  let depletedAge: number | null = null;
  const total = accM + useM;
  for (let m = 0; m <= total; m++) {
    if (m % 12 === 0) points.push({ age: i.currentAge + m / 12, balance: Math.max(0, bal) });
    if (m === total) break;
    bal *= 1 + r;
    if (m < accM) bal += i.monthly;
    else {
      bal -= need;
      if (bal <= 0 && depletedAge === null) {
        depletedAge = i.currentAge + (m + 1) / 12;
        bal = 0;
      }
    }
  }
  return { monthlyRealRate: r, atRetire, requiredCapital, sustainableIncome, requiredMonthly, need, points, depletedAge, accM, useM };
};

/* ------------------------------ Dívidas ------------------------------ */

export interface Debt {
  name: string;
  balance: number;
  monthlyRate: number;
  minPayment: number;
}
export const payoffDebts = (debts: Debt[], budget: number, strategy: "avalanche" | "snowball", max = 600) => {
  const ds = debts.map((d) => ({ ...d, paidOffMonth: null as number | null }));
  let totalInterest = 0;
  let month = 0;
  const timeline: { month: number; balance: number }[] = [{ month: 0, balance: ds.reduce((s, d) => s + d.balance, 0) }];
  while (ds.some((d) => d.balance > 0.005) && month < max) {
    month++;
    for (const d of ds) if (d.balance > 0) {
      const j = d.balance * d.monthlyRate;
      d.balance += j;
      totalInterest += j;
    }
    let available = budget;
    for (const d of ds) if (d.balance > 0) {
      const p = Math.min(d.minPayment, d.balance, available);
      d.balance -= p;
      available -= p;
    }
    const order = ds
      .filter((d) => d.balance > 0.005)
      .sort((a, b) => (strategy === "avalanche" ? b.monthlyRate - a.monthlyRate : a.balance - b.balance));
    for (const d of order) {
      if (available <= 0) break;
      const p = Math.min(d.balance, available);
      d.balance -= p;
      available -= p;
    }
    for (const d of ds) if (d.balance <= 0.005 && d.paidOffMonth === null) {
      d.balance = 0;
      d.paidOffMonth = month;
    }
    timeline.push({ month, balance: ds.reduce((s, d) => s + d.balance, 0) });
  }
  const done = ds.every((d) => d.balance <= 0.005);
  return { done, months: done ? month : null, totalInterest, debts: ds, timeline };
};
