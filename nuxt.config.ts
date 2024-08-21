import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import vuetifySass from "@paro-paro/vite-plugin-vuetify-sass";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, SITE_THEME_COLOR } from "./utils/seo";

export default defineNuxtConfig({
  devtools: { enabled: true },
  // we have to transpile vuetify
  build: { transpile: ["vuetify"] },
  // import styles
  css: ["vuetify/styles", "@/assets/main.scss"],
  features: { inlineStyles: false },
  hooks: {
    "vite:extendConfig": (config) => {
      config.plugins!.push(
        vuetify({ autoImport: true }), // do not pass the 'styles' option
        vuetifySass({
          configFile: "assets/variables.scss",
        })
      );
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  modules: ["@vite-pwa/nuxt"],

  app: {
    head: {
      title: SITE_TITLE,
      link: [
        { rel: "preconnect", href: "https://rsms.me/" },
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: SITE_URL },
      ],
    },
  },
  pwa: {
    client: { installPrompt: false },
    devOptions: { suppressWarnings: true },
    includeAssets: ["favicon.ico", "robots.txt", "screenshot.png"],
    manifest: {
      background_color: "#FFFFFF",
      description: SITE_DESCRIPTION,
      icons: [
        {
          src: "icons/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "icons/maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      lang: "en",
      name: SITE_TITLE,
      short_name: SITE_TITLE,
      theme_color: SITE_THEME_COLOR,
    },
  },
  compatibilityDate: "2024-08-18",
});
