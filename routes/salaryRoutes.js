const salaryManagement = require('../controllers/salaryManagement.js');
const auth = require('../middleware/auth.js');

const router = require('express').Router();

router.post('/add-salary', auth, salaryManagement.addSalary);
router.post('/list-salary', auth, salaryManagement.listSalary);
router.post('/add-salary-addons', auth, salaryManagement.addSalaryAddons);

module.exports = router;
