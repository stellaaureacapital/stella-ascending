import { describe, it, expect } from "vitest";
import {
  toMonthly, toAnnual, pmt, fv, compound, schedule, irr, requiredContribution, monthsToGoal,
  rateForGoal, realRate, irRegressivo, simulateInvestment, retirement, payoffDebts, effectiveCost,
} from "./core";

describe("conversão de taxas", () => {
  it("12% a.a. ≈ 0,9489% a.m. (composto, não linear)", () => {
    expect(toMonthly(0.12, "year")).toBeCloseTo(0.0094888, 6);
    expect(toAnnual(0.01, "month")).toBeCloseTo(0.126825, 6);
    expect(toAnnual(toMonthly(0.1, "year"), "month")).toBeCloseTo(0.1, 10);
  });
  it("taxa real de Fisher", () => {
    expect(realRate(0.1, 0.04)).toBeCloseTo(0.0576923, 6);
  });
});

describe("juros compostos", () => {
  it("bate com fórmula fechada (aportes no fim)", () => {
    const r = compound({ initial: 1000, monthlyRate: 0.01, months: 12, contribution: 100, every: 1, timing: "end" });
    expect(r.final).toBeCloseTo(2395.08, 2);
    expect(r.invested).toBe(2200);
    expect(r.final - r.invested).toBeCloseTo(r.interest, 8);
  });
  it("aportes no início = antecipados", () => {
    const r = compound({ initial: 0, monthlyRate: 0.01, months: 12, contribution: 100, every: 1, timing: "start" });
    expect(r.final).toBeCloseTo(fv(0.01, 12, 0, 100, "start"), 8);
    expect(r.final).toBeCloseTo(1280.93, 2);
  });
  it("taxa zero", () => {
    const r = compound({ initial: 500, monthlyRate: 0, months: 10, contribution: 50, every: 1, timing: "end" });
    expect(r.final).toBe(1000);
  });
  it("aportes anuais", () => {
    const r = compound({ initial: 0, monthlyRate: 0, months: 24, contribution: 1000, every: 12, timing: "end" });
    expect(r.invested).toBe(2000);
  });
});

describe("Price e SAC", () => {
  it("Price: 100.000 a 1% a.m. em 12x = 8.884,88", () => {
    expect(pmt(0.01, 12, 100000)).toBeCloseTo(8884.88, 2);
    const s = schedule({ principal: 100000, rate: 0.01, n: 12, system: "price" });
    expect(s.rows).toHaveLength(12);
    expect(s.rows[0].installment).toBe(8884.88);
    expect(s.rows[11].balance).toBe(0);
    const amort = s.rows.reduce((a, r) => a + r.amortization, 0);
    expect(amort).toBeCloseTo(100000, 2);
    expect(Math.abs(s.rows[11].installment - 8884.88)).toBeLessThan(0.05);
  });
  it("SAC: amortização constante e juros decrescentes", () => {
    const s = schedule({ principal: 120000, rate: 0.01, n: 12, system: "sac" });
    expect(s.rows[0].amortization).toBe(10000);
    expect(s.rows[0].installment).toBe(11200);
    expect(s.rows[11].installment).toBe(10100);
    expect(s.totalInterest).toBe(7800);
    expect(s.rows[11].balance).toBe(0);
  });
  it("SAC paga menos juros que Price nas mesmas condições", () => {
    const a = schedule({ principal: 300000, rate: 0.008, n: 360, system: "sac" });
    const b = schedule({ principal: 300000, rate: 0.008, n: 360, system: "price" });
    expect(a.totalInterest).toBeLessThan(b.totalInterest);
    expect(b.rows[359].balance).toBe(0);
  });
  it("amortização extraordinária reduz prazo ou parcela", () => {
    const base = schedule({ principal: 100000, rate: 0.01, n: 24, system: "price" });
    const term = schedule({ principal: 100000, rate: 0.01, n: 24, system: "price", prepayments: [{ period: 6, amount: 20000 }], prepayMode: "term" });
    const inst = schedule({ principal: 100000, rate: 0.01, n: 24, system: "price", prepayments: [{ period: 6, amount: 20000 }], prepayMode: "installment" });
    expect(term.periods).toBeLessThan(24);
    expect(inst.periods).toBe(24);
    expect(inst.rows[7].installment).toBeLessThan(base.rows[7].installment);
    expect(term.totalInterest).toBeLessThan(inst.totalInterest);
    expect(inst.totalInterest).toBeLessThan(base.totalInterest);
  });
});

describe("TIR / CET", () => {
  it("recupera a taxa de uma Price sem tarifas", () => {
    const r = irr([100000, ...Array(12).fill(-8884.88)]);
    expect(r!).toBeCloseTo(0.01, 5);
  });
  it("tarifa à vista eleva o custo efetivo", () => {
    const c = effectiveCost(97000, Array(12).fill(8884.88));
    expect(c!).toBeGreaterThan(0.01);
  });
});

describe("metas", () => {
  it("aporte necessário é consistente com fv", () => {
    const c = requiredContribution(100000, 10000, 0.008, 60)!;
    expect(fv(0.008, 60, 10000, c)).toBeCloseTo(100000, 4);
  });
  it("prazo e taxa necessários", () => {
    expect(monthsToGoal(1200, 0, 0, 100)).toBe(12);
    const r = rateForGoal(2395.08, 1000, 100, 12)!;
    expect(r).toBeCloseTo(0.01, 5);
    expect(rateForGoal(1e12, 0, 1, 12)).toBeNull();
  });
});

describe("investimentos e IR", () => {
  it("tabela regressiva", () => {
    expect(irRegressivo(100)).toBe(0.225);
    expect(irRegressivo(365)).toBe(0.175);
    expect(irRegressivo(800)).toBe(0.15);
  });
  it("isento sem custos = juros compostos puros", () => {
    const s = simulateInvestment({ name: "LCI", annualRate: 0.1, annualFee: 0, tax: "isento", taxRate: 0 }, 10000, 0, 24, 0);
    expect(s.net).toBeCloseTo(12100, 4);
    expect(s.tax).toBe(0);
  });
  it("IR incide só sobre o ganho", () => {
    const s = simulateInvestment({ name: "CDB", annualRate: 0.1, annualFee: 0, tax: "regressivo", taxRate: 0 }, 10000, 0, 24, 0);
    expect(s.tax).toBeCloseTo(2100 * 0.15, 4);
  });
});

describe("aposentadoria e dívidas", () => {
  it("capital necessário sustenta exatamente a renda", () => {
    const r = retirement({ currentAge: 30, retireAge: 60, endAge: 90, current: 0, monthly: 0, annualReturn: 0.08, annualInflation: 0.04, desiredIncome: 10000, otherIncome: 2000 });
    expect(r.need).toBe(8000);
    expect(pmt(r.monthlyRealRate, r.useM, r.requiredCapital)).toBeCloseTo(8000, 6);
  });
  it("avalanche paga menos juros que bola de neve", () => {
    const debts = [
      { name: "Cartão", balance: 5000, monthlyRate: 0.12, minPayment: 250 },
      { name: "Pessoal", balance: 2000, monthlyRate: 0.03, minPayment: 100 },
    ];
    const a = payoffDebts(debts, 1000, "avalanche");
    const b = payoffDebts(debts, 1000, "snowball");
    expect(a.done && b.done).toBe(true);
    expect(a.totalInterest).toBeLessThan(b.totalInterest);
  });
});
