const https = require('https');
const path = require('path');
const fs = require('fs');

const { Photo } = require('./index.js');

const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

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

const generateData = async () => {
  const images = [];
  let photoId = 1;

  const data = await getHipsum({ paras: 100 });

  for (let i = 0; i < data.length; i++) {
    const paragraph = data[i].replace(/\s+/g, ' ');
    const sentences = paragraph.split('. ');

    const firstSentence = sentences.pop().slice(0, -1);
    const words = firstSentence.toLowerCase().split(' ');
    const limit = photoId + randomIntBetween(1, 7);

    for (; photoId < limit; photoId++) {
      const description = words[randomIntBetween(0, words.length - 1)];

      const image = {
        _id: photoId,
        workspaceId: i,
        url: `/api/photos/${photoId}`,
        description: capitalize(description),
      };

      images.push(image);
    }
  }

  await Photo.deleteMany({});
  const photos = await Photo.create(images);

  console.log(`Generated: ${photos.length} photos`);

  process.exit();
};

generateData();

