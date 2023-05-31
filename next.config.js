require("dotenv").config({ path: "./.env" });
const nextConfig = {
  env: {
    TOKEN_STORAGE_API_KEY: process.env.TOKEN_STORAGE_API_KEY,
    SERVER_URL: process.env.SERVER_URL,
    OPEN_AI_KEY: process.env.OPEN_AI_KEY,
  },
};

module.exports = nextConfig;
