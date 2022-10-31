const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  pg_database_host: process.env.PGHOST_TEST || '103.41.204.112',
  pg_database_port: process.env.PGPORT_TEST || '5432',
  pg_database_name: process.env.PGDATABASE_TEST || 'gaali_service_users_test',
  pg_database_user: process.env.PGUSER_TEST || 'admin',
  pg_database_pass: process.env.PGPASSWORD_TEST || 'blog)r2020',
  secret: process.env.SECRET || 's*#P+3asb*t*WMu?A&UX7%#LgQz$cA+XYnMu3vFYsJda!L@%9*sVcLZu_-Zv',
  port: process.env.PORT || '3006',
  environment: process.env.NODE_ENV || 'test',
  round_salt: process.env.ROUND_SALT || '8',
  user_docs: process.env.USER_DOCS || 'user',
  pass_docs: process.env.PASS_DOCS || '12345678',
  api_key: process.env.API_KEY || '****',
  expose_port: process.env.EXPOSE_PORT || '3007',
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_access_key_secret: process.env.AWS_ACCESS_KEY_SECRET,
  aws_s3_region: process.env.AWS_S3_REGION,
  aws_s3_bucket: process.env.AWS_S3_BUCKET
}