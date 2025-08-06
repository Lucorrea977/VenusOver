const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/prods', (req, res) => {
  const prods = db.prepare('SELECT * FROM products').all();
  res.json(prods);
});

router.post('/prods', (req, res) => {
  const { name, price, stock } = req.body;
  db.prepare('INSERT INTO products (name, price, stock) VALUES (?,?,?)').run(name, price, stock);
  res.json({ msg: 'Product added' });
});

router.post('/sale', (req, res) => {
  const { product_id, qty } = req.body;
  const prod = db.prepare('SELECT * FROM products WHERE id=?').get(product_id);
  if (!prod) return res.status(404).json({ error: 'No product' });
  if (prod.stock < qty) return res.status(400).json({ error: 'Stock low' });

  const total = prod.price * qty;
  db.prepare('INSERT INTO sales (product_id, qty, total) VALUES (?,?,?)').run(product_id, qty, total);
  db.prepare('UPDATE products SET stock = stock - ? WHERE id=?').run(qty, product_id);
  res.json({ msg: 'Sale done', total });
});

router.get('/stats', (req, res) => {
  const totalSales = db.prepare('SELECT SUM(total) AS total FROM sales').get().total || 0;
  const topProds = db.prepare(`
    SELECT p.name, SUM(s.qty) AS total_qty
    FROM sales s JOIN products p ON s.product_id = p.id
    GROUP BY p.name ORDER BY total_qty DESC LIMIT 5`).all();

  res.json({ totalSales, topProds });
});

module.exports = router;
