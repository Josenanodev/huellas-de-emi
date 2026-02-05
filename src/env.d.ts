interface ImportMetaEnv {
  readonly SECRET_MONGODB_URI: string;
  readonly PORT: string;
  readonly SECRET_ADMIN_PASSWORD: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}