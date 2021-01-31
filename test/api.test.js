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

});
