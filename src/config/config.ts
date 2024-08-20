export const config = {
  NODE_ENV: process.env.NODE_ENV,
  app: {
    PORT: parseInt(process.env.APP_PORT) ?? 3000,
    VER: process.env.APP_VER,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET_KEY,
    EXPIRES: process.env.JWT_EXPIRES,
  },
  BCRYPT_ROUND: parseInt(process.env.BCRYPT_ROUND) ?? 10,
  pg: {
    HOST: process.env.PG_HOST,
    PORT: process.env.PG_PORT,
    USER: process.env.PG_USER,
    PASS: process.env.PG_PASS,
    DBNAME: process.env.PG_DBNAME,
    URL: process.env.DATABASE_URL,
  },
  API_PREFIX: `api/${process.env.APP_VER}`,
  SUPERTOKENS_HOST: process.env.SUPERTOKENS_HOST,
};
