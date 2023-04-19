const userController = require('../controllers/userController.js');
const auth = require('../middleware/auth.js');

const router = require('express').Router();

router.post('/login', userController.loginApi);
router.post('/add-user', auth, userController.addUser);
router.post('/edit-user', auth, userController.editUser);
router.post('/list-user', userController.getAllUsers);
router.post('/list-user-by-id', auth, userController.getOneUser);
router.post('/update-password', auth, userController.updatePassword);
router.post('/email-password', userController.emailPassword);
router.post('/update-password-admin', auth, userController.updatePasswordAdmin);
router.post('/delete-user', auth, userController.deleteUser);

module.exports = router;
