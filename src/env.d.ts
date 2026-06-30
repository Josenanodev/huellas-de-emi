interface ImportMetaEnv {
  readonly SECRET_MONGODB_URI: string;
  readonly SECRET_MONGODB_DB_NAME?: string;
  readonly PORT: string;
  readonly SECRET_ADMIN_PASSWORD: string;
  readonly MODE: 'development' | 'production' | 'test';
  readonly SSR: boolean;
  readonly PROD: boolean;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
