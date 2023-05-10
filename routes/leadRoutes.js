const leadController = require('../controllers/leadController.js');
const auth = require('../middleware/auth.js');

const router = require('express').Router();

router.post('/add-lead', auth, leadController.addLeads);
router.post('/edit-lead', auth, leadController.updateLeads);
router.post('/list-lead', auth, leadController.getAllLeads);
router.post('/list-lead-by-id', auth, leadController.getOneLead);
router.post('/delete-lead', auth, leadController.deleteLead);
router.post('/update-lead-status', auth, leadController.updateLeadStatus);

module.exports = router;
