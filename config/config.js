require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: process.env.DB_DIALECT_DEV,
  },
  test: {
    username: process.env.DB_USERNAME_TESTING,
    password: process.env.DB_PASSWORD_TESTING,
    database: process.env.DB_NAME_TESTING,
    host: process.env.DB_HOST_TESTING,
    dialect: process.env.DB_DIALECT_TESTING,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
