const taskController = require('../controllers/taskController.js');
const auth = require('../middleware/auth.js');

const router = require('express').Router();

router.post('/add-task', auth, taskController.addTask);
router.post('/edit-task', auth, taskController.editTask);
router.post('/update-task', auth, taskController.updateTask);
router.post('/list-task', auth, taskController.getAllTask);
router.post('/list-user-task', auth, taskController.getUserTask);
router.post('/delete-task', auth, taskController.deleteTask);

module.exports = router;
