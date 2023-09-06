const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require('./dbconnection'); // Import the database connection object
const InventoryRoute = require('./Route/InventoryRoute');

const PORT = 3001;
app.use(bodyParser.json());

// You don't need to call connectDB() anymore

// Use the InventoryRoute for inventory CRUD operations
app.use('/api/inventory', InventoryRoute);

app.listen(PORT, () => {
  console.log(`Inventory listening on port ${PORT}`);
});

module.exports = app;
