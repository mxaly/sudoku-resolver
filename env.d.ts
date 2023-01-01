/// <reference types="vite/client" />

import type { ENV } from "@/types/internal";

export interface ImportMetaEnv {
  readonly VITE_ENV: ENV;
  // Other env variables used in .env files go here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
