const https = require('https');
const s3 = require('./s3.js');

const imageUrls = require('./image-urls.js');
let photosLimit = 700;

const getImage = url => {
  return new Promise((resolve, reject) => {
    let image = Buffer.alloc(0);
    https.get(url, res => {
      res.on('data', data => {
        const chunk = Buffer.from(data);
        image = Buffer.concat([image, chunk]);
      });
      res.on('end', data => {
        resolve(image);
      });
    }).on('error', error => {
      reject(error);
    });
  });
};

const uploadPhotos = async urls => {
  await s3.createBucket();
  for (let i = 0; i < urls.length && i < photosLimit; i++) {
    const url = urls[i];
    const urlParts = url.split('.');
    const extension = `.${urlParts[urlParts.length - 1]}`;
    const image = await getImage(url);
    await s3.uploadToS3(`photos/${i + 1}${extension}`, image, 'image/jpeg');
  }
};

const run = async () => {
  await uploadPhotos(imageUrls);
  process.exit();
};

run();

