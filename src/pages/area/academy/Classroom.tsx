import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAcademy, useCourseLessons } from '@/hooks/use-academy';
import { Button } from '@/components/ui/button';
import AcademyHeading from '@/components/academy/AcademyHeading';
import { EDUCATIONAL_NOTICE, type Question, type Feedback } from '@/lib/academy';

export default function Classroom() {
  const { slug, lessonId } = useParams();
  const { catalog } = useAcademy();
  const product = catalog.data?.find(p => p.slug === slug);
  const lessons = useCourseLessons(product?.id);
  const lesson = lessons.data?.find(l => l.id === lessonId);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Feedback>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const client = useQueryClient();
  const questions = useQuery({ queryKey: ['academy-questions', lessonId], enabled: !!lesson?.available, queryFn: async () => {
    if (!lessonId) return [];
    const { data, error } = await supabase.rpc('academy_get_questions', { _lesson: lessonId });
    if (error) throw error; return data as unknown as Question[];
  } });
  const submit = async () => {
    if (!lessonId) return;
    setBusy(true); setError('');
    const { data, error } = await supabase.rpc('academy_submit', { _lesson: lessonId, _answers: answers });
    if (error) setError(error.message);
    else { setFeedback(data as unknown as Feedback); await client.invalidateQueries({ queryKey: ['academy-progress'] }); await client.invalidateQueries({ queryKey: ['academy-xp'] }); await lessons.refetch(); }
    setBusy(false);
  };
  if (lessons.isLoading || catalog.isLoading) return <p>Carregando aula…</p>;
  if (!lesson?.available) return <div><AcademyHeading title="Aula bloqueada"/><Button asChild variant="outline"><Link to={`/area/academia/${slug}`}>Voltar à trilha</Link></Button></div>;
  const next = lessons.data?.find(l => l.available && (l.module_order > lesson.module_order || (l.module_order === lesson.module_order && l.order_index > lesson.order_index)));
  return <div className="max-w-5xl"><Button asChild variant="link" className="px-0 mb-6"><Link to={`/area/academia/${slug}`}>← Voltar à trilha</Link></Button><AcademyHeading title={lesson.title} label={lesson.module_title}>{lesson.minutes} minutos · Primeira conclusão: 20 XP · Avaliação aprovada: 10 XP</AcademyHeading>
    <div className="grid xl:grid-cols-[1fr_220px] gap-10"><article><div className="border-l-2 border-gold pl-5 mb-8"><h2 className="font-serif text-2xl mb-2">Objetivos de aprendizagem</h2><p className="text-sm leading-relaxed">{lesson.objectives}</p></div><div className="space-y-5 text-sm leading-7">{lesson.body.split('\n\n').map((p,i) => p.startsWith('## ') ? <h2 key={i} className="font-serif text-3xl pt-5">{p.slice(3)}</h2> : <p key={i} className="whitespace-pre-line">{p}</p>)}</div><h2 className="font-serif text-2xl mt-10 mb-3">Fontes e referências</h2><p className="text-xs whitespace-pre-line leading-6 text-muted-foreground">{lesson.references_text}</p></article><nav aria-label="Aulas do curso" className="hidden xl:block"><p className="text-[10px] uppercase tracking-luxury text-gold mb-4">Sua trilha</p>{lessons.data?.map(l => <Button key={l.id} asChild={l.available} disabled={!l.available} variant="ghost" className="w-full h-auto py-3 justify-start text-left whitespace-normal text-xs">{l.available ? <Link to={`/area/academia/${slug}/aula/${l.id}`}>{l.title}</Link> : <span>{l.title}</span>}</Button>)}</nav></div>
    <section className="mt-12 pt-8 border-t border-border"><h2 className="font-serif text-3xl mb-6">Verifique seus conhecimentos</h2>{questions.isError && <p role="alert">Não foi possível carregar a avaliação.</p>}<form onSubmit={e => { e.preventDefault(); submit(); }} className="space-y-8">{questions.data?.map((q,i) => { const f = feedback?.feedback.find(x => x.id === q.id); return <fieldset key={q.id}><legend className="text-sm font-medium mb-4">{i+1}. {q.prompt}</legend><div className="grid sm:grid-cols-2 gap-2">{q.options.map((o,j) => <label key={j} className={`flex items-start gap-3 border p-4 text-sm cursor-pointer ${answers[q.id]===j ? 'border-gold bg-secondary' : 'border-border'}`}><input type="radio" name={q.id} value={j} checked={answers[q.id]===j} onChange={() => { setAnswers(a => ({ ...a, [q.id]: j })); setFeedback(undefined); }} className="mt-1 accent-accent"/><span>{o}</span></label>)}</div>{f && <div className="text-sm mt-3 border-l-2 border-gold pl-4"><p className="font-medium">{f.correct ? 'Resposta correta' : `Resposta correta: ${q.options[f.answer]}`}</p><p className="text-muted-foreground mt-1 leading-relaxed">{f.explanation}</p></div>}</fieldset>; })}{error && <p role="alert" className="text-destructive">{error}</p>}{feedback && <div role="status" className="flex gap-3 items-center text-sm"><CheckCircle2 className="text-gold"/><p>{feedback.score}% de acertos · {feedback.passed ? 'Aula concluída. Progresso salvo.' : 'Revise as explicações e tente novamente. Mínimo: 80%.'}</p></div>}<div className="flex flex-wrap gap-3"><Button type="submit" className="rounded-none" disabled={busy || !questions.data?.length || questions.data.some(q => answers[q.id]===undefined)}>{busy ? 'Corrigindo…' : 'Corrigir atividade'}</Button>{feedback?.passed && next && <Button asChild variant="outline" className="rounded-none"><Link to={`/area/academia/${slug}/aula/${next.id}`}>Próxima aula <ArrowRight/></Link></Button>}</div></form></section><p className="text-[11px] text-muted-foreground leading-relaxed mt-12 border-t border-border pt-6">{EDUCATIONAL_NOTICE}</p>
  </div>;
}