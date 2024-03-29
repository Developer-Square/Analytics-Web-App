module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./modules/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			display: ['group-hover'],
		},
	},
	plugins: [require('daisyui')],
};
