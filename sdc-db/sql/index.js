const { Pool } = require('pg');

const pool = new Pool({
  user: 'sdc',
  host: 'localhost',
  database: 'spaceworkphotos',
  password: '',
  port: 5432
});

module.exports = {
  async query(text, params) {
    const start = Date.now()
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log('executed query', { text, duration, rows: res.rowCount })
    return res
  },
  async getClient() {
    const client = await pool.connect()
    const query = client.query
    const release = client.release
    // set a timeout of one minute, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than one minute!')
      console.error(`The last executed query on this client was: ${client.lastQuery}`)
    }, 600000)
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args
      return query.apply(client, args)
    }
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = query
      client.release = release
      return release.apply(client)
    }
    return client
  }
}

// (async () => {

//   const client = await pool.connect();


//   // run queries
//   const runQuery = async (query) => {
//     try {
//       await client.query(query);
//       console.log('Query ran successfully');
//     } catch (err) {
//       console.error('Query failed to run: ', err.stack);
//     }
//   };

//   const runInsertQuery = async (insertQuery, values) => {
//     try {
//       await client.query(insertQuery, values);
//       console.log('Query ran successfully');
//     } catch (err) {
//       console.error('Query failed to run: ', err.stack);
//     }
//   };

//   const runReadQuery = async (readQuery) => {
//     try {
//       const { rows } = await client.query(query);
//       return rows;
//     } catch (err) {
//       console.error('Retrieve query failed: ', err.stack);
//     }
//   };

//   // raw table queries
//   const photos = {
//     up:
//       `CREATE TABLE photos (
//         photo_id uuid DEFAULT uuid_generate_v4 (),
//         description VARCHAR NOT NULL,
//         url VARCHAR NOT NULL
//       );`,
//     down: `DROP TABLE photos;`
//   };

//   const workspaces = {
//     up:
//       `CREATE TABLE workspaces (
//         workspace_id uuid DEFAULT uuid_generate_v4 (),
//         description VARCHAR NOT NULL
//       );`,
//     down: `DROP TABLE workspaces;`
//   };

//   // create drop table query execution
//   const tables = {
//     photos: {
//       create: () => runQuery(photos.up),
//       drop: () => runQuery(photos.down)
//     },
//     workspaces: {
//       create: () => runQuery(workspaces.up),
//       drop: () => runQuery(workspaces.down)
//     }
//   }

//   // Ex. insertPhotoRecord(['Photo description goes here', 'http://www.photourl.com/']);
//   const insertPhotoRecord = (values) => runInsertQuery(`
//     INSERT INTO photos (photo_id, description, url)
//     VALUES (uuid_generate_v4(), $1, $2);
//     `, values
//   );

//   // Ex. insertWorkspaceRecord(['Workspace description goes here']);
//   const insertWorkspaceRecord = (descriptionValue) => runInsertQuery(`
//   INSERT INTO workspaces (workspace_id, description)
//   VALUES (uuid_generate_v4(), $1);
//   `, descriptionValue
//   );

//   // Ex. deleteRecordQuery('photos', 'url', 'http://www.thisisurl.com/');
//   const deleteRecord = (table, conditionField, condition) => runQuery(`DELETE FROM ${table} WHERE ${conditionField}='${condition}';`);

//   // Ex. getRecord('*', 'photos'[, 'url', 'http://www.thisisurl.com/']); [optional]
//   const getRecord = (field, table, conditionField, condition) => {
//     let query;
//     if (!conditionField || !condition) {
//       query = `SELECT ${field} FROM ${table};`
//     } else {
//       query = `SELECT ${field} FROM ${table} WHERE ${conditionField}='${condition}';`
//     }
//     return runReadQuery(query);
//   };



//   const test = async () => {
//     try {
//       // await tables.photos.create();
//       await insertPhotoRecord(['Photo description goes here', 'http://www.photourl.com/']);
//       // await tables.workspaces.drop();
//     // let response = await getRecordQuery('*', 'photos', 'photo_id', '1228c012-9db1-45bb-802c-b2a9ffd78e78');
//     // console.log(response);
//     } catch(e) {
//       console.error(e);
//     } finally {
//       client.release();
//     }

//   }


//   test();

// })().catch(err => console.error(err.stack));

// pool.end();


