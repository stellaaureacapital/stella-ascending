import { useQuery } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import { supabase } from '@/integrations/supabase/client';
import { getCatalog, getLessons } from '@/lib/academy';

export function useAcademy() {
  const { user } = useAuth();
  const catalog = useQuery({ queryKey: ['academy-catalog'], queryFn: getCatalog });
  const progress = useQuery({ queryKey: ['academy-progress', user?.id], enabled: !!user, queryFn: async () => {
    if (!user) return [];
    const { data, error } = await supabase.from('academy_progress').select('*').eq('user_id', user.id);
    if (error) throw error; return data;
  } });
  const xp = useQuery({ queryKey: ['academy-xp', user?.id], enabled: !!user, queryFn: async () => {
    if (!user) return [];
    const { data, error } = await supabase.from('academy_xp').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (error) throw error; return data;
  } });
  const certificates = useQuery({ queryKey: ['academy-certificates', user?.id], enabled: !!user, queryFn: async () => {
    if (!user) return [];
    const { data, error } = await supabase.from('academy_certificates').select('*').eq('user_id', user.id);
    if (error) throw error; return data;
  } });
  return { catalog, progress, xp, certificates };
}
export function useCourseLessons(id?: string) { return useQuery({ queryKey: ['academy-lessons', id], enabled: !!id, queryFn: () => id ? getLessons(id) : Promise.resolve([]) }); }