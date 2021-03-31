const { db } = require('../sdc-db/nosql/index.js');
const { v4: uuidv4 } = require('uuid');


const getPhotoById = async (workspaceId, id) => {
  return new Promise( async (resolve, reject) => {
    try {
      let workspacePhotos = await getPhotosByWorkspaceId(workspaceId);
      let photoInfo = workspacePhotos.find(photo => photo.id === id);
      resolve(photoInfo.url);
    } catch(e) {
      console.error('unable to get photo by id: ', e);
      reject(e);
    }
  })
};

const getPhotosByWorkspaceId = (workspaceId) => {
  return new Promise( async (resolve, reject) => {
    try {
      let res = await db.find({
        selector: {
          workspace_id: { $eq: workspaceId }
        },
        limit: 1
      });
      resolve(res);
      console.log(res);
    } catch(e) {
      console.error('unable to get photos by workspace id: ', e);
      reject(e);
    }
  });
}

const savePhoto = async (workspaceId, url, description) => {
  return new Promise( async (resolve, reject) => {
    if (!url || !description) {
      reject();
    }
    let photosInfo = await getPhotosByWorkspaceId(workspaceId);
    let document = photosInfo.docs[0];
    let _id = document._id;
    let _rev = document._rev;
    let workspacePhotos = document.photos;
    let newPhotoRecord = {
      id: `${uuidv4()}`,
      url: url,
      description: description
    };
    workspacePhotos.unshift(newPhotoRecord);

    try {
      let savePhoto = await db.insert({ _id: _id, _rev: _rev, workspace_id: workspaceId, photos: workspacePhotos , execution_stats: true});
      console.log(savePhoto);
      resolve(savePhoto);
    } catch (e) {
      console.error('unable to save photo: ', e);
      reject(e);
    }
  });
};

const updatePhoto = async (workspaceId, id, url, description) => {
  return new Promise( async (resolve, reject) => {
    if (!url && !description) {
      reject();
    };
    let photosInfo = await getPhotosByWorkspaceId(workspaceId);
    let document = photosInfo.docs[0];
    let _id = document._id;
    let _rev = document._rev;
    let workspacePhotos = document.photos;
    let updatedPhotos = workspacePhotos.map((photo) => {
      if (photo.id === id) {
        photo.url = url ? url : photo.url;
        photo.description = description ? description : photo.description;
      };
      return photo;
    });
    try {
      let updatePhotos = await db.insert({ _id: _id, _rev: _rev, workspace_id: workspaceId, photos: updatedPhotos });
      resolve(updatePhotos);
    } catch (e) {
      console.error('unable to update photo: ', e);
      reject(e);
    }
  });
};

const deletePhotoById = async (workspaceId, id) => {
  return new Promise( async (resolve, reject) => {
    let photosInfo = await getPhotosByWorkspaceId(workspaceId);
    let document = photosInfo.docs[0];
    let _id = document._id;
    let _rev = document._rev;
    let workspacePhotos = document.photos;
    let photosNotRemoved = workspacePhotos.filter((photo) => photo.id !== id);

    try {
      let updatePhotos = await db.insert({ _id: _id, _rev: _rev, workspace_id: workspaceId, photos: photosNotRemoved });
      resolve(updatePhotos);
    } catch (e) {
      console.error('unable to save photo: ', e);
      reject(e);
    }
  });
};

const deletePhotosByWorkspaceId = async (workspaceId) => {
  return new Promise( async (resolve, reject) => {
    let photosInfo = await getPhotosByWorkspaceId(workspaceId);
    let document = photosInfo.docs[0];
    let _id = document._id;
    let _rev = document._rev;
    let emptyPhotos = [];

    try {
      let removePhotos = await db.insert({ _id: _id, _rev: _rev, workspace_id: workspaceId, photos: emptyPhotos });
      resolve(removePhotos);
    } catch (e) {
      console.error('Unable to remove workspace photos: ', e);
      reject(e);
    }
  });
};

module.exports = {
  getPhotoById,
  getPhotosByWorkspaceId,
  savePhoto,
  updatePhoto,
  deletePhotoById,
  deletePhotosByWorkspaceId
};