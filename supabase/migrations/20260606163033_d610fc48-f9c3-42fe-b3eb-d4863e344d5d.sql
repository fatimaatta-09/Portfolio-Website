
ALTER FUNCTION public.normalize_contact_message() SECURITY INVOKER;
REVOKE ALL ON FUNCTION public.normalize_contact_message() FROM PUBLIC, anon, authenticated;
