/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        colors: {
            primary: '#003580',
            'sub-primary': '#006CE6',
            "t-primary": "#0071C2",
            secondary: '#bdbdbd',
            white: '#ffffff',
            action: '#006ce4',
        },
    },
    plugins: [],
};
