const express = require("express");
const mysql = require("mysql2"); // Import the mysql2 package
const UserRoutes = require('./Route/UserRoute');
const app = express();

const PORT = 3003;

// Use the user routes
app.use('/user', UserRoutes);
// Define your Express routes here and use the 'db' pool to execute queries

app.listen(PORT, () => {
  console.log(`User is running on port ${PORT}`);
});

module.exports = app;