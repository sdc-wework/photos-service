const https = require('https');

const getDescriptionWord = () => {
  return new Promise((resolve, reject) => {
    https.get('https://hipsum.co/api/?type=hipster-centric&sentences=1', res => {
      let result = '';
      res.on('data', data => {
        result += data.toString();
      });
      res.on('end', data => {
        let parsedData = JSON.parse(result);
        let wordForDescription = parsedData[0].split(' ')[0];
        resolve(wordForDescription);
      });
    }).on('error', error => {
      reject(error);
    });
  });
};

const createDocument = (id, workspaceId, description, url) => {
  let document = {
    id: id,
    workspaceId: workspaceId,
    description: description,
    url: url
  };

  return document;
};

module.exports = { getDescriptionWord, createDocument };