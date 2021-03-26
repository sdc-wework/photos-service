const db = require('../index.js');
const helper = require('../helpers.js');
const writeRecordsToTxtPromise = require('./writeTxtFile.js');
const https = require('https');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const dropTables = async (client) => {
  try {
    await helper.table.photos.drop(client);
    await helper.table.workspaces.drop(client);
  } catch(e) {
    console.error(e);
  }
};

const createTables = async (client) => {
  try {
    await helper.table.workspaces.create(client);
    await helper.table.photos.create(client);
  } catch(e) {
    console.error(e);
  }
};

const getPhotos = async () => {
  let morePhotos;
  let count = 0;
  let photoUrls = [];

  while(morePhotos || count === 0) {
    let cloudinaryRes = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'sdc-spacework',
      max_results: 1700,
      next_cursor: morePhotos || ''
    });
    let { next_cursor } = cloudinaryRes;
    morePhotos = next_cursor;
    let { resources } = cloudinaryRes;
    let urls = resources.map(resource => resource.url);
    photoUrls = photoUrls.concat(urls);
    count++;
    if (count > 6) {
      console.log('Breaking out of while loop because of possible infinite loop');
      break;
    }
  }
  console.log(`Got ${photoUrls.length} photo urls from cloudinary`);
  return photoUrls;
}

const get = url => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let result = '';
      res.on('data', data => {
        result += data.toString();
      });
      res.on('end', data => {
        resolve(result);
      });
    }).on('error', error => {
      reject(error);
    });
  });
};

const getHipsum = async (params = { paras: 1 }) => {
  const paramsArray = [];
  for (let param in params) {
    paramsArray.push(`${param}=${params[param]}`);
  }
  const url = `https://hipsum.co/api/?type=hipster-centric&${paramsArray.join('&')}`;
  const data = await get(url);
  return JSON.parse(data);
};

const getPhotoDescriptions = async () => {

  const hipsum = await getHipsum({ paras: 30 });

  let descriptionWords = [];
  for (let i = 0; i < hipsum.length; i++) {
    let currentParagraph = hipsum[i];
    let splitWords = currentParagraph.split(' ');
    let words = splitWords.filter(word => word !== '');
    if (descriptionWords.length > 1700) {
      break;
    }
    descriptionWords = descriptionWords.concat(words);
  }
  return descriptionWords;
}

const getWorkspaceDescriptions = async () => {
  let descriptionSentences = [];
  let sentenceRequestLimit = 100;
  let neededNumOfSentences = 1700;
  let numberOfRequestsForSentences = neededNumOfSentences / sentenceRequestLimit;

  for (let i = 0; i < numberOfRequestsForSentences; i++) {
    let hipsum = await getHipsum({ sentences: sentenceRequestLimit });
    let sentences = hipsum[0].split('.');
    descriptionSentences = descriptionSentences.concat(sentences);
  };
  return descriptionSentences;
}

const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const writeWorkspacesFilePromise = (filePath, data, recordCount, idIndex) => {
  return new Promise(async (resolve, reject) => {
    let writeStream = fs.createWriteStream(filePath);
    await writeRecordsToTxtPromise.workspaces(data, recordCount, writeStream, 'utf-8', idIndex);
    // console.log('Done writting batch records to file');
    writeStream.end();
    writeStream.on('finish', () => resolve(true));
    writeStream.on('error', reject);
  });
}

const writePhotosFilePromise = (filePath, data, recordCount, idIndex, workspace_id) => {
  return new Promise(async (resolve, reject) => {
    let writeStream = fs.createWriteStream(filePath);
    await writeRecordsToTxtPromise.photos(data, recordCount, writeStream, 'utf-8', idIndex, workspace_id);
    // console.log('Done writting batch records to file');
    writeStream.end();
    writeStream.on('finish', () => resolve(true));
    writeStream.on('error', reject);
  });
}

module.exports = {
  dropTables,
  createTables,
  getPhotos,
  get,
  getHipsum,
  getPhotoDescriptions,
  getWorkspaceDescriptions,
  randomIntBetween,
  writeWorkspacesFilePromise,
  writePhotosFilePromise
}