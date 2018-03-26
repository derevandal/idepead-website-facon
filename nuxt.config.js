module.exports = {
  /*
  ** Build configuration
  */
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {},
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#F1AB41" },
  /*
  ** Customize app manifest
  */
  manifest: {
    name: "Inscreva-se - FACON",
    short_name: "FACON",
    lang: "pt-br",
    theme_color: "#1E3378"
  },

  meta: {
    name: "Fale conosco - IDEPead",
    description:
      "Fale conosco a respeito de algum serviço prestado por nossos polos educaionais.",
    lang: "pt-br",
    ogHost: "https://facon.idepead.com.br/",
    ogUrl: "https://facon.idepead.com.br/",
    nativeUI: true
  },
  /*
  ** Modules
  */
  modules: [
    [
      "@nuxtjs/pwa",
      {
        workbox: false
      }
    ],
    [
      "nuxt-bulma-slim",
      {
        variablesPath: "assets/scss/variables.scss",
        additionalPaths: [
          "assets/scss/overrides.scss",
          "assets/scss/fonts.scss"
        ],
        whitelist: [".control.loading"]
      }
    ],
    "@nuxtjs/webpackmonitor"
  ],

  plugins: ["~plugins/v-validate.js"]
}
