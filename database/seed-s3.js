const https = require('https');
const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand
} = require('@aws-sdk/client-s3');

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

const uploadToS3 = async (fileName, fileBody, fileType = '') => {
  const s3 = new S3Client({ region: process.env.AWS_REGION });
  // Create bucket if does not exist
  try {
    const data = await s3.send(new CreateBucketCommand({
      Bucket: process.env.AWS_S3_BUCKET,
    }));
    console.log(`Success. Bucket created: ${process.env.AWS_S3_BUCKET}`);
  } catch (err) {
    console.log(`${process.env.AWS_S3_BUCKET} already exists`);
  }
  // Upload file to bucket
  try {
    const results = await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileBody,
      ContentType: fileType,
    }));
    console.log(`Successfully uploaded data to ${process.env.AWS_S3_BUCKET}/${fileName}`);
  } catch (err) {
    console.log('Error', err);
  }
};

const uploadPhotos = async urls => {
  for (let i = 0; i < urls.length && i < photosLimit; i++) {
    const url = urls[i];
    const urlParts = url.split('.');
    const extension = `.${urlParts[urlParts.length - 1]}`;
    const image = await getImage(url);
    await uploadToS3(`${i + 1}${extension}`, image, 'image/jpeg');
  }
};

const run = async () => {
  await uploadPhotos(imageUrls);
  process.exit();
};

run();

