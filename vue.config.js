module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
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
