// require db
const path = require('path');

module.exports = {

  default: {
    get: (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    }
  },

  photos: {
    get: (req, res) => {
      // do DB stuff
        // respond to request
    },
    put: (req, res) => {
      // do DB stuff
        // respond to request
    },
    delete: (req, res) => {
      // do DB stuff
        // respond to request
    }
  },

  workspace: {
    get: (req, res) => {
      // do DB stuff
        // respond to request
    },
    post: (req, res) => {
      // do DB stuff
        // respond to request
    },
    delete: (req, res) => {
      // do DB stuff
        // respond to request
    }
  }
}