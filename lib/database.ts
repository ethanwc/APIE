const Sequelize = require('sequelize');
// your credentials
const DATABASE_URL = 'postgres://urngixwljaclyx:f8c15e305829ecab53d3dc3f6a3723f0e8ed0f87cad1e83c23e75db91db790d1@ec2-34-197-171-33.compute-1.amazonaws.com:5432/dd8ai6jnti83ho';

const database = new Sequelize(DATABASE_URL);

module.exports = database;