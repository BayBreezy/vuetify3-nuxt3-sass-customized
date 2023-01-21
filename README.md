# Customize Nuxt 3 + Vuetify 3 SASS Variables

![Desktop](/public/screenshot.png)

Thanks to [Mohammad Hosein Feizi](https://github.com/mhfeizi) for the temporary solution provided here [Github link](https://github.com/nuxt/nuxt/issues/15412#issuecomment-1398110500). The Errors are now gone from the console

## # The code that helped

- Create a Nitro plugin at `server/plugins/vuetify.fix.ts`

- Add this to the plugin

```ts
export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook("render:response", (response: any) => {
		response.body = response.body.replaceAll("/_nuxt/\0", "/_nuxt/");
	});
});
```
