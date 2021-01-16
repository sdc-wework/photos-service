require('./init.js');
const aws = require('aws-sdk');

const uploadFile = (fileName, fileContent) => {
  const options = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Body: fileContent,
  };
};
