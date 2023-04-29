const actionController = require('../controllers/actionController.js');
const auth = require('../middleware/auth.js');

const router = require('express').Router();

router.post('/add-action', auth, actionController.addAction);
router.post('/edit-action', auth, actionController.editAction);
router.post('/list-lead-action', auth, actionController.getLeadAction);
router.post('/list-user-action', auth, actionController.getUserAction);
router.post('/delete-action', auth, actionController.deleteAction);
router.post('/update-action-status', auth, actionController.updateActionStatus);

module.exports = router;
