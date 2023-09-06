const express = require("express");
const mysql = require("mysql2"); // Import the mysql2 package
const app = express();

const PORT = 3003;

// Create a MySQL connection pool without a password
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root", // Empty password
  database: "user",
});

// Test the database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

// Define your Express routes here and use the 'db' pool to execute queries

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
