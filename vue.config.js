module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    iconPaths: {
       favicon32: 'public/favicon-32x32.png',
    }
  },
  "devServer": {
    "proxy": {
      "/ZUP/odata/standard.odata/*": {
        "target": "http://localhost:82",
        "ws": true,
        "changeOrigin": true
      }
    }
  }
}
