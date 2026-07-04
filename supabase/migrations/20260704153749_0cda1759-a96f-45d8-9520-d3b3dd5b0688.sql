
-- Lock down definer functions callable via API
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_product_access(uuid, uuid) FROM PUBLIC, anon;

-- Storage: private bucket 'protected-content'
-- Path convention: {product_id}/filename.ext
CREATE POLICY "protected-content read own"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'protected-content'
    AND (
      public.has_role(auth.uid(), 'admin')
      OR public.has_product_access(
        auth.uid(),
        NULLIF((storage.foldername(name))[1], '')::uuid
      )
    )
  );

CREATE POLICY "protected-content admin write"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'protected-content'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "protected-content admin update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'protected-content' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'protected-content' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "protected-content admin delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'protected-content' AND public.has_role(auth.uid(), 'admin'));
