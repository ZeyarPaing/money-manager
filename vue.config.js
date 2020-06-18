module.exports = {
  publicPath: './',
  devServer: {
    // port: 8080,
    // host: ''
    proxy: {
      '^/api': {
        target: 'https://kingwun-money-manager.herokuapp.com',
        ws: true,
        secure: false,
      },
    },
  },
  pwa: {
    themeColor: '#4c5cb3',
    msTileColor: '#4c5cb3',
    display: 'standalone',
    appleMobileWebAppCache: 'yes',
    manifestOptions: {
      background_color: '#4554a3',
    },
  },
}
