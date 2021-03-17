// run queries
const runQuery = async (client, query) => {
  try {
    let result = await client.query(query);
    let { command } = result;
    let { rowCount } = result;
    console.log(`Executed:`, command, `Inserted:`, rowCount, `items.`);
  } catch (err) {
    console.error('Query failed to run: ', err.stack);
  }
};

const runInsertQuery = async (client, insertQuery, values) => {
  try {
    await client.query(insertQuery, values);
  } catch (err) {
    console.error('Query failed to run: ', err.stack);
  }
};

const runReadQuery = async (client, readQuery) => {
  try {
    const { rows } = await client.query(readQuery);
    return rows;
  } catch (err) {
    console.error('Retrieve query failed: ', err.stack);
  }
};

// table schema query
const photos = {
  up:
    `CREATE TABLE photos (
      photo_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
      description VARCHAR NOT NULL,
      url VARCHAR NOT NULL,
      workspace_id uuid REFERENCES workspaces (workspace_id)
    );`,
  down: `DROP TABLE IF EXISTS photos;`
};

const workspaces = {
  up:
    `CREATE TABLE workspaces (
      workspace_id uuid PRIMARY KEY,
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
  INSERT INTO photos (photo_id, description, url)
  VALUES (uuid_generate_v4(), $1, $2);
  `, values
);

// Ex. insertWorkspaceRecord(['Workspace description goes here']);
const insertWorkspaceRecord = (client, descriptionValue) => runInsertQuery(client, `
INSERT INTO workspaces (workspace_id, description)
VALUES (uuid_generate_v4(), $1);
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


// csv writing
const createWorkspaceCsvRecord = (description) => {
  return {
    description: description
  };
}


module.exports.table = table;
module.exports.q = {
  runQuery: runQuery,
  runInsertQuery: runInsertQuery,
  runReadQuery: runReadQuery
};
module.exports.crud = {
  insertPhotoRecord: insertPhotoRecord,
  insertWorkspaceRecord: insertWorkspaceRecord,
  deleteRecord: deleteRecord,
  getRecord: getRecord
};
module.exports.csv = {
  createWorkspaceCsvRecord: createWorkspaceCsvRecord
};

