// Runtime environment loader for production
// In Amplify, env vars are written to .env during preBuild and read at build time
// This file is a placeholder - env vars are available via import.meta.env

let envLoaded = false;

export function loadEnv() {
  if (envLoaded) return;
  
  // Env vars are already available via import.meta.env at build time
  // No runtime loading needed since .env is processed during build
  envLoaded = true;
}

// Auto-load on import (no-op in current implementation)
loadEnv();
