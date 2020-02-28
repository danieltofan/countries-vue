module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/countries-vue/' : '/',

  pwa: {
    name: 'World Countries'
  }
};