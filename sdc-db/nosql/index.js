require('dotenv').config();
const host = 'localhost', port = '5984';
const nano = require('nano')(`http://${process.env.couchDb_user}:${process.env.couchDb_password}@${host}:${port}`);

const dbName = 'spaceworkphotos';
const db = nano.use(dbName);

const createDb = async () => {
  try {
    const res = await nano.db.create(dbName);
    console.log(res);
  } catch (e) {
    console.error(`Could not create database: ${e}`);
  }
};

const deleteDb = async () => {
  try {
    const res = await nano.db.destroy(dbName);
    console.log(res);
  } catch (e) {
    console.error(`Could not create database: ${e}`);
  }
};

module.exports = {
  db,
  createDb,
  deleteDb
};

