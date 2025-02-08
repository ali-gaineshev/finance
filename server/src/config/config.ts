interface Config {
    NODE_ENV: string;
    PORT: string;
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRY: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRY: string;
    REFRESH_TOKEN_EXPIRY_SECONDS: number;
    CLIENT_URL: string;
    DB_URL: string;
}

export default {
    // Server
    NODE_ENV: process.env.NODE_ENV || "DEV",
    PORT: process.env.PORT || "",

    // Tokens
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "",
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "",
    REFRESH_TOKEN_EXPIRY_SECONDS: parseInt(process.env.REFRESH_TOKEN_EXPIRY_SECONDS || "604800", 10), // Default to 7 days in seconds

    // URLs
    CLIENT_URL: process.env.CLIENT_URL || "",
    DB_URL: process.env.MONGO_URI || "",
} as Config;
