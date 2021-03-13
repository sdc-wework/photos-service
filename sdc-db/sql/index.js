const { Pool } = require('pg');

const pool = new Pool({
  user: 'sdc',
  host: 'localhost',
  database: 'sdcjohnsonphotos',
  password: '',
  port: 5432
});

(async () => {

  const client = await pool.connect();

  const query = `
    CREATE TABLE photos (
      id integer,
      workspaceId integer,
      description varchar,
      url varchar
    );
  `;

  const insertRecord = `
    INSERT INTO photos (id, workspaceid, description, url)
    VALUES (3, 2, 'This is the description', 'http://www.mephotourl2.com/')
  `;

  const deleteRecord = `
    DELETE FROM photos WHERE id = 1
  `;


  const getRecord = `
    SELECT url FROM photos WHERE workspaceid = 2
  `;

  const runInsertOrRemoveQuery = async (query) => {
    try {
      const res = await client.query(query);
      console.log('Query ran successfully');
    } catch (err) {
      console.error(`Insert or remove query failed: ${err.stack}`);
      done();
    } finally {
      client.release();
    };
  };

  const runRetrieveQuery = async (query) => {
    try {
      const { rows } = await client.query(query);
      return rows;
    } catch (err) {
      console.error(`Retrieve query failed: ${err.stack}`);
      done();
    } finally {
      client.release();
    };
  };

  const test = async () => {
    // await runInsertOrRemoveQuery(insertRecord);
    let response = await runRetrieveQuery(getRecord);
    console.log(response);
  }


  test();

})().catch(err => console.error(err.stack));

pool.end();


