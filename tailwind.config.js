/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563EB',
                    hover: '#1D4ED8',
                    light: '#DBEAFE',
                },
                secondary: {
                    DEFAULT: '#7C3AED',
                    hover: '#6D28D9',
                    light: '#EDE9FE',
                }
            }
        },
    },
    plugins: [],
}
