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
      },
      "/json/*": {
        "target": "http://192.168.90.50:40001",
        "ws": true,
        "changeOrigin": true
      }      
    }
  }
}
