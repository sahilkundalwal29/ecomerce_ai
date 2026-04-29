const db = require('../config/database');

exports.getCart = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [cartItems] = await connection.query(
      'SELECT c.id, p.id as product_id, p.name, p.price, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?',
      [req.user.id]
    );
    connection.release();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    const connection = await db.getConnection();
    await connection.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
      [req.user.id, product_id, quantity, quantity]);
    connection.release();
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const connection = await db.getConnection();
    await connection.query('DELETE FROM cart WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    connection.release();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error: error.message });
  }
};
