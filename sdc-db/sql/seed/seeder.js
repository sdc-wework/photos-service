const db = require('../index.js');
const helper = require('../helpers.js');
const fs = require('fs');
const seedHelper = require('./seedHelpers.js');

const seed = async () => {
  console.time('seed');
  // get data for seed
  let photoUrls = await seedHelper.getPhotos();
  let data = await seedHelper.getWorkspaceDescriptions();

  let batchInsertCount = 1000000;
  let primaryRecordCount = 10000000;
  let PrimaryRecordBatchInserts = primaryRecordCount / batchInsertCount;
  let idIndex = 1;
  // let fakeCount = 100000;
  // let fakeBatchInserts = 2;
  let workspacesBulkInsertQ = `COPY workspaces FROM '/Users/alekortiz/Documents/Hack Reactor/Immersive/Week 25/SDC/photos-service/sdc-db/sql/seed/workspacesBatch.txt' WITH (FORMAT text, HEADER false, DELIMITER '|')`;
  let photosBulkInsertQ = `COPY photos FROM '/Users/alekortiz/Documents/Hack Reactor/Immersive/Week 25/SDC/photos-service/sdc-db/sql/seed/photosBatch.txt' WITH (FORMAT text, HEADER false, DELIMITER '|')`;
  let workspaceIdIndex = 1;
  let dataForPhotoRecords = {
    descriptions: data,
    photoUrls: photoUrls
  };

  try {
    let client = await db.getClient();
    // prepare tables
    await seedHelper.dropTables(client);
    await seedHelper.createTables(client);

    // optimizing bulk upload
    await helper.q.runQuery(client, `DROP INDEX IF EXISTS photo_id CASCADE`);
    await helper.q.runQuery(client, `DROP INDEX IF EXISTS id CASCADE`);
    await helper.q.runQuery(client, `ALTER TABLE photos SET UNLOGGED`);
    await helper.q.runQuery(client, `ALTER TABLE workspaces SET UNLOGGED`);
    client.release();

    let client2 = await db.getClient();
    for (let i = 0; i < PrimaryRecordBatchInserts; i++) {
      let recordsToInsert = batchInsertCount;

      await seedHelper.writeWorkspacesFilePromise('sdc-db/sql/seed/workspacesBatch.txt', data, recordsToInsert, idIndex);
      await helper.q.runQuery(client2, workspacesBulkInsertQ);

      idIndex += recordsToInsert;

      // insert photo records
      while (workspaceIdIndex < idIndex) {
        let currentWorkspaceId = await client2.query(`SELECT MAX(workspace_id) from PHOTOS;`);

        if (workspaceIdIndex === null) {
          workspaceIdIndex = 1;
        } else {
          workspaceIdIndex = currentWorkspaceId.rows[0].max + 1;
        }

        if (workspaceIdIndex >= idIndex) {
          break;
        }

        await seedHelper.writePhotosFilePromise('sdc-db/sql/seed/photosBatch.txt', dataForPhotoRecords, recordsToInsert, idIndex, workspaceIdIndex);
        await helper.q.runQuery(client2, photosBulkInsertQ);
      }
    }

    client2.release();
    let client3 = await db.getClient();
    // restore table settings and create indexes
    await helper.q.runQuery(client3, `ALTER TABLE workspaces SET LOGGED`);
    await helper.q.runQuery(client3, `ALTER TABLE photos SET LOGGED`);
    await helper.q.runQuery(client3, `CREATE INDEX photo_id ON photos (workspace_id);`);
    await helper.q.runQuery(client3, `CREATE INDEX workspace_id ON workspaces (workspace_id);`);
    client3.release();

    // delete last batch leftover files
    await fs.promises.unlink('sdc-db/sql/seed/workspacesBatch.txt');
    await fs.promises.unlink('sdc-db/sql/seed/photosBatch.txt');

  } catch(e) {
    console.error('Unable to seed db: ', e);
  } finally {
    console.timeEnd('seed');
  }
};

seed();


