const env = require('../../env')

module.exports = {
    configS3: {
      credentials: {
        accessKeyId: env.aws_access_key_id,
        secretAccessKey: env.aws_access_key_secret,
      },
      region: env.aws_s3_region,
      params: {
        ACL: 'public-read',
        Bucket: env.aws_s3_bucket,
      },
    },
    app: {
      storageDir: 'tmp',
    },
}