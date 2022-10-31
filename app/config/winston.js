var appRoot = require('app-root-path')
var winston = require('winston')
var datetime = require('node-datetime')
var dt = datetime.create()
var time = dt.format('Y-m-d')

var options = {
  file: {
    level: 'error',
    filename: `${appRoot}/logs/meal-delivery-app ${time}.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  fileInfo: {
    level: 'info',
    filename: `${appRoot}/logs/info-meal-delivery-app ${time}.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.File(options.fileInfo),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
})

logger.stream = {
  write: function (message, _encoding) {
    logger.info(message)
  }
}

module.exports = logger