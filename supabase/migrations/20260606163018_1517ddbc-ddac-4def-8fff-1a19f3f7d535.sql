
-- Drop and recreate stricter insert policy
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;

CREATE POLICY "Anyone can submit a contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 2 AND 120
  AND length(btrim(email)) BETWEEN 5 AND 200
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(btrim(message)) BETWEEN 5 AND 5000
  AND (user_agent IS NULL OR length(user_agent) <= 500)
  AND (source IS NULL OR length(source) <= 80)
);

-- Normalization trigger: trim whitespace on insert
CREATE OR REPLACE FUNCTION public.normalize_contact_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.name := btrim(NEW.name);
  NEW.email := lower(btrim(NEW.email));
  NEW.message := btrim(NEW.message);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS normalize_contact_message_trg ON public.contact_messages;
CREATE TRIGGER normalize_contact_message_trg
BEFORE INSERT ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION public.normalize_contact_message();
