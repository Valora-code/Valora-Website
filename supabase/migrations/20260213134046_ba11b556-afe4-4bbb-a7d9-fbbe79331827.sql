
-- Explicit restrictive policies for user_roles table

-- Only admins can assign roles
CREATE POLICY "Only admins can assign roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- No one can update roles directly
CREATE POLICY "No direct role updates"
ON public.user_roles
FOR UPDATE
USING (false);

-- Only admins can delete roles
CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
