const AWS = require('aws-sdk')
const { configS3 } = require('./aws')

module.exports = new AWS.S3(configS3);