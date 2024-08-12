require('dotenv').config();
const { Pool } = require('pg');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_STRING_URL } = process.env;

const database = DB_STRING_URL
  ? new Pool({
        // ya que está dentro de un objeto, se asigna DB_STRING_URL en connectionString para obtener su value
        connectionString: DB_STRING_URL,       
        ssl: {
            rejectUnauthorized: false,
        },
        allowExitOnIdle: true,
    })
  : new Pool({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        allowExitOnIdle: true,
    });

try {
  /*Verifica la conexión*/
  database.query("SELECT NOW()"); 
  console.log("Database connected");  
} catch (error) {
  console.error("Database connection error:", error);
}

module.exports = database;