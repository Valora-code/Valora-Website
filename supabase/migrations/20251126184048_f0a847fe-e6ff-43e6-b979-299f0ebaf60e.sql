-- Add unique constraint on email to prevent duplicates at database level
-- This prevents timing attacks by ensuring consistent database behavior
ALTER TABLE public.waitlist
ADD CONSTRAINT waitlist_email_unique UNIQUE (email);