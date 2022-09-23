export const PORT = process.env.PORT || 3000;

export const MONGO_CONNECTION_STRING = process.env.MONGO_CONN;

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (
  ![
    MONGO_CONNECTION_STRING,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    JWT_SECRET_KEY,
  ].every(Boolean)
) {
  throw new Error(".env file is not full");
}
