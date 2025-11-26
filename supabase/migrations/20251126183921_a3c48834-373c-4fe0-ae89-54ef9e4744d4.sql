-- Add restrictive policies for UPDATE and DELETE on waitlist table
-- These policies ensure no one can modify or delete waitlist entries

CREATE POLICY "No one can update waitlist entries"
ON public.waitlist
FOR UPDATE
USING (false);

CREATE POLICY "No one can delete waitlist entries"
ON public.waitlist
FOR DELETE
USING (false);