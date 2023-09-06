const sql = require('mssql/msnodesqlv8');
const dbConnection = require('../dbconnection');

async function getOrderDetails(req, res) {
    try {
      const pool = await sql.connect(dbConnection);
      const result = await pool.request().query(`SELECT * FROM orders`); // Adjust the query according to your schema
  
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders' });
    }
  }

async function getOrderDetailsById(req, res) {
    try {
      const order_id = req.params.orderId;
      const pool = await sql.connect(dbConnection);
      
      const result = await pool.request().input('order_id', sql.Int, order_id)
        .query(`SELECT * FROM orders WHERE order_id = @order_id;`);
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        res.json(result.recordset[0]);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching order' });
    }
  }

async function createOrder(req, res) {
  try {
    const { customer_id, order_item_id, quantity, total_cost, order_date } = req.body;
    const pool = await sql.connect(dbConnection);

    const query = `INSERT INTO orders (customer_id, order_item_id, quantity, total_cost, order_date)
                   VALUES ( @customer_id, @order_item_id, @quantity, @total_cost, @order_date);`;

    const result = await pool.request()
      
      .input('customer_id ', sql.Int, customer_id)
      .input('order_item_id ', sql.Int, order_item_id)
      .input('quantity ', sql.Int, quantity)
      .input('total_cost', sql.Decimal(10, 2), total_cost)
      .input('order_date', sql.DateTime, order_date)      
      .query(query);

    res.json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating order' });
  }
}

async function updateOrder(req, res) {
    try {
      const order_id = req.params.orderId;
      const { customer_id, order_item_id, quantity, total_cost, order_date } = req.body;
      const pool = await sql.connect(dbConnection);
  
      // Check if the order exists before attempting to update
      const checkQuery = `SELECT COUNT(*) AS orderCount FROM orders WHERE order_id = @order_id;`;
      const checkResult = await pool.request().input('order_id', sql.Int, order_id).query(checkQuery);
  
      if (checkResult.recordset[0].orderCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Update the order
      const updateQuery = `
        UPDATE ${OrderSchema.name}
        SET customer_id = @customer_id, order_item_id = @order_item_id, quantity = @quantity,
            total_cost = @total_cost, order_date = @order_date
        WHERE order_id = @order_id;
      `;
      await pool.request()
      .input('customer_id ', sql.Int, customer_id)
      .input('order_item_id ', sql.Int, order_item_id)
      .input('quantity ', sql.Int, quantity)
      .input('total_cost', sql.Decimal(10, 2), total_cost)
      .input('order_date', sql.DateTime, order_date) 
        .query(updateQuery);
  
      res.json({ message: 'Order updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating order' });
    }
  }

async function deleteOrder(req, res) {
    try {
      const order_id = req.params.orderId;
      const pool = await sql.connect(dbConnection);
  
      // Check if the order exists before attempting to delete
      const checkQuery = `SELECT COUNT(*) AS orderCount FROM orders WHERE order_id = @order_id;`;
      const checkResult = await pool.request().input('order_id', sql.Int, order_id).query(checkQuery);
  
      if (checkResult.recordset[0].orderCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Delete the order
      const deleteQuery = `DELETE FROM orders WHERE order_id = @order_id;`;
      await pool.request().input('order_id', sql.Int, order_id).query(deleteQuery);
  
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting order' });
    }
  }

  module.exports = {
    getOrderDetails,
    getOrderDetailsById,
    createOrder,
    updateOrder,
    deleteOrder,
  };