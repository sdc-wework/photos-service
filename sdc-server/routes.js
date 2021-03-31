const controller = require('./controllers.js');
const router = require('express').Router();

// workspace
router.get('/photos/workspace/:workspaceId', controller.workspace.get);

router.post('/photos/workspace/:workspaceId', controller.workspace.post);

router.delete('/photos/workspace/:workspaceId', controller.workspace.delete);

// photos
router.get('/photos/:workspaceId/:id', controller.photos.get);

router.put('/photos/:workspaceId/:id', controller.photos.put);

router.delete('/photos/:workspaceId/:id', controller.photos.delete);

// all others
router.all('*', controller.error);


module.exports = router;