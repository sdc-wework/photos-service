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
  try {
    const photo = await db.getPhotoById(id);
    res.json(photo);
  } catch (err) {
    console.error(`No error exits for id: ${id}`);
    res.sendStatus(500);
  }
});

app.get('/api/photos/workspace/:workspaceId', async (req, res) => {
  const { workspaceId } = req.params;
  try {
    const photos = await db.getPhotosByWorkspaceId(workspaceId);
    res.json(photos);
  } catch (err) {
    console.error(`No photos exist for workspaceId: ${workspaceId}`);
    res.sendStatus(500);
  }
});

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


// CUD

app.post('/api/photos/workspace/:workspaceId', async (req, res) => {

  const { workspaceId } = req.params;
  const newPhotoInfo = req.body;
  const newPhotoUrl = newPhotoInfo.url;
  const newPhotodescription = newPhotoInfo.description;

  try {
    await db.savePhoto(workspaceId, newPhotoUrl, newPhotodescription);
    res.sendStatus(201);
  } catch (err) {
    console.error('Unable to save photo: ', err);
    res.sendStatus(500);
  }
});


app.put('/api/photos/:id', async (req, res) => {

  const { id } = req.params;
  const newPhotoInfo = req.body;
  const newPhotoUrl = newPhotoInfo.url;
  const newPhotoDescription = newPhotoInfo.description;

  try {
    await db.updatePhoto(id, newPhotoUrl, newPhotoDescription);
    res.sendStatus(201);
  } catch (err) {
    console.error('Unable to update photo: ', err);
    res.sendStatus(500);
  }
});


app.delete('/api/photos/:id', async (req, res) => {

  const { id } = req.params;

  try {
    await db.deletePhotoById(id);
    res.sendStatus(201);
  } catch (err) {
    console.error('Unable to delete photo: ', err);
    res.sendStatus(500);
  }
});

app.delete('/api/photos/workspace/:workspaceId', async (req, res) => {

  const { workspaceId } = req.params;

  try {
    await db.deletePhotosByWorkspaceId(workspaceId);
    res.sendStatus(201);
  } catch (err) {
    console.error('Unable to delete photos: ', err);
    res.sendStatus(500);
  }
});


// const photoSchema = mongoose.Schema({
//   id: Number,
//   workspaceId: Number,
//   description: String,
//   url: String,
// });


const port = process.env.PORT ? process.env.PORT : 6001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
