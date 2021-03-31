const request = require('request');
const { db } = require('../sdc-db/nosql/index.js');

describe('api', () => {

  const workspaceId = '20000000';

  beforeAll( async () => {
    try {
      let getRecordFromDb = await db.find({
        selector: {
          workspace_id: { $eq: '1000' }
        },
        limit: 1
      });
      let recordFromDb = getRecordFromDb.docs[0];
      let dummyRecord = {
        workspace_id: workspaceId,
        photos: recordFromDb.photos
      };
      let insertDummyRecord = await db.insert(dummyRecord);
    } catch(e) {
      console.error('unable to create dummy record: ', e);
    }
  });

  const expectedShape = {
    _id: '',
    __rev: '',
    id: '',
    workspaceId: '',
    photos: []
  };

  const expectedPhotoShape = {
    id: '',
    url: '',
    description: ''
  }

  it('should respond with a single photo when requested by id', async () => {
    const options = {
      'method': 'GET',
      'uri': `http://localhost:6001/api/photos/${workspaceId}/d6fcaec4-59d2-4b05-8eab-b08754defe33`,
    };

    request(options, (error, res, body) => {
      if (error) return error;
      const data = res.body;
      expect(typeof data).toEqual(typeof 'string');
    });
  });

  it('should respond with multiple photos when requested by workspace id', async () => {
    const options = {
      'method': 'GET',
      'uri': `http://localhost:6001/api/photos/workspace/${workspaceId}`,
    };

    request(options, (error, res, body) => {
      if (error) return error;
      const data = JSON.parse(res.body);
      expect(data.length).toBeGreaterThan(1);
      const first = data[0];
      for (let key in first) {
        expect(typeof first[key]).toEqual(typeof expectedPhotoShape[key]);
      }
    });
  });

  it('should return a 500 error when requesting a record that does not exist', async () => {
    const options = {
      'method': 'GET',
      'uri': 'http://localhost:6001/api/photos/undefined',
    };

    request(options, (error, res, body) => {
      expect(res.statusCode).toEqual(400);
    });
  });


  // CUD
  describe('POST', () => {

    it('should respond with status 201 after sending a POST request with valid syntax', () => {
      const options = {
        method: 'POST',
        uri: `http://localhost:6001/api/photos/workspace/${workspaceId}`,
        json: true,
        body: {
          "url": "http://placekitten.com/600/600",
          "description": "I'M HUNGRY!"
        }
      };
      request(options, (err, res, body) => {
        if (err) {
          return err;
        }
        expect(res.statusCode).toEqual(201);
      });
    });

    it('should respond with status 400 after sending a POST request without a photo url - invalid syntax', () => {
      const options = {
        method: 'POST',
        uri: `http://localhost:6001/api/photos/workspace/${workspaceId}`,
        json: true,
        body: {
          description: "I'M HUNGRY!"
        }
      };
      request(options, (err, res, body) => {
        if (err) {
          return err;
        }
        expect(res.statusCode).toEqual(400);
      });
    });
  });

  describe('PUT', () => {

    it('should respond with status 200 after a PUT request with valid syntax', () => {
      request.get(`http://localhost:6001/api/photos/workspace/${workspaceId}`, (err, res, body) => {
        if (err) {
          return err;
        }
        const data = JSON.parse(res.body);
        const lastItem = data[data.length - 1];
        const options = {
          method: 'PUT',
          uri: `http://localhost:6001/api/photos/${workspaceId}/${lastItem.id}`,
          json: true,
          body: {
            url: "https://placeimg.com/640/480/any",
            description: "I'M SUPER HUNGRY!"
          }
        };
        request(options, (err, res, body) => {
          if (err) {
            return err;
          }
          expect(res.statusCode).toEqual(200);
        });
      });
    });

    it('should respond with status 500 after a PUT request that does not include the required body fields', () => {
      request.get(`http://localhost:6001/api/photos/workspace/${workspaceId}`, (err, res, body) => {
        if (err) {
          return err;
        }
        const data = JSON.parse(res.body);
        const firstItem = data[0];
        const options = {
          method: 'PUT',
          uri: `http://localhost:6001/api/photos/${workspaceId}/${firstItem.id}`,
          json: true,
        };
        request(options, (err, res, body) => {
          if (err) {
            return err;
          }
          expect(res.statusCode).toEqual(500);
        });
      });
    });
  });


  // REFACTOR
  // describe('DELETE', () => {

  //   it('should respond with status 200 after a DELETE request with valid syntax', async () => {
  //     request.delete(`http://localhost:6001/api/photos/workspace/${workspaceId}`, (err, res, body) => {
  //       if (err) {
  //         return err;
  //       }
  //       expect(res.statusCode).toEqual(200);
  //     });
  //   });
  // });
});
