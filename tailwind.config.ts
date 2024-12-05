import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				PurplePattern: "url('/PurplePattern.svg')",
			},
			colors: {
				MainColor: "#6F9CEB",
				SecondColor: "#004E98",
				LightColor: "#e0ecff",
				DarkColor: "#141B41",

				MainDarkGray: "#222222",
				MainRed: "#f13535",
				MediumGray: "#D9D9D9",
				LightGray: "#D9D9D9",
				LightRed: "#ffe2e2",
			},
			padding: {
				"50px": "50px",
				"25px": "25px",
				"0.75": "3px",
			},
			gap: { "50px": "50px" },
			borderRadius: { "4xl": "2rem" },
			screens: {
				"4xl": "2048px",
				"3xl": "1792px",
				xs: "512px",
				"2xs": "384px",
			},
			fontSize: {
				"2xs": "0.6rem",
			},
		},
	},
	plugins: [],
};
export default config;
