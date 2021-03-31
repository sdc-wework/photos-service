const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');

const app = express();

module.exports.app = app;

// dev
// const morgan = require('morgan');
// app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/photos', async (req, res) => {
  const photos = await db.getAllPhotos();
  res.json(photos);
});