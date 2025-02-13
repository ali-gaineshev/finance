interface Config {
  NODE_ENV: string;
  PORT: number;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY_SECONDS: number;
  SALT_ROUNDS: number;
  CLIENT_URL: string;
  DB_URL: string;
}

export default {
  // Server
  NODE_ENV: process.env.NODE_ENV || "DEV",
  PORT: parseInt(process.env.PORT || "5000", 10),

  // Tokens
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "1h",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  REFRESH_TOKEN_EXPIRY_SECONDS: parseInt(
    process.env.REFRESH_TOKEN_EXPIRY_SECONDS || "604800",
    10
  ), // 7 days
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || "10", 10),

  // URLs
  CLIENT_URL: process.env.CLIENT_URL || "",
  DB_URL: process.env.MONGO_URI || "",
} as Config;
