import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database.js';
import { verifyToken } from '../middleware.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production';

// Register route
router.post('/register', (req, res) => {
  const { username, email, password, fullName } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insert user into database
  db.run(
    'INSERT INTO users (username, email, password, fullName) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, fullName || ''],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: this.lastID, username, email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: this.lastID,
          username,
          email,
          fullName: fullName || ''
        }
      });
    }
  );
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Find user in database
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verify password
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode
      }
    });
  });
});

// Get user profile route
router.get('/profile', verifyToken, (req, res) => {
  db.get('SELECT id, username, email, fullName, phone, address, city, state, zipCode, createdAt FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, user });
  });
});

// Update user profile route
router.put('/profile', verifyToken, (req, res) => {
  const { fullName, phone, address, city, state, zipCode } = req.body;

  db.run(
    'UPDATE users SET fullName = ?, phone = ?, address = ?, city = ?, state = ?, zipCode = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [fullName, phone, address, city, state, zipCode, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({
        success: true,
        message: 'Profile updated successfully'
      });
    }
  );
});

// Verify token route
router.get('/verify', verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
