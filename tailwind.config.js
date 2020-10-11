module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: [],
    theme: {
        container: {
            center: true,
            padding: "2rem",
        },
        colors: {
            lightgreen: "#d4fce8",
            green1: "#323232",
            tan1: "#84a9ac",
            baby1: "#e4e3e3",
            lime1: "#A1C16D",
            bluem1: "#eeeeee",
            blueLight1: "#b2ebf2",
            black: "#000000",
            white: "#ffffff",
        },
        height: (theme) => ({
            "screen/2": "50vh",
            "screen/3": "calc(100vh * .65)",
            "screen/4": "calc(100vh / 4)",
            "screen/5": "calc(100vh * .1)",
            "screen/6": "calc(100vh * .07)",
            "screen/7": "calc(100vh * .51)",
            "screen/1": "100vh",
        }),
    },
    variants: {},
    plugins: [
        require("@tailwindcss/ui")({
            layout: "sidebar",
        }),
    ],
};