const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const connection = await db.getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
      [username, email, hashedPassword]);
    connection.release();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await db.getConnection();
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    connection.release();
    
    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user[0].id, username: user[0].username, email: user[0].email } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [user] = await connection.query('SELECT id, username, email FROM users WHERE id = ?', [req.params.id]);
    connection.release();
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};
