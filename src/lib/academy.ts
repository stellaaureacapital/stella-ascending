import { supabase } from '@/integrations/supabase/client';

export type AcademyProduct = { id: string; title: string; slug: string; description: string; short_description: string; product_type: 'curso' | 'ebook'; status: string; thumbnail_url: string | null; education_meta: { level?: string; hours?: number; modules?: number; version?: number; target_pages?: number; actual_pages?: number; format?: string } };
export type Lesson = { id: string; title: string; body: string; objectives: string; references_text: string; module_id: string; module_title: string; module_order: number; order_index: number; minutes: number; published: boolean; available: boolean };
export type Question = { id: string; prompt: string; options: string[]; kind: string };
export type Feedback = { score: number; passed: boolean; feedback: { id: string; correct: boolean; answer: number; explanation: string }[] };
export const LEVELS = [{ name: 'Aprendiz', xp: 0 }, { name: 'Explorador', xp: 200 }, { name: 'Analista', xp: 600 }, { name: 'Estrategista', xp: 1200 }, { name: 'Visão Global', xp: 2000 }];
export const levelForXp = (xp: number) => LEVELS.filter(l => xp >= l.xp).at(-1) ?? LEVELS[0];
export const canPass = (score: number) => Number.isFinite(score) && score >= 80 && score <= 100;
export const EDUCATIONAL_NOTICE = 'Este material possui finalidade exclusivamente educacional e informativa. Seu conteúdo não constitui recomendação individual de investimento, oferta de valores mobiliários ou garantia de resultados. Decisões financeiras devem considerar os objetivos, o horizonte de investimento, a capacidade financeira e a tolerância ao risco de cada investidor.';
export async function getCatalog() {
  const { data, error } = await supabase.rpc('academy_catalog');
  if (error) throw error;
  return (data ?? []) as unknown as AcademyProduct[];
}
export async function getLessons(product: string) {
  const { data, error } = await supabase.rpc('academy_lessons_for_course', { _product: product });
  if (error) throw error;
  return (data ?? []) as unknown as Lesson[];
}