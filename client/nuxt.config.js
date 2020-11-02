require("dotenv").config();

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  // ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "client",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/main.css",
    "@/node_modules/vue-chessboard/dist/vue-chessboard.css",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/dotenv",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth",
  ],

  auth: {
    strategies: {
      local: {
        cookie: {
          name: "chess-cookie",
        },
        endpoints: {
          login: {
            url: "/users/signin",
            method: "post",
            propertyName: false,
          },
          user: {
            url: "/users/signin",
            method: "get",
            propertyName: false,
          },
          logout: {
            url: "/users/signout",
            method: "get",
          },
        },
        tokenRequired: false,
        tokenType: false,
      },
    },
    rewriteRedirects: false,
    redirect: {
      login: "/",
      logout: "/",
      home: "/home",
      callback: "/home",
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    credentials: true,
    baseURL: process.env.API_URL || "http://localhost:5000/api/v1",
    proxy: false,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // transpile: ['vuex-persistedstate]
  },
};
