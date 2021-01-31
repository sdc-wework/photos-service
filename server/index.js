const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/photos', async (req, res) => {
  const photos = await db.getAllPhotos();
  res.json(photos);
});

app.get('/api/photos/:id', async (req, res) => {
  const { id } = req.params;
  const photo = await db.getPhotoById(id);
  res.json(photo);
});

app.get('/api/photos/workspace/:workspaceId', async (req, res) => {
  const { workspaceId } = req.params;
  const photos = await db.getPhotosByWorkspaceId(workspaceId);
  res.json(photos);
});

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const port = process.env.PORT ? process.env.PORT : 6001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
