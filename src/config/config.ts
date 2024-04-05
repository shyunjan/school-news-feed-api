interface Config {
  MODE?: string;
  WEB?: string;
  DATABASE_URL?: string;
  JWT_SECRET?: string;
  JWT_ACCESS_TOKEN_SECRET?: string;
  JWT_ACCESS_TOKEN_EXPIRATION_TIME?: string;
  JWT_REFRESH_TOKEN_SECRET?: string;
  JWT_REFRESH_TOKEN_EXPIRATION_TIME?: string;
  AWS_REGION?: string;
  ELASTIC_CACHE_HOST?: string;
  ELASTIC_CACHE_PORT?: string;
  ELASTIC_CACHE_EXPIRED_AT?: string;
  MONGO_DB_URL?: string;
  SQS_NAME?: string;
  SQS_URL?: string;
  OLD_SQS_NAME?: string;
  OLD_SQS_URL?: string;
  SNS_NAME?: string;
  SNS_ENDPOINT?: string;
  EXTRA_SMS_URL?: string;
  EXTRA_SMS_TOKEN?: string;
}

export const config: Config = {
  MODE: process.env.MODE,
  WEB: process.env.WEB,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME:
    process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME:
    process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  AWS_REGION: process.env.AWS_REGION,
  ELASTIC_CACHE_HOST: process.env.ELASTIC_CACHE_HOST,
  ELASTIC_CACHE_PORT: process.env.ELASTIC_CACHE_PORT,
  ELASTIC_CACHE_EXPIRED_AT: process.env.ELASTIC_CACHE_EXPIRED_AT,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  SQS_NAME: process.env.SQS_NAME,
  SQS_URL: process.env.SQS_URL,
  OLD_SQS_NAME: process.env.OLD_SQS_NAME,
  OLD_SQS_URL: process.env.OLD_SQS_URL,
  EXTRA_SMS_URL: process.env.EXTRA_SMS_URL,
  EXTRA_SMS_TOKEN: process.env.EXTRA_SMS_TOKEN,
};
