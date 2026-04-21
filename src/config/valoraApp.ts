/**
 * Base URL of the Valora web app (no trailing slash).
 * Set `VITE_VALORA_APP_ORIGIN` in `.env` for local or production app hosts.
 */
export function getValoraAppOrigin(): string {
  const raw = import.meta.env.VITE_VALORA_APP_ORIGIN as string | undefined;
  if (raw && raw.trim().length > 0) {
    return raw.replace(/\/$/, '');
  }
  return 'https://app.valora-tech.com';
}

export function getSignupUrl(): string {
  return `${getValoraAppOrigin()}/register`;
}
