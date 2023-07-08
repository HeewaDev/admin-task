const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Update with your actual username
  password: "Hiwatech#1", // Update with your actual password
  host: "localhost",
  port: 5432,
  database: "postgres", // Update with your actual database name
});

module.exports = pool;
