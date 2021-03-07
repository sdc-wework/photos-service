const request = require('request');

describe('api', () => {

  const expectedShape = {
    _id: '',
    __v: 0,
    id: 0,
    workspaceId: 0,
    description: '',
    url: '',
  };

  it('should respond with a single photo when requested by id', async () => {
    const options = {
      'method': 'GET',
      'uri': 'http://localhost:6001/api/photos/1',
    };

    request(options, (error, res, body) => {
      if (error) return error;
      const data = JSON.parse(res.body);
      for (let key in data) {
        expect(typeof data[key]).toEqual(typeof expectedShape[key]);
      }
    });
  });

  it('should respond with multiple photos when requested by workspace id', async () => {
    const options = {
      'method': 'GET',
      'uri': 'http://localhost:6001/api/photos/workspace/1',
    };

    request(options, (error, res, body) => {
      if (error) return error;
      const data = JSON.parse(res.body);
      expect(data.length).toBeGreaterThan(1);
      const first = data[0];
      for (let key in first) {
        expect(typeof first[key]).toEqual(typeof expectedShape[key]);
      }
    });
  });

  it('should respond with all photo', async () => {
    const options = {
      'method': 'GET',
      'uri': 'http://localhost:6001/api/photos',
    };

    request(options, (error, res, body) => {
      if (error) return error;
      const data = JSON.parse(res.body);
      expect(data.length).toBeGreaterThan(1);
      const first = data[0];
      for (let key in first) {
        expect(typeof first[key]).toEqual(typeof expectedShape[key]);
      }
    });
  });

  it('should return a 500 error when requesting a record that does not exist', async () => {
    const options = {
      'method': 'GET',
      'uri': 'http://localhost:6001/api/photos/undefined',
    };

    request(options, (error, res, body) => {
      expect(res.statusCode).toEqual(500);
    });
  });


  // CUD

  it('should respond with status 201 after sending a POST request with valid syntax', async () => {

    const options = {
      method: 'POST',
      uri: 'http://localhost:6001/api/photos/workspace/1000',
      json: true,
      body: {
        url: "http://placekitten.com/600/600",
        description: "I'M HUNGRY!"
      }
    };

    request(options, (err, res, body) => {
      expect(res.statusCode).toEqual(201);
    });
  });

  it('should respond with status 200 after a PUT request with valid syntax', async () => {

    request.get('http://localhost:6001/api/photos/workspace/1000', (err, res, body) => {

      const data = JSON.parse(res.body);
      const firstItem = data[0];

      const options = {
        method: 'PUT',
        uri: `http://localhost:6001/api/photos/${firstItem.id}`,
        json: true,
        body: {
          url: "https://placeimg.com/640/480/any",
          description: "I'M SUPER HUNGRY!"
        }
      };

      request(options, (err, res, body) => {
        expect(res.statusCode).toEqual(200);
      });

    });




  });

});
