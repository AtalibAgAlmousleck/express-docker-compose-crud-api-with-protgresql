const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "express_api",
  password: "Admin",
  port: "5432",
});

// create user table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  );
`;

pool
  .query(createTableQuery)
  .then(() => console.log("Users table created successfully"))
  .catch((err) => console.error("Error creating users table:", err));

module.exports = {
  pool,
};
