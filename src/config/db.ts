import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Create a single MySQL connection
const connection =  mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "preet",
  database: process.env.DB_NAME || "todo_db"
}).promise();

export default connection;
