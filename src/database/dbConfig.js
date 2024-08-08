require('dotenv').config();
const { Pool } = require('pg');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_URL } = process.env;


const database = DB_URL
  ? new Pool({
        connectionString: DB_URL,       
        ssl: {
            rejectUnauthorized: false,
        },
        allowExitOnIdle: true,
    })
  : new Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        allowExitOnIdle: true
    });

try {
  /*Verifica la conexión*/
  database.query("SELECT NOW()"); 
  console.log("Database connected");  
} catch (error) {
  console.log(error);
}

module.exports = database;