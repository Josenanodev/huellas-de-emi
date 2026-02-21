// Runtime environment loader for production
// In Amplify, env vars written to .env during build need to be explicitly loaded

let envLoaded = false;

export function loadEnv() {
  if (envLoaded || typeof process === 'undefined') return;
  
  try {
    // Try to read .env file in production if it exists
    if (import.meta.env.PROD && typeof require !== 'undefined') {
      const fs = require('fs');
      const path = require('path');
      const envPath = path.join(process.cwd(), '.env');
      
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        envContent.split('\n').forEach((line: string) => {
          const [key, ...valueParts] = line.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            if (!process.env[key]) {
              process.env[key] = value;
            }
          }
        });
      }
    }
    envLoaded = true;
  } catch (error) {
    console.error('Failed to load runtime env:', error);
  }
}

// Auto-load on import
loadEnv();
