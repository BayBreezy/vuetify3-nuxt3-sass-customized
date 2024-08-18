import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    defaults: defaults,
    theme: {
      defaultTheme: MAIN_THEME,
      themes: {
        mainTheme,
        mainDarkTheme,
      },
      variations: {
        colors: ["primary", "secondary"],
        lighten: 4,
        darken: 4,
      },
    },
    icons: {
      defaultSet: "custom",
      aliases,
      sets: {
        custom,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
