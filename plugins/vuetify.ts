import { createVuetify } from "vuetify";
import { VDataTable } from "vuetify/labs/VDataTable";

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		ssr: true,
		components: {
			VDataTable,
		},
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
