import { defineConfig, passthroughImageService } from "astro/config";
import awsAmplify from "astro-aws-amplify";

// https://astro.build/config
export default defineConfig({
  site: "https://josenanodev.de",
  output: "server",
  adapter: awsAmplify(),
  image: {
    service: passthroughImageService(),
  },
});
