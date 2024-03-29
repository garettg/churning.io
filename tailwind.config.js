const colors = require("tailwindcss/colors");
const iOSHeight = require('@rvxlab/tailwind-plugin-ios-full-height');

module.exports = {
    content: [
        "./public/**/*.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    safelist: [
        'xl:grid-cols-1',
        'xl:grid-cols-2',
        'xl:grid-cols-3',
    ],
    theme: {
        container: {
            center: true,
        },
        screens: {
            "sm": "576px",
            "md": "768px",
            "lg": "992px",
            "xl": "1280px",
            "2xl": "1536px"
        }
    },
    darkMode: "class",
    plugins: [
        require("@tailwindcss/forms"),
        require('flowbite/plugin'),
        iOSHeight
    ],
};