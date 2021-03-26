const nano = require('nano')('http://sdc:SDC1234567890!@localhost:5984');

const db = nano.use('my-db');

module.exports = db;

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

// class Photos implements iPhoto {
//   _id: string
//   _rev: string
//   id: Number
//   workspaceId: Number,
//   description: String,
//   url: String,
// }
const steps = async () => {
  await deleteDb('my-db');
  await createDb('my-db');

  // try {
    // const create = await nano.db.create('my-partitioned-db', { partitioned: true });
    // const myDb = nano.use('my-partitioned-db');



  // // console.log(res);

  console.time('bulkInsert');
  let recordsToCreate = 10000;
  let totalInsert = 10000000;
  let batches = totalInsert / recordsToCreate;
  for (let j = 0; j < batches; j++) {
    let records = [];

    for (let i = 0; i < recordsToCreate; i++) {
      records.push({ id: `${i}`, name: `rabbit-${i}` });
    };
    const res = await myDb.bulk({ docs: records });
    console.log(`inserted batch no. ${j + 1}`);
  }
  // console.log(records);



  // console.log(res);
  console.timeEnd('bulkInsert');


  // const insert = await alek.insert({ happy: true }, 'rabbit');
    // const doclist = await alek.list();
    // const res = await alek.destroy('rabbit', '1-d1628a1063a3da5e9252ee6d52a66b12');
    // console.log(res);
  // } catch (e) {
  //   console.error(e);
  // };
};

const dbInfo = async () => {
  const info = await nano.db.get('my-db');
  console.log(info);
};
dbInfo();

// steps();
// const response = alice.insert({ happy: true }, 'rabbit');


// const getDoc = async () => {
//   try {
//     const doc = await alice.get('rabbit');
//     console.log(doc);
//   } catch (e) {
//     console.error(e);
//   }
// };

// getDoc();

