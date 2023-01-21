import vuetify from "vite-plugin-vuetify";
// PWA Config
const title = "NuxtJS 3 + Vuetify 3 Customized";
const shortTitle = "NuxtJS 3 + Vuetify 3 Customized";
const description = "Template showing how to customize Vuetify SASS variables in a Nuxt3 webapp";
const image = "https://v3customized.behonbaker.com/screenshot.png";
const url = "https://v3customized.behonbaker.com/";

export default defineNuxtConfig({
	// Enable takeover mode for better DX
	typescript: { shim: false },
	// we have to transpile vuetify
	build: { transpile: ["vuetify"] },
	vite: {
		ssr: {
			noExternal: ["vuetify"],
		},
		define: {
			"process.env.DEBUG": false,
		},
	},
	// import styles
	css: ["vuetify/styles", "@/assets/main.scss"],
	modules: [
		"nuxt-icon",
		"@kevinmarrec/nuxt-pwa",
		async (options, nuxt) => {
			nuxt.hooks.hook("vite:extendConfig", (config) =>
				// @ts-ignore
				config.plugins.push(
					vuetify({
						styles: { configFile: "assets/variables.scss" },
					})
				)
			);
		},
	],
	// head config
	app: {
		head: {
			title,
			link: [
				{ rel: "preconnect", href: "https://rsms.me/" },
				{ rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
				{
					rel: "canonical",
					href: url,
				},
			],
			meta: [
				{
					hid: "description",
					name: "description",
					content: description,
				},
				{ property: "og:site_name", content: title },
				{ hid: "og:type", property: "og:type", content: "website" },
				{
					hid: "og:url",
					property: "og:url",
					content: url,
				},
				{
					hid: "og:image:secure_url",
					property: "og:image:secure_url",
					content: image,
				},
				{
					hid: "og:title",
					property: "og:title",
					content: title,
				},
				{
					hid: "og:description",
					property: "og:description",
					content: description,
				},
				{
					hid: "og:image",
					property: "og:image",
					content: image,
				},
				//Twitter
				{ name: "twitter:card", content: "summary_large_image" },
				{
					hid: "twitter:url",
					name: "twitter:url",
					content: url,
				},
				{
					hid: "twitter:title",
					name: "twitter:title",
					content: title,
				},
				{
					hid: "twitter:description",
					name: "twitter:description",
					content: description,
				},
				{
					hid: "twitter:image",
					name: "twitter:image",
					content: image,
				},
			],
		},
	},
	pwa: {
		meta: {
			name: shortTitle,
			author: "Behon Baker",
			theme_color: "#4f46e5",
			description: description,
		},
		manifest: {
			name: shortTitle,
			short_name: shortTitle,
			theme_color: "#4f46e5",
			description: description,
		},
	},
});
