// run queries
const runQuery = async (client, query) => {
  return new Promise((resolve, reject) => {
    client.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        let { command } = res;
        let { rowCount } = res;
        console.log(`Executed:`, command, `Inserted:`, rowCount, `items.`);
        resolve(res);
      }
    });
  });
};

const runInsertQuery = async (client, insertQuery, values) => {
  try {
    await client.query(insertQuery, values);
  } catch (err) {
    console.error('Query failed to run: ', err.stack);
  }
};

const runReadQuery = async (client, readQuery) => {
  return new Promise((resolve, reject) => {
    client.query(readQuery, (err, res) => {
      if (err) {
        reject(err);
      } else {
        const { rows } = res;
        resolve(rows);
      }
    });
  });
};

// table schema
const photos = {
  up:
    `CREATE TABLE photos (
      photo_id uuid PRIMARY KEY NOT NULL,
      description VARCHAR NOT NULL,
      url VARCHAR NOT NULL,
      workspace_id INTEGER REFERENCES workspaces (workspace_id)
    );`,
  down: `DROP TABLE IF EXISTS photos;`
};

const workspaces = {
  up:
    `CREATE TABLE workspaces (
      id uuid PRIMARY KEY NOT NULL,
      workspace_id INTEGER UNIQUE NOT NULL,
      description VARCHAR NOT NULL
    );`,
  down: `DROP TABLE IF EXISTS workspaces;`
};

// run table queries
const table = {
  photos: {
    create: (client) => runQuery(client, photos.up),
    drop: (client) => runQuery(client, photos.down)
  },
  workspaces: {
    create: (client) => runQuery(client, workspaces.up),
    drop: (client) => runQuery(client, workspaces.down)
  }
}

// Ex. insertPhotoRecord(['Photo description goes here', 'http://www.photourl.com/']);
const insertPhotoRecord = (client, values) => runInsertQuery(client, `
  INSERT INTO photos (photo_id, description, url, workspace_id)
  VALUES (uuid_generate_v4(), $1, $2, $3);
  `, values
);

// Ex. insertWorkspaceRecord([workspaceId, 'Workspace description goes here']);
const insertWorkspaceRecord = (client, descriptionValue) => runInsertQuery(client, `
INSERT INTO workspaces (id, workspace_id, description)
VALUES (uuid_generate_v4(), $1, $2);
`, descriptionValue
);

// Ex. deleteRecordQuery('photos', 'url', 'http://www.thisisurl.com/');
const deleteRecord = (client, table, conditionField, condition) => runQuery(client, `DELETE FROM ${table} WHERE ${conditionField}='${condition}';`);

// Ex. getRecord('*', 'photos'[, 'url', 'http://www.thisisurl.com/']); [optional]
const getRecord = (client, field, table, conditionField, condition) => {
  let query;
  if (!conditionField || !condition) {
    query = `SELECT ${field} FROM ${table};`
  } else {
    query = `SELECT ${field} FROM ${table} WHERE ${conditionField}='${condition}';`
  }
  return runReadQuery(client, query);
};

module.exports.table = table;
module.exports.q = {
  runQuery,
  runInsertQuery,
  runReadQuery
};
module.exports.crud = {
  insertPhotoRecord,
  insertWorkspaceRecord,
  deleteRecord,
  getRecord
};

