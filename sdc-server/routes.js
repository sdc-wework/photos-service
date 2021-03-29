const controller = require('./controllers.js');
const router = require('express').Router();

// photos
router.get('/photos/:id', controller.photos.get);

router.put('/photos/:id', controller.photos.put);

router.delete('/photos/:id', controller.photos.delete);

// workspace
router.get('/photos/workspace/:workspaceId', controller.workspace.get);

router.post('/photos/workspace/:workspaceId', controller.workspace.post);

router.delete('/photos/workspace/:workspaceId', controller.workspace.delete);


module.exports = router;