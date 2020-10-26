module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "devServer": {
    "proxy": {
      "/ZUP/odata/standard.odata/*": {
        "target": "http://192.168.58.106:80",
        "ws": true,
        "changeOrigin": true
      }
    }
  }
}
