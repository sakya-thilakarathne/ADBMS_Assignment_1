const express = require('express');
const router = express.Router();
const InventoryController = require('../Controller/InventoryController');

// Create a new inventory item
router.post('/', InventoryController.createInventoryItem);

// Get all inventory items
router.get('/getAll', InventoryController.getAllInventoryItems);

// Get a specific inventory item by ID
router.get('/:id', InventoryController.getInventoryItemById);

// Update an inventory item by ID
router.put('/:id', InventoryController.updateInventoryItemById);

// Delete an inventory item by ID
router.delete('/:id', InventoryController.deleteInventoryItemById);

module.exports = router;
