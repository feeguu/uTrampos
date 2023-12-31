/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")
export default {
	content: ["./src/**/*.vue"],
	theme: {
		extend: {
			fontFamily: {
				lexend: ["Lexend", ...defaultTheme.fontFamily.sans],
				sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
}
