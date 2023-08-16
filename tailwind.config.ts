import type { Config } from 'tailwindcss'

const config: Config = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				PurplePattern: "url('/PurplePattern.svg')",
			},
			colors: {
				MainGreen: "#44D375",
				MainPurple: "#6835F1",
				MainDarkGray: "#222222",
			},
			padding: { "50px": "50px", "25px": "25px" },
			gap: { "50px": "50px" },
			borderRadius: { "4xl": "3rem" },
		},
	},
	plugins: [],
};
export default config
