const dotenv = require('dotenv')
const devKeys = require('./env/keys.dev')
const testsKeys = require('./env/keys.tests')
const prodKeys = require('./env/keys.prod')

dotenv.config()

if (process.env.NODE_ENV === 'production') {
  module.exports = prodKeys
} else if (process.env.NODE_ENV === 'development') {
  module.exports = devKeys
} else {
  module.exports = testsKeys
}