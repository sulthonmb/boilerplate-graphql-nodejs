require('dotenv').config()

const conf = {}
conf.environment = process.env.NODE_ENV
conf.sequelize = {}
conf.sequelize.username = process.env.PGUSER
conf.sequelize.password = process.env.PGPASSWORD
conf.sequelize.database = process.env.PGDATABASE
conf.sequelize.host = process.env.PGHOST
conf.sequelize.dialect = 'postgres'
conf.sequelize.port = process.env.PGPORT
conf.sequelize.define = {
  charset: 'utf8mb4',
  dialectOptions: {
    collate: 'utf8mb4_unicode_ci'
  }
}
conf.ROUND_SALT = process.env.ROUND_SALT

const cfg = {}
cfg[process.env.NODE_ENV] = conf.sequelize

module.exports = cfg
