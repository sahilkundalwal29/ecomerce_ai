const db = require('../config/database');

exports.getAllProducts = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [products] = await connection.query('SELECT * FROM products');
    connection.release();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [product] = await connection.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    connection.release();
    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, category, image_url } = req.body;
  try {
    const connection = await db.getConnection();
    await connection.query('INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)', 
      [name, description, price, stock, category, image_url]);
    connection.release();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, stock, category, image_url } = req.body;
  try {
    const connection = await db.getConnection();
    await connection.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image_url = ? WHERE id = ?',
      [name, description, price, stock, category, image_url, req.params.id]);
    connection.release();
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const connection = await db.getConnection();
    await connection.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
