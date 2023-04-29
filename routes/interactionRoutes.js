const interactionController = require('../controllers/interactionController.js');
const auth = require('../middleware/auth.js');

const router = require('express').Router();

router.post('/add-interaction', auth, interactionController.addInteraction);
router.post('/edit-interaction', auth, interactionController.editInteraction);
router.post(
  '/list-lead-interaction',
  auth,
  interactionController.getLeadInteraction
);

module.exports = router;
