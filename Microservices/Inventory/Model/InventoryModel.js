const mongoose = require('mongoose'); // Import the mongoose instance from dbconnection.js

const InventorySchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    unitprice: { type: String, required: true },
    quantity: { type: String, required: true },
});

module.exports = mongoose.model('Inventory', InventorySchema);
