CREATE TABLE public.saved_simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  calculator text NOT NULL CHECK (char_length(calculator) BETWEEN 1 AND 60),
  category text NOT NULL CHECK (char_length(category) BETWEEN 1 AND 60),
  inputs jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX saved_simulations_user_idx ON public.saved_simulations(user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_simulations TO authenticated;
GRANT ALL ON public.saved_simulations TO service_role;
ALTER TABLE public.saved_simulations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own simulations select" ON public.saved_simulations FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Own simulations insert" ON public.saved_simulations FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Own simulations update" ON public.saved_simulations FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Own simulations delete" ON public.saved_simulations FOR DELETE TO authenticated USING (user_id = auth.uid());