const db = require('../index.js');
const helper = require('../helpers.js');
const writeRecordsToTxt = require('./writeTxtFile.js');
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


const seed = async () => {

  let client = await db.getClient();

  // get data for seed
  // let photoUrls = await getPhotos();
  // let descriptionWords = getPhotoDescriptions();
  let data = await getWorkspaceDescriptions();

  let batchInsertCount = 5000000;
  let primaryRecordCount = 10000000;
  let batchInserts = primaryRecordCount / batchInsertCount;
  let fakeCount = 100000;
  let fakeBatchInserts = 5;

  try {
    // // prepare tables
    await dropTables(client);
    await createTables(client);

    let client2 = await db.getClient();

    // for (let i = 0; i < 5; i++) {
    let writeStream = fs.createWriteStream('sdc-db/sql/seed/batch.txt');
    await writeRecordsToTxt(data, fakeCount, writeStream, 'utf-8', async () => {
      await writeStream.end();
      console.log('Done writting records to file');

      let query = `COPY workspaces FROM '/Users/alekortiz/Documents/Hack Reactor/Immersive/Week 25/SDC/photos-service/sdc-db/sql/seed/batch.txt' WITH (FORMAT text, HEADER false, DELIMITER '|')`;

      await helper.q.runQuery(client2, query);
      fs.unlinkSync('sdc-db/sql/seed/batch.txt');
    });
    // }

  } catch(e) {
    console.error('Unable to seed db: ', e);
  } finally {
    client.release();
  }
}

seed();

module.exports = getWorkspaceDescriptions;


