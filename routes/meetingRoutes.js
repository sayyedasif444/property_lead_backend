const meetingController = require('../controllers/meetingController.js');
const auth = require('../middleware/auth.js');

const router = require('express').Router();

router.post('/add-meeting', auth, meetingController.addMeeting);
router.post('/edit-meeting', auth, meetingController.editAction);
router.post('/list-meeting', auth, meetingController.getLeadMeeting);
router.post('/delete-meeting', auth, meetingController.deleteMeeting);

module.exports = router;
