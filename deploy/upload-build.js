const s3 = require('./s3.js');
const fs = require('fs');

const uploadBuild = async (file, encoding = '') => {
  await s3.createBucket();
  const buildFile = fs.createReadStream(file);
  buildFile.on('error', err => {
    console.log(`File error: ${err}`);
  });
  const fileParts = file.split('/');
  const fileName = fileParts[fileParts.length - 1];
  s3.uploadToS3(`js/${fileName}`, buildFile, 'text/javascript', encoding);
};

const run = async () => {
  await uploadBuild('../client/dist/photos-slider.js');
  await uploadBuild('../client/dist/photos-slider.js.gz', 'gzip');
  process.exit;
};

run();

