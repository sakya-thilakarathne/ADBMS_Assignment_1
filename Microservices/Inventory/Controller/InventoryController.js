const Inventory = require('../Model/InventoryModel');

// Create a new inventory item
exports.createInventoryItem = async (req, res) => {
  try {
    const inventoryItem = new Inventory(req.body);
    console.log('Inventory Item Data:', req.body); // Log the received data
    await inventoryItem.save();
    console.log('Inventory Item Saved:', inventoryItem); // Log the saved item
    res.status(201).json(inventoryItem);
  } catch (error) {
    console.error('Error creating inventory item:', error); // Log the error
    res.status(500).json({ error: 'Could not create inventory item' });
  }
};

// Get all inventory items
exports.getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch inventory items' });
  }
};

// Get a specific inventory item by ID
exports.getInventoryItemById = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);
    
    // Modify the response to include a message when the item is found
    res.status(200).json({ message: 'Inventory Item Updated', data: inventoryItem });
  } catch (error) {
    res.status(500).json({ error: 'Inventory item not found' });
  }
};

// Update an inventory item by ID
exports.updateInventoryItemById = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ error: 'Could not update inventory item' });
  }
};

// Delete an inventory item by ID
exports.deleteInventoryItemById = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findByIdAndRemove(req.params.id);
    res.json({ message: 'inventory deleted successfully' });
    if (!inventoryItem) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete inventory item' });
  }
};
