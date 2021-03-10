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
  describe('POST', () => {

    it('should respond with status 201 after sending a POST request with valid syntax', () => {
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
        if (err) {
          return err;
        }
        expect(res.statusCode).toEqual(201);
      });
    });

    it('should respond with status 400 after sending a POST request without a photo url - invalid syntax', () => {
      const options = {
        method: 'POST',
        uri: 'http://localhost:6001/api/photos/workspace/1000',
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
      request.get('http://localhost:6001/api/photos/workspace/1000', (err, res, body) => {
        if (err) {
          return err;
        }
        const data = JSON.parse(res.body);
        const lastItem = data[data.length - 1];
        const options = {
          method: 'PUT',
          uri: `http://localhost:6001/api/photos/${lastItem.id}`,
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

    it('should respond with status 400 after a PUT request without any new updates', () => {
      request.get('http://localhost:6001/api/photos/workspace/1000', (err, res, body) => {
        if (err) {
          return err;
        }
        const data = JSON.parse(res.body);
        const firstItem = data[0];
        const options = {
          method: 'PUT',
          uri: `http://localhost:6001/api/photos/${firstItem.id}`,
          json: true,
          body: {
            url: firstItem.url,
            description: firstItem.description
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
  });


  // REFACTOR
  describe('DELETE', () => {

    it('should respond with status 200 after a DELETE request with valid syntax', async () => {
      request.delete('http://localhost:6001/api/photos/workspace/1000', (err, res, body) => {
        if (err) {
          return err;
        }
        expect(res.statusCode).toEqual(200);
      });
    });

    it('should respond with status 404 after a DELETE request for an non-existent resource', async () => {
      request.delete('http://localhost:6001/api/photos/workspace/1000', (err, res, body) => {
        if (err) {
          return err;
        }
        expect(res.statusCode).toEqual(404);
      });
    });
  });
});
