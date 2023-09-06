const express = require('express');
const dbConnection = require('./dbconnection');
const orderRoutes = require('./Route/OrderRoute');
const app = express();

const PORT = 3002;

dbConnection.connectToDatabase();

// Middleware to parse JSON requests
app.use(express.json());

// Use the order routes
app.use('/order', orderRoutes);

app.listen(PORT, () => {
  console.log(`Order is running on port ${PORT}`);
});

module.exports = app;
