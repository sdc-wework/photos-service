const https = require('https');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const imageUrls = require('../deploy/image-urls.js');
const folderName = 'sdc-spacework';

const createCloudinaryFolder = (name) => {
  cloudinary.api.create_folder(name, (error, result) => {
    if (error) {
      console.error('error creating folder: ', error);
    } else {
      return result;
    }
  });
};

const uploadOptions = {
  folder: folderName
};

const uploadPhoto = async (imageUrl, folderName) => {
    imageUrl = `${imageUrl}?q=60`;
    await cloudinary.uploader.upload(imageUrl, uploadOptions)
};

const uploadPhotos = async (imageUrls, folderName) => {
  let folder = await createCloudinaryFolder(folderName);
  for (let i = 0; i < imageUrls.length; i++) {
    console.log(i);
    let imageUrl = imageUrls[i];
    await uploadPhoto(imageUrl, folderName);
  };
};

const run = async () => {
  await uploadPhotos(imageUrls, folderName);
  process.exit();
};

run();