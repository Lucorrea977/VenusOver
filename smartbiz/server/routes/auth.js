const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'secret';

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  try {
    db.prepare('INSERT INTO users (name,email,password) VALUES (?,?,?)').run(name, email, hash);
    res.json({ msg: 'User created' });
  } catch {
    res.status(400).json({ error: 'Email exists' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email=?').get(email);
  if (!user) return res.status(401).json({ error: 'No user' });
  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Wrong pass' });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '2h' });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

module.exports = router;
