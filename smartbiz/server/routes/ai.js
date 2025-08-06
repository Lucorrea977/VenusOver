const express = require('express');
const db = require('../db');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const router = express.Router();

router.get('/insights', async (req, res) => {
  const sales = db.prepare('SELECT * FROM sales').all();
  const dataStr = JSON.stringify(sales);

  try {
    const resp = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Eres un experto analista de ventas' },
        { role: 'user', content: `Analiza estos datos y dame resumen y consejos: ${dataStr}` }
      ],
    });
    res.json({ insights: resp.choices[0].message.content });
  } catch {
    res.status(500).json({ error: 'Error IA' });
  }
});

module.exports = router;
