import { defineConfig } from 'astro/config';
import awsAmplify from 'astro-aws-amplify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: awsAmplify(),
  server: {
    port: 4321,
    host: true
  }
});
