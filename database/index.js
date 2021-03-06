const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');

const mongo = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'mongodb://localhost/spacework';
mongoose.connect(mongo, { useUnifiedTopology: true, useNewUrlParser: true });

const photoSchema = mongoose.Schema({
  id: Number,
  workspaceId: Number,
  description: String,
  url: String,
});
const Photo = mongoose.model('Photo', photoSchema);

const getAllPhotos = async () => await Photo.find({}).exec();

const getPhotoById = async id => await Photo.findOne({ id });

const getPhotosByWorkspaceId = async workspaceId => await Photo.find({ workspaceId }).exec();


// CUD

// const savePhoto = async (workspaceId, url) => await // some mongo command

// const updatePhoto = async (id, url) => await // some mongo command

// const deletePhotoById = async (id) => await // some mongo command

// const deletePhotosByWorkspaceId = async (workspaceId) => await // some mongo command


module.exports = {
  Photo,
  getAllPhotos,
  getPhotoById,
  getPhotosByWorkspaceId,

};

// savePhoto,
// updatePhoto,
// deletePhotoById,
// deletePhotosByWorkspaceId

