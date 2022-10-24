const colors = require("tailwindcss/colors");
const iOSHeight = require('@rvxlab/tailwind-plugin-ios-full-height');

module.exports = {
    content: [
        "./public/**/*.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
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
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            slate: colors.slate,
            gray: colors.gray,
            red: colors.red,
            yellow: colors.yellow,
            blue: colors.sky,
            orange: colors.orange,
            cyan: colors.cyan,
            lime: colors.lime
        },
    },
    darkMode: "class",
    plugins: [
        require("@tailwindcss/forms"),
        require('flowbite/plugin'),
        iOSHeight
    ],
};