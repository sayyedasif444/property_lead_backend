const accountManagement = require("../controllers/accountManagment.js");
const auth = require("../middleware/auth.js");

const router = require("express").Router();

router.post("/add-project", auth, accountManagement.addProject);
router.post("/edit-project", auth, accountManagement.editProject);
router.post("/list-project", auth, accountManagement.getAllProjects);
router.post("/delete-project", auth, accountManagement.deleteProject);

router.post("/add-payment", auth, accountManagement.addPayment);
router.post("/edit-payment", auth, accountManagement.editPayment);
router.post("/delete-payment", auth, accountManagement.deletePayment);

router.post("/add-project-expense", auth, accountManagement.addProjectExpense);
router.post(
  "/edit-project-expense",
  auth,
  accountManagement.editProjectExpense
);
router.post(
  "/delete-project-expense",
  auth,
  accountManagement.deleteProjectExpense
);

router.post(
  "/add-customer-expense",
  auth,
  accountManagement.addCustomerExpense
);
router.post(
  "/edit-customer-expense",
  auth,
  accountManagement.editCustomerExpense
);
router.post(
  "/delete-customer-expense",
  auth,
  accountManagement.deleteCustomerExpense
);

router.post(
  "/add-customer-repayment",
  auth,
  accountManagement.addCustomerRepayments
);
router.post(
  "/edit-customer-repayment",
  auth,
  accountManagement.editCustomerRepayments
);
router.post(
  "/delete-customer-repayment",
  auth,
  accountManagement.deleteCustomerRepayments
);

router.post("/add-investor", auth, accountManagement.addInvestor);
router.post("/edit-investor", auth, accountManagement.editInvestor);
router.post("/delete-investor", auth, accountManagement.deleteInvestor);

router.post("/add-commission", auth, accountManagement.addCommission);
router.post("/edit-commission", auth, accountManagement.editCommission);
router.post("/delete-commission", auth, accountManagement.deleteCommission);

router.post("/add-customer", auth, accountManagement.addCustomer);
router.post("/edit-customer", auth, accountManagement.editCustomer);
router.post("/delete-customer", auth, accountManagement.deleteCustomer);
router.post("/list-customer", auth, accountManagement.getAllCustomer);
router.post(
  "/edit-customer-status",
  auth,
  accountManagement.editCustomerStatus
);

router.post("/add-expense", auth, accountManagement.addExpense);
router.post("/edit-expense", auth, accountManagement.editExpense);
router.post("/delete-expense", auth, accountManagement.deleteExpense);
router.post("/list-expense", auth, accountManagement.getAllExpense);
router.post(
  "/add-expense-category",
  auth,
  accountManagement.addExpenseCategory
);
router.post(
  "/list-expense-category",
  auth,
  accountManagement.getAllExpenseCategory
);
router.post(
  "/delete-expense-category",
  auth,
  accountManagement.deleteExpenseCategory
);
router.post(
  "/edit-expense-category",
  auth,
  accountManagement.editExpenseCategory
);

router.post("/add-transaction", auth, accountManagement.addTransaction);
router.post("/delete-transaction", auth, accountManagement.deleteTransaction);
router.post("/edit-transaction", auth, accountManagement.editTransaction);
router.post("/list-transaction", auth, accountManagement.getAllTransaction);

module.exports = router;
