const sourceController = require('../controllers/sourceController.js');
const auth = require('../middleware/auth.js');

const router = require('express').Router();

router.post('/add-source', auth, sourceController.addSource);
router.post('/list-source', auth, sourceController.listSource);

module.exports = router;
