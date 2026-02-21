const mysql = require('mysql2/promise');

// Create connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Handle connection errors
pool.on('connection', (connection) => {
  console.log('MySQL connection established');
  
  connection.on('error', (err) => {
    console.error('MySQL connection error:', err.message);
  });
});

// Test the connection on startup
pool.getConnection()
  .then(connection => {
    console.log('Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });

module.exports = pool;
