import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
    theme: {
        defaultTheme: "dark",
        themes: {
        light: {
            colors: {
            primary: "#1976D2",
            secondary: "#424242",
            accent: "#82B1FF",
            error: "#FF5252",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FFC107",
            },
        },
        dark: {
            colors: {
            primary: "#BB86FC",
            secondary: "#03DAC6",
            accent: "#03DAC5",
            error: "#CF6679",
            info: "#03A9F4",
            success: "#4CAF50",
            warning: "#FFEB3B",
            },
        },
        },
    },
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    components,
    directives,
    });