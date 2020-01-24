require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  ssl: true
});

client.connect();

module.exports = client;
