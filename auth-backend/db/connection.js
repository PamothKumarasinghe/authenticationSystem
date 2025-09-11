import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // load env variables

// Create a connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,   // pool size
    queueLimit: 0
});

// Test the connection (pool style)
db.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database");
        connection.release(); // important, give it back to pool
    }
});

export default db;
