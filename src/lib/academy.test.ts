import { describe, it, expect } from 'vitest';
import { levelForXp, canPass } from './academy';
describe('Academy learning rules', () => {
  it.each([[0,'Aprendiz'],[199,'Aprendiz'],[200,'Explorador'],[599,'Explorador'],[600,'Analista'],[1199,'Analista'],[1200,'Estrategista'],[1999,'Estrategista'],[2000,'Visão Global']])('XP %s corresponds to %s', (xp,name) => expect(levelForXp(Number(xp)).name).toBe(name));
  it('requires at least 80% approval', () => { expect(canPass(79.99)).toBe(false); expect(canPass(80)).toBe(true); expect(canPass(100)).toBe(true); expect(canPass(101)).toBe(false); });
});