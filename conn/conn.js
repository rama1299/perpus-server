const { Pool } = require('pg');
require('dotenv').config()

console.log(process.env.DB_USER)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');
    client.release();
  } catch (err) {
    console.error('Connection error', err.stack);
  }
};

testConnection();

module.exports = {
    pool,
    testConnection
};
