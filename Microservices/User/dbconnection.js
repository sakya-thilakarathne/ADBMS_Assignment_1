const mysql = require("mysql2");

// Create a MySQL connection pool without a password
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sakya123", // Empty password
  database: "user",
});

// Test the database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("User Connected to MySQL database");
    connection.release();
  }
});

module.exports = db;