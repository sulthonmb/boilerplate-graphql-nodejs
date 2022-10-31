const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  pg_database_host: process.env.PGHOST,
  pg_database_port: process.env.PGPORT,
  pg_database_name: process.env.PGDATABASE,
  pg_database_user: process.env.PGUSER,
  pg_database_pass: process.env.PGPASSWORD,
  secret: process.env.SECRET,
  port: process.env.PORT || 5055,
  environment: process.env.NODE_ENV,
  round_salt: process.env.ROUND_SALT,
  user_docs: process.env.USER_DOCS,
  pass_docs: process.env.PASS_DOCS,
  api_key: process.env.API_KEY,
  expose_port: process.env.EXPOSE_PORT,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_access_key_secret: process.env.AWS_ACCESS_KEY_SECRET,
  aws_s3_region: process.env.AWS_S3_REGION,
  aws_s3_bucket: process.env.AWS_S3_BUCKET
}