import { Link, useParams } from 'react-router-dom';
import { Lock, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { useAcademy, useCourseLessons } from '@/hooks/use-academy';
import AcademyHeading from '@/components/academy/AcademyHeading';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function Course() {
  const { slug } = useParams();
  const { catalog, progress } = useAcademy();
  const product = catalog.data?.find(c => c.slug === slug);
  const lessons = useCourseLessons(product?.id);
  const done = new Set(progress.data?.map(p => p.lesson_id));
  if (catalog.isLoading) return <p>Carregando…</p>;
  if (!product) return <AcademyHeading title="Curso não encontrado"/>;
  const published = lessons.data?.filter(l => l.published) ?? [];
  const completed = published.filter(l => done.has(l.id)).length;
  const modules = [...new Set(lessons.data?.map(l => l.module_title))];
  return <div className="max-w-4xl"><Button asChild variant="link" className="px-0 mb-6"><Link to="/area/jornada">← Minha jornada</Link></Button><AcademyHeading title={product.title}>{product.education_meta.level} · {product.education_meta.hours} horas · {product.education_meta.modules} módulos</AcademyHeading>
    {product.status !== 'active' && <p className="text-sm text-gold mb-6 border-l-2 border-gold pl-4">Curso em desenvolvimento editorial. As aulas disponíveis para revisão não representam o curso completo.</p>}
    <div className="flex justify-between text-xs text-muted-foreground mb-2"><span>Aulas concluídas</span><span>{completed}/{published.length}</span></div><Progress value={published.length ? completed/published.length*100 : 0} className="mb-10"/>
    {lessons.isLoading && <p>Carregando trilha…</p>}{lessons.isError && <p role="alert" className="text-sm text-muted-foreground">Este curso ainda não está liberado para sua conta. <Button asChild variant="link"><Link to="/assinatura">Consultar assinatura</Link></Button></p>}
    {modules.map((m, i) => <section key={m} className="mb-10"><p className="text-[10px] uppercase text-gold mb-2">Módulo {i+1}</p><h2 className="font-serif text-3xl mb-6">{m}</h2><ol className="border-l border-border ml-5 space-y-5">{lessons.data?.filter(l => l.module_title===m).map(l => <li key={l.id} className="pl-7 relative"><span className={`absolute -left-5 top-2 h-10 w-10 bg-background border flex items-center justify-center rounded-full ${done.has(l.id) ? 'border-gold text-gold' : 'border-border text-muted-foreground'}`}>{done.has(l.id) ? <CheckCircle2 className="h-5 w-5"/> : l.available ? <BookOpen className="h-5 w-5"/> : <Lock className="h-4 w-4"/>}</span><div className="py-3 flex items-center justify-between gap-4"><div><h3 className="text-sm font-medium">{l.title}</h3><p className="text-xs text-muted-foreground mt-1">{l.minutes} min · {done.has(l.id) ? 'Concluída' : l.available ? 'Disponível · 30 XP' : 'Bloqueada'}</p></div><Button asChild={l.available} disabled={!l.available} size="icon" variant="outline" aria-label={`Estudar ${l.title}`}>{l.available ? <Link to={`/area/academia/${slug}/aula/${l.id}`}><ArrowRight/></Link> : <Lock/>}</Button></div></li>)}</ol></section>)}
    {!lessons.isLoading && !lessons.isError && !lessons.data?.length && <p className="text-sm text-muted-foreground">As aulas estão em preparação editorial.</p>}
  </div>;
}