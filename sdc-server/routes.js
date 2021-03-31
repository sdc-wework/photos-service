// require controller
var router = require('express').Router();

// fallback to index.html
router.get('*', controller.default.get);

// photos
router.get('/api/photos', controller.photos.get);

router.put('/api/photos', controller.photos.put);

router.delete('/api/photos', controller.photos.delete);

// workspace
router.get('/api/photos/workspace', controller.workspace.get);

router.post('/api/photos/workspace', controller.workspace.post);

router.delete('/api/photos/workspace', controller.workspace.delete);

// all others
router.all('*', controller.error);


module.exports = router;