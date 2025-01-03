const { Pool } = require('pg');
require('dotenv').config();

// Pool de conexão com banco de dados de origem (Sistema Operacional)
const sourcePool = new Pool({
  host: process.env.SOURCE_DB_HOST,
  port: process.env.SOURCE_DB_PORT,
  database: process.env.SOURCE_DB_NAME,
  user: process.env.SOURCE_DB_USER,
  password: process.env.SOURCE_DB_PASSWORD
});

// Pool de conexão com banco de dados de destino (Data Warehouse)
const destinationPool = new Pool({
  host: process.env.DW_DB_HOST,
  port: process.env.DW_DB_PORT,
  database: process.env.DW_DB_NAME,
  user: process.env.DW_DB_USER,
  password: process.env.DW_DB_PASSWORD
});

module.exports = {
  sourcePool,
  destinationPool
};