const db = require('../config/database');

exports.getUserOrders = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [orders] = await connection.query(
      'SELECT o.id, o.total_price, o.status, o.created_at FROM orders o WHERE o.user_id = ?',
      [req.user.id]
    );
    connection.release();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const { total_price } = req.body;
  try {
    const connection = await db.getConnection();
    const [result] = await connection.query('INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)',
      [req.user.id, total_price, 'pending']);
    
    // Clear cart after order
    await connection.query('DELETE FROM cart WHERE user_id = ?', [req.user.id]);
    connection.release();
    
    res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [order] = await connection.query(
      'SELECT o.id, o.total_price, o.status, o.created_at FROM orders o WHERE o.id = ? AND o.user_id = ?',
      [req.params.id, req.user.id]
    );
    connection.release();
    if (order.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};
