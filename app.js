const express = require('express')
const compression = require('compression')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const basicAuth = require('basic-auth')
const responseTime = require('response-time')
const morgan = require('morgan')
const winston = require('./app/config/winston')
const env = require('./env')
// import swaggerDocument from './docs/swagger.json'

// const auth = function (req, res, next) {
//   const user = basicAuth(req)
//   if (!user || !user.name || !user.pass) {
//     res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
//     res.sendStatus(401)
//     return
//   }
//   if (user.name === env.user_docs && user.pass === env.pass_docs) {
//     next()
//   } else {
//     res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
//     res.sendStatus(401)
//   }
// }

const helmet = require('helmet')
const app = express()

app.use(compression())

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(helmet())
app.use(responseTime())
app.use(cors())
// Add logging
if (env.environment === 'development' || env.environment === 'production') {
  app.use(morgan('combined', { stream: winston.stream }))
}
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/* Route Docs */
// app.use('/docs', auth, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/* Route App */
// app.use('/api/v1', adminRoutes)
// app.use('/api/v1', authRoutes)

// app.use('/api/v1', restaurantsRoutes)
// app.use('/api/v1', transactionsRoutes)
// app.use('/api/v1', purchaseOrdersRoutes)

module.exports = app