const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth');
const sales = require('./routes/sales');
const ai = require('./routes/ai');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/sales', sales);
app.use('/api/ai', ai);

module.exports = app;