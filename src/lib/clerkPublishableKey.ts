/** Normalize publishable key: trim, strip trailing `$`, drop accidental duplicated `KEY=` paste. */
export function normalizeClerkPublishableKey(raw: string): string {
  let s = raw.trim().replace(/\$$/, "");
  const dup = /^VITE_CLERK_PUBLISHABLE_KEY=/i;
  while (dup.test(s)) s = s.replace(dup, "").trim();
  return s;
}

/** Publishable key for Clerk (waitlist). Undefined when unset — use mailto fallback on `/waitlist`. */
export function getClerkPublishableKey(): string | undefined {
  const raw = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  if (typeof raw !== "string") return undefined;
  const normalized = normalizeClerkPublishableKey(raw);
  return normalized.length > 0 ? normalized : undefined;
}
