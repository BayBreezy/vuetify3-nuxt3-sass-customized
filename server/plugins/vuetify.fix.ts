/**
 * Special thanks to mhfeizi for this fix - > https://github.com/mhfeizi
 * https://github.com/nuxt/nuxt/issues/15412#issuecomment-1398110500
 */
export default defineNitroPlugin((nitroApp: any) => {
	nitroApp.hooks.hook("render:response", (response: any) => {
		response.body = response.body.replaceAll("/_nuxt/\0", "/_nuxt/");
	});
});
