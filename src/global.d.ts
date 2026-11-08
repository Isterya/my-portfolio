/// <reference types="vite/client" />

// Asset imports (*.svg, *.webp and the rest) are already typed by vite/client.

interface ViteTypeOptions {
  // Without this every import.meta.env.* is `any`: a misspelled or undeclared variable compiles.
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  /** Base URL of the contact API (server/), without a trailing slash. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
