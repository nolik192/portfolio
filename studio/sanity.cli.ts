import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  studioHost: "bortsov",
  deployment: {
    appId: "uvsomuzfwh073x6ooln7b1ms",
  },
});
