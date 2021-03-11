const nano = require('nano')('http://sdc:SDC1234567890!@localhost:5984');

const createDb = async (dbName) => {
  try {
    const res = await nano.db.create(dbName);
    console.log(res);
  } catch (e) {
    console.error(`Could not create database: ${e}`);
  }
};

const deleteDb = async (dbName) => {
  try {
    const res = await nano.db.destroy(dbName);
    console.log(res);
  } catch (e) {
    console.error(`Could not create database: ${e}`);
  }
};

