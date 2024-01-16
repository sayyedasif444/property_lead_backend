const salaryManagement = require("../controllers/salaryManagement.js");
const auth = require("../middleware/auth.js");

const router = require("express").Router();

router.post("/add-salary", auth, salaryManagement.addSalary);
router.post("/list-salary", auth, salaryManagement.listSalary);
router.post("/add-salary-addons", auth, salaryManagement.addSalaryAddons);
router.post("/pay-salary", auth, salaryManagement.paySalary);
router.post("/list-user-salary", auth, salaryManagement.listSalaryPaid);
router.post("/delete-salary-user", auth, salaryManagement.updateSalaryUser);
router.post("/edit-salary-user", auth, salaryManagement.editSalaryUser);

module.exports = router;
