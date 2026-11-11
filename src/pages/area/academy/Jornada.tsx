import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, GraduationCap, Award, Flame, Star, CheckCircle2, Circle } from 'lucide-react';
import { useAcademy, useCourseLessons } from '@/hooks/use-academy';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AcademyHeading from '@/components/academy/AcademyHeading';
import { LEVELS, levelForXp } from '@/lib/academy';

export default function Jornada() {
  const { isAdmin } = useAuth();
  const { catalog, xp, progress, certificates } = useAcademy();
  const totalXp = xp.data?.reduce((a, b) => a + b.amount, 0) ?? 0;
  const level = levelForXp(totalXp);
  const next = LEVELS.find(l => l.xp > totalXp);
  const courses = catalog.data?.filter(p => p.product_type === 'curso') ?? [];
  const first = courses.find(p => p.status === 'active') ?? (isAdmin ? courses.find(p => p.slug === 'construindo-primeiro-portfolio') : undefined);
  const lessons = useCourseLessons(first?.id);
  const done = new Set(progress.data?.map(p => p.lesson_id));
  const pending = lessons.data?.find(l => l.available && !done.has(l.id));
  const days = new Set(progress.data?.map(p => new Date(p.completed_at).toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' })));
  const medals = [{ name: 'Primeiro Passo', icon: BookOpen, won: done.size >= 1 }, { name: 'Estudioso', icon: GraduationCap, won: done.size >= 10 }, { name: 'Precisão', icon: Star, won: progress.data?.some(p => p.score === 100) }, { name: 'Conclusão', icon: Award, won: !!certificates.data?.length }];
  return <div className="max-w-6xl">
    <AcademyHeading title="Minha jornada">Conhecimento, disciplina e visão de longo prazo.</AcademyHeading>
    {(catalog.isError || progress.isError || xp.isError) && <p role="alert" className="text-destructive mb-6">Não foi possível carregar sua jornada. <Button variant="link" onClick={() => { catalog.refetch(); progress.refetch(); xp.refetch(); }}>Tentar novamente</Button></p>}
    <section className="grid sm:grid-cols-3 gap-6 pb-8 border-b border-border mb-10">
      <div><Star className="text-gold h-5 w-5 mb-3"/><p className="text-xs uppercase text-muted-foreground">Nível de aprendizagem</p><h2 className="font-serif text-3xl my-2">{level.name}</h2><Progress aria-label="Progresso para próximo nível" value={next ? 100*(totalXp-level.xp)/(next.xp-level.xp) : 100}/><p className="text-xs text-muted-foreground mt-2">{next ? `${next.xp-totalXp} XP para ${next.name}` : 'Nível máximo alcançado'}</p></div>
      <div><GraduationCap className="text-gold h-5 w-5 mb-3"/><p className="text-xs uppercase text-muted-foreground">Experiência acumulada</p><p className="font-serif text-4xl mt-2">{xp.isLoading ? '—' : totalXp} <span className="text-lg">XP</span></p><p className="text-xs text-muted-foreground mt-2">{done.size} aulas concluídas</p></div>
      <div><Flame className="text-gold h-5 w-5 mb-3"/><p className="text-xs uppercase text-muted-foreground">Dias de aprendizagem</p><p className="font-serif text-4xl mt-2">{days.size}</p><p className="text-xs text-muted-foreground mt-2">Meta diária: concluir uma aula</p></div>
    </section>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10"><div><p className="text-[10px] uppercase tracking-luxury text-gold mb-2">Próxima etapa</p><h2 className="font-serif text-2xl">{pending?.title ?? (catalog.isLoading ? 'Carregando…' : 'Sua próxima jornada começa aqui')}</h2></div><Button asChild className="h-12 rounded-none"><Link to={pending && first ? `/area/academia/${first.slug}/aula/${pending.id}` : first ? `/area/academia/${first.slug}` : '/area/meus-cursos'}>Continuar aprendendo <ArrowRight/></Link></Button></div>
    <div className="grid xl:grid-cols-[1fr_280px] gap-10"><section><h2 className="font-serif text-3xl mb-5">Trilhas de investimento</h2><div className="space-y-0 divide-y divide-border border-y border-border">{courses.map((c,index) => <div key={c.id} className="py-6 flex items-start gap-4"><span className="font-serif text-3xl text-gold">0{index+1}</span><div className="flex-1 min-w-0"><h3 className="font-serif text-2xl mb-1">{c.title}</h3><p className="text-xs text-muted-foreground">{c.education_meta.level} · {c.education_meta.hours}h · {c.education_meta.modules} módulos</p><p className="text-xs text-gold mt-3">{c.status === 'active' ? 'Disponível' : 'Em desenvolvimento editorial'}</p></div>{isAdmin || c.status === 'active' ? <Button asChild variant="ghost" size="icon" aria-label={`Abrir ${c.title}`}><Link to={`/area/academia/${c.slug}`}><ArrowRight/></Link></Button> : <Button variant="ghost" size="icon" disabled aria-label={`${c.title} em desenvolvimento`}><ArrowRight/></Button>}</div>)}</div></section><section><h2 className="font-serif text-2xl mb-5">Conquistas</h2><ul className="space-y-4">{medals.map(m => <li key={m.name} className={`flex items-center gap-3 ${m.won ? 'text-gold' : 'text-muted-foreground'}`}><m.icon className="h-5 w-5"/><span className="text-sm flex-1">{m.name}</span>{m.won ? <CheckCircle2 className="h-4 w-4"/> : <Circle className="h-4 w-4"/>}</li>)}</ul><Button asChild variant="outline" className="mt-8 w-full rounded-none"><Link to="/area/certificados"><Award/>Meus certificados</Link></Button></section></div>
    {!!xp.data?.length && <section className="mt-10"><h2 className="font-serif text-2xl mb-4">Histórico de experiência</h2><ul className="divide-y divide-border">{xp.data.slice(0,10).map(e => <li key={e.id} className="flex justify-between py-3 text-sm"><span>{e.event_key.startsWith('lesson-pass:') ? 'Avaliação de aula aprovada' : 'Aula concluída'} <span className="text-muted-foreground text-xs">· {new Date(e.created_at).toLocaleDateString('pt-BR')}</span></span><span className="text-gold">+{e.amount} XP</span></li>)}</ul></section>}
  </div>;
}