const controller = require('./controllers.js');
const router = require('express').Router();

// fallback to index.html
// router.get('*', controller.default.get);

// photos
router.get('/photos/:id', controller.photos.get);

router.put('/photos/:id', controller.photos.put);

router.delete('/photos/:id', controller.photos.delete);

// workspace
router.get('/photos/workspace/:workspaceId', controller.workspace.get);

router.post('/photos/workspace/:workspaceId', controller.workspace.post);

router.delete('/photos/workspace/:workspaceId', controller.workspace.delete);

// Might need to remove /api portion from these because of the way router is setup in index.js

module.exports = router;