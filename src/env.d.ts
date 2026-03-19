/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** Admin password for CMS authentication (required for SSR) */
  readonly ADMIN_PASSWORD: string;
  /** Anthropic API key for blog generation (required for SSR) */
  readonly ANTHROPIC_API_KEY: string;
  /** GitHub token for publishing blog posts (required for SSR) */
  readonly GITHUB_TOKEN: string;
  /** GitHub repository in format owner/repo */
  readonly GITHUB_REPO: string;
  /** True in production builds */
  readonly PROD: boolean;
  /** True in development mode */
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
