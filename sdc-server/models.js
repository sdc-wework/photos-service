const { db } = require('../sdc-db/nosql/index.js');

const getPhotoById = async (id) => await db.get({ _id: id });

const getPhotosByWorkspaceId = async (workspaceId) => {
  return new Promise( async (resolve, reject) => {
    try {
      let res = await db.find({
        selector: {
          workspace_id: { $eq: workspaceId }
        }
      })
      let photosInfo = res.docs[0].photos;
      resolve(photosInfo);
    } catch(e) {
      console.log(e);
      reject(e);
    }
  });
}

// const savePhoto = async (workspaceId, url, description) => ;

// const updatePhoto = async (id, url, description) => ;

// const deletePhotoById = async (id) => ;

// const deletePhotosByWorkspaceId = async (workspaceId) => ;

module.exports = {
  getPhotoById,
  getPhotosByWorkspaceId,
  // savePhoto,
  // updatePhoto,
  // deletePhotoById,
  // deletePhotosByWorkspaceId
};