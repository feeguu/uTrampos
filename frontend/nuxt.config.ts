// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	srcDir: "src/",
	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	build: {
		transpile: ["vue-remix-icons"],
	},
	typescript: {
		typeCheck: false,
	},
	modules: ["@pinia/nuxt"],
	app: {
		head: {
			title: "uTrampos",
		},
	},
})
