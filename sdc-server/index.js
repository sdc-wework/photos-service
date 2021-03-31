const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');
const router = require('./routes.js');

const app = express();
module.exports.app = app;

// dev
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT ? process.env.PORT : 6001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});