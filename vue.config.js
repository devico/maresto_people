module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
   "devServer": {
     "proxy": {
      "/Corp_ZUP/odata/standard.odata/*": {
        "target": "http://people.maresto.ua:8081",
        "ws": true,
        "changeOrigin": true
      }
    }
  }
}
