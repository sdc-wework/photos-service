const redisClient = require('../sdc-db/nosql/redis-index.js');
const cacheExpiration = 1;

const check = (workspaceId) => {
  return new Promise ((resolve, reject) => {
    redisClient.get(workspaceId, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        resolve(data);
      }
    });
  });
};

const save = (workspaceId, data) => {
  return new Promise ((resolve, reject) => {
    redisClient.setex(workspaceId, cacheExpiration, JSON.stringify(data), (err, res) => {
      if (err) {
        console.error(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = { check, save };