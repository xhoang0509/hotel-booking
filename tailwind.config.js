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
            't-primary': '#0071C2',
            'yellow-bg': '#FEBB02',
            secondary: '#bdbdbd',
            white: '#ffffff',
            black: '#000000',
            action: '#006ce4',
            red: '#FF0000',
            link: '#1677ff',
        },
    },
    plugins: [],
};
