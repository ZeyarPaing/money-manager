import Vue from 'vue'

const requireModule = require.context('.', false, /\.js$/)

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return

  const mixin = requireModule(fileName).default || requireModule(fileName)

  Vue.mixin(mixin)
})
