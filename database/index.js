// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '../.env') });
// const helper = require('./helper.js');

// const mongoose = require('mongoose');

// const mongo = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'mongodb://localhost/spacework';
// mongoose.connect(mongo, { useUnifiedTopology: true, useNewUrlParser: true });

// const photoSchema = mongoose.Schema({
//   id: Number,
//   workspaceId: Number,
//   description: String,
//   url: String,
// });
// const Photo = mongoose.model('Photo', photoSchema);

// const getAllPhotos = async () => await Photo.find({}).exec();

// const getPhotoById = async id => await Photo.findOne({ id });

// const getPhotosByWorkspaceId = async workspaceId => await Photo.find({ workspaceId }).exec();

// // CUD

// const savePhoto = async (workspaceId, url, description) => {

//   let getGreatestIdDoc = await Photo.find().sort({ id: -1 }).limit(1);
//   let greatestIdInDb = getGreatestIdDoc[0].id;
//   let nextAvailableId = greatestIdInDb + 1;

//   !description ? description = await helper.getDescriptionWord() : null;

//   let document = await helper.createDocument(nextAvailableId, workspaceId, description, url);
//   let savePhoto = await Photo.create(document);

//   return savePhoto;
// };

// const updatePhoto = async (id, url, description) => {
//   let fieldsToUpdate = {};

//   url ? fieldsToUpdate.url = url : null;
//   description ? fieldsToUpdate.description = description : null;

//   let updatePhoto = await Photo.updateOne({ id: id }, fieldsToUpdate);

//   return updatePhoto;
// };

// const deletePhotoById = async (id) => await Photo.deleteOne({ id: id });

// const deletePhotosByWorkspaceId = async (workspaceId) => await Photo.deleteMany({ workspaceId: workspaceId });


// module.exports = {
//   Photo,
//   getAllPhotos,
//   getPhotoById,
//   getPhotosByWorkspaceId,
//   savePhoto,
//   updatePhoto,
//   deletePhotoById,
//   deletePhotosByWorkspaceId
// };



