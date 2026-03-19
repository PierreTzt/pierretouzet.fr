/**
 * Validates that required environment variables are set for SSR endpoints.
 * Call this at the top of API routes and admin pages that need these values.
 *
 * In build/CI, dummy values are acceptable (endpoints are SSR, not prerendered).
 * At runtime on Vercel, real values must be configured in the dashboard.
 */

type EnvKey = 'ADMIN_PASSWORD' | 'ANTHROPIC_API_KEY' | 'GITHUB_TOKEN' | 'GITHUB_REPO';

export function requireEnv(key: EnvKey): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Set it in your Vercel dashboard or .env file for local development.`
    );
  }
  return value;
}

export function validateAdminEnv(): { valid: boolean; missing: string[] } {
  const required: EnvKey[] = ['ADMIN_PASSWORD', 'ANTHROPIC_API_KEY', 'GITHUB_TOKEN', 'GITHUB_REPO'];
  const missing = required.filter((key) => !import.meta.env[key]);
  return {
    valid: missing.length === 0,
    missing,
  };
}
