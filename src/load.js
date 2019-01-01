require('babel-register')
require('@babel/polyfill/noConflict')
const seedDatabase = require('../tests/seed/seedDatabase').default

seedDatabase()
