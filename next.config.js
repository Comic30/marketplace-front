require("dotenv").config({ path: "./.env" });
const nextConfig = {
  env: {
    TOKEN_STORAGE_API_KEY: process.env.TOKEN_STORAGE_API_KEY,
  },
};

module.exports = nextConfig;
