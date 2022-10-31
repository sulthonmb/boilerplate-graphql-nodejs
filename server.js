const env = require('./env')
const app = require('./app')
const http = require('http')
const clusterLoader = require('./app/config/cluster')
const cluster = require('cluster')
const { ApolloServer } = require('apollo-server-express')
const {
  graphqlUploadExpress,
} = require('graphql-upload')
const resolvers = require('./app/resolvers')
const typeDefs = require('./app/typeDefs')
const jwt = require('jsonwebtoken')
const { Users, Roles, Actions } = require('./app/database/models')

const setupServer = async (isClusterRequired) => {
  // if it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    clusterLoader()
  } else {
    // to setup server configurations and share port address for incoming requests
    app.server = http.createServer(app)
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        const { token } = req.headers
        if (token) {
          const decoded = await jwt.verify(token, process.env.SECRET)
          let userActions = []
          if(decoded){
            const data = await Actions.findAll({
              attibutes: ['id'],
              include: [{
                  model: Roles,
                  include: [{
                      model: Users,
                      through: {
                          where: {
                              userId: decoded.id
                          }
                      }
                  }]
              }]
            })
            userActions = data.map(item => item.id)
          }

          return { 
            user: decoded,
            userActions
          }
        }
      },
    })
    await server.start()
    app.use(graphqlUploadExpress())
    server.applyMiddleware({ app })
    app.listen(env.port, () => console.log(`Listening on port: ${env.expose_port}, Worker ${cluster.worker.process.pid}`))
  }
}

setupServer(true)

module.exports = app