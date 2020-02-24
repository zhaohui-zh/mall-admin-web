'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 本地后台
  // BASE_API: '"http://localhost:8080"'
  // 远程后台
  BASE_API: '"http://120.27.63.9:8080"'
})
