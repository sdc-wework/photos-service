const https = require('https');
const cloudinary = require('cloudinary');
const sharp = require('sharp');
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const imageUrls = require('../deploy/image-urls.js');
const folderName = 'sdc-spacework';

const getImage = (url) => {
  return new Promise((resolve, reject) => {
    let image = Buffer.alloc(0);
    https.get(url, res => {
      res.on('data', data => {
        const chunk = Buffer.from(data);
        image = Buffer.concat([image, chunk]);
      });
      res.on('end', async data => {
        let compressedImage = await sharp(image).toBuffer();
        resolve(compressedImage);
      });
    }).on('error', error => {
      reject(error);
    });
  });
};

const createFolder = (name) => {
  cloudinary.v2.api.create_folder(name, (error, result) => {
    if (error) {
      console.error('error creating folder: ', error);
    } else {
      return result;
    }
  });
};

const uploadPhoto = async (url, folderName) => {
  let image = await getImage(url);
  let uploadOptions = {
    folder: folderName
  };
  cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
    if (error) {
      console.log(error);
    };
  })
  .end(image);
};

const uploadPhotos = async (imageUrls, folderName) => {
  let folder = await createFolder(folderName);
  imageUrls.forEach(imageUrl => {
    uploadPhoto(imageUrl, folderName);
  });
};

uploadPhotos(imageUrls, folderName);