const {
  mongoose,
  Photo,
} = require('../database/index.js');

describe('database', () => {

  afterAll(async () => {
    await Photo.deleteOne({ id: 0 });
    mongoose.disconnect();
  });

  it('should insert a doc into collection', async () => {
    const mockPhoto = {
      id: 0,
      workspaceId: 0,
      description: 'Test',
      url: '/test',
    };
    await Photo.create(mockPhoto);
    const insertedPhoto = await Photo.findOne({ id: 0 });

    const shapedData = {};
    for (let key in mockPhoto) {
      shapedData[key] = insertedPhoto[key];
    }

    expect(shapedData).toEqual(mockPhoto);
  });

});
