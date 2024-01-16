const db = require("../models");

const Project = db.projects;
const Payment = db.payments;
const ProjectExpense = db.projectExpensess;
const CustomerExpense = db.customerExpenses;
const CustomerRepayment = db.customerRepayments;
const Investor = db.investors;
const User = db.users;
const Commission = db.commissions;
const Customer = db.customers;
const Expense = db.expenses;
const ExpenseCategory = db.expenseCategorys;
const Transaction = db.transactions;

const addProject = async (req, res) => {
  try {
    let info = {
      land_owner: req.body.land_owner,
      plot_location: req.body.plot_location,
      thana_no: req.body.thana_no,
      address: req.body.address,
      plot_area: req.body.plot_area,
      plot_no: req.body.plot_no,
      mobile_no: req.body.mobile_no,
      plot_type: req.body.plot_type,
      khata_no: req.body.khata_no,
      muavza: req.body.muavza,
      plot_measurement: req.body.plot_measurement,
      rate: req.body.rate,
      total_amount: req.body.total_amount,
      duration: req.body.duration,
      date_of_agreement: req.body.date_of_agreement,
      date_of_end_agreement: req.body.date_of_end_agreement,
      user_id: req.userId,
      broker: req.body.broker,
    };
    if (
      info.land_owner === null ||
      info.plot_location === null ||
      info.thana_no === null ||
      info.address === null ||
      info.mobile_no === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const project = await Project.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Project Added Successfully!",
        data: project.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editProject = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      land_owner: req.body.land_owner,
      plot_location: req.body.plot_location,
      thana_no: req.body.thana_no,
      address: req.body.address,
      plot_area: req.body.plot_area,
      plot_no: req.body.plot_no,
      mobile_no: req.body.mobile_no,
      plot_type: req.body.plot_type,
      khata_no: req.body.khata_no,
      muavza: req.body.muavza,
      plot_measurement: req.body.plot_measurement,
      rate: req.body.rate,
      total_amount: req.body.total_amount,
      duration: req.body.duration,
      date_of_agreement: req.body.date_of_agreement,
      date_of_end_agreement: req.body.date_of_end_agreement,
      broker: req.body.broker,
    };
    if (
      info.land_owner === null ||
      info.plot_location === null ||
      info.thana_no === null ||
      info.address === null ||
      info.mobile_no === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let project = await Project.findOne({ where: { id: id } });
      if (project === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await Project.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Project updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Project.destroy({ where: { id: id } });
    await Payment.destroy({ where: { project_id: id } });
    await ProjectExpense.destroy({ where: { project_id: id } });
    await Investor.destroy({ where: { project_id: id } });
    await Commission.destroy({ where: { project_id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Project Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    User.hasMany(Project, { foreignKey: "user_id" });
    Project.belongsTo(User, { foreignKey: "user_id" });

    Project.hasMany(Payment, { foreignKey: "project_id" });
    Payment.belongsTo(Project, { foreignKey: "project_id" });
    User.hasMany(Payment, { foreignKey: "user_id" });
    Payment.belongsTo(User, { foreignKey: "user_id" });

    Project.hasMany(ProjectExpense, { foreignKey: "project_id" });
    ProjectExpense.belongsTo(Project, { foreignKey: "project_id" });
    User.hasMany(ProjectExpense, { foreignKey: "user_id" });
    ProjectExpense.belongsTo(User, { foreignKey: "user_id" });

    Project.hasMany(Investor, { foreignKey: "project_id" });
    Investor.belongsTo(Project, { foreignKey: "project_id" });
    User.hasMany(Investor, { foreignKey: "user_id" });
    Investor.belongsTo(User, { foreignKey: "user_id" });

    Project.hasMany(Commission, { foreignKey: "project_id" });
    Commission.belongsTo(Project, { foreignKey: "project_id" });
    User.hasMany(Commission, { foreignKey: "user_id" });
    Commission.belongsTo(User, { foreignKey: "user_id" });

    let project = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Commission,
          include: [
            {
              model: User,
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
        {
          model: Investor,
          include: [
            {
              model: User,
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
        {
          model: Payment,
          include: [
            {
              model: User,
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
        {
          model: ProjectExpense,
          include: [
            {
              model: User,
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.status(200).json({
      statuscode: 200,
      message: "Project Listed Successfully.",
      data: project,
    });
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const addPayment = async (req, res) => {
  try {
    let info = {
      payment_type: req.body.payment_type,
      date_of_payment: req.body.date_of_payment,
      mode: req.body.mode,
      amount: req.body.amount,
      project_id: req.body.project_id,
      customer_id: req.body.customer_id,
      investor_id: req.body.investor_id,
      commission_id: req.body.commission_id,
      user_id: req.userId,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.date_of_payment === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const payment = await Payment.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Payment Added Successfully!",
        data: payment.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editPayment = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      payment_type: req.body.payment_type,
      date_of_payment: req.body.date_of_payment,
      mode: req.body.mode,
      amount: req.body.amount,
      project_id: req.body.project_id,
      customer_id: req.body.customer_id,
      investor_id: req.body.investor_id,
      commission_id: req.body.commission_id,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.date_of_payment === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let payment = await Payment.findOne({ where: { id: id } });
      if (payment === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await Payment.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Payment updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Payment.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Payment Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const addProjectExpense = async (req, res) => {
  try {
    let info = {
      particular: req.body.particular,
      date_of_expense: req.body.date_of_expense,
      mode: req.body.mode,
      amount: req.body.amount,
      project_id: req.body.project_id,
      user_id: req.userId,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.date_of_expense === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const projectexp = await ProjectExpense.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Project Expense Added Successfully!",
        data: projectexp.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editProjectExpense = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      particular: req.body.particular,
      date_of_expense: req.body.date_of_expense,
      mode: req.body.mode,
      amount: req.body.amount,
      project_id: req.body.project_id,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.date_of_expense === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let projectexp = await ProjectExpense.findOne({ where: { id: id } });
      if (projectexp === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await ProjectExpense.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Project Expense updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteProjectExpense = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await ProjectExpense.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Project Expense Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const addCustomerExpense = async (req, res) => {
  try {
    let info = {
      particular: req.body.particular,
      date_of_expense: req.body.date_of_expense,
      mode: req.body.mode,
      amount: req.body.amount,
      customer_id: req.body.customer_id,
      user_id: req.userId,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.date_of_expense === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const projectexp = await CustomerExpense.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Customer Expense Added Successfully!",
        data: projectexp.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editCustomerExpense = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      particular: req.body.particular,
      date_of_expense: req.body.date_of_expense,
      mode: req.body.mode,
      amount: req.body.amount,
      customer_id: req.body.customer_id,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.date_of_expense === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let projectexp = await CustomerExpense.findOne({ where: { id: id } });
      if (projectexp === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await CustomerExpense.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Customer Expense updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteCustomerExpense = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await CustomerExpense.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Customer Expense Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const addCustomerRepayments = async (req, res) => {
  try {
    let info = {
      particular: req.body.particular,
      date_of_expense: req.body.date_of_expense,
      mode: req.body.mode,
      amount: req.body.amount,
      customer_id: req.body.customer_id,
      user_id: req.userId,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.date_of_expense === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const projectexp = await CustomerRepayment.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Customer Expense Added Successfully!",
        data: projectexp.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editCustomerRepayments = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      particular: req.body.particular,
      date_of_expense: req.body.date_of_expense,
      mode: req.body.mode,
      amount: req.body.amount,
      customer_id: req.body.customer_id,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.date_of_expense === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let projectexp = await CustomerRepayment.findOne({ where: { id: id } });
      if (projectexp === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await CustomerRepayment.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Project Expense updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteCustomerRepayments = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await CustomerRepayment.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Customer Expense Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const addInvestor = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      address: req.body.address,
      mobile_number: req.body.mobile_number,
      mode: req.body.mode,
      amount: req.body.amount,
      project_id: req.body.project_id,
      user_id: req.userId,
    };
    if (
      info.name === null ||
      info.address === null ||
      info.mobile_number === null ||
      info.amount === null ||
      info.project_id === null ||
      info.mode === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const investor = await Investor.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Investor Added Successfully!",
        data: investor.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editInvestor = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      name: req.body.name,
      address: req.body.address,
      mobile_number: req.body.mobile_number,
      mode: req.body.mode,
      amount: req.body.amount,
      project_id: req.body.project_id,
    };
    if (
      info.name === null ||
      info.address === null ||
      info.mobile_number === null ||
      info.amount === null ||
      info.project_id === null ||
      info.mode === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let investor = await Investor.findOne({ where: { id: id } });
      if (investor === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await Investor.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Investor updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteInvestor = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Investor.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Investor Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const addCommission = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      address: req.body.address,
      mobile_number: req.body.mobile_number,
      mode: req.body.mode,
      amount: req.body.amount,
      project_id: req.body.project_id,
      customer_id: req.body.customer_id,
      user_id: req.userId,
    };
    if (
      info.name === null ||
      info.address === null ||
      info.mobile_number === null ||
      info.amount === null ||
      info.mode === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const commission = await Commission.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Commission Added Successfully!",
        data: commission.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editCommission = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      name: req.body.name,
      address: req.body.address,
      mobile_number: req.body.mobile_number,
      mode: req.body.mode,
      amount: req.body.amount,
      project_id: req.body.project_id,
      customer_id: req.body.customer_id,
    };
    if (
      info.name === null ||
      info.address === null ||
      info.mobile_number === null ||
      info.amount === null ||
      info.mode === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let commission = await Commission.findOne({ where: { id: id } });
      if (commission === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await Commission.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Commission updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteCommission = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Commission.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Commission Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const addCustomer = async (req, res) => {
  try {
    let info = {
      land_owner: req.body.land_owner,
      plot_location: req.body.plot_location,
      thana_no: req.body.thana_no,
      address: req.body.address,
      plot_area: req.body.plot_area,
      plot_no: req.body.plot_no,
      mobile_no: req.body.mobile_no,
      plot_type: req.body.plot_type,
      khata_no: req.body.khata_no,
      muavza: req.body.muavza,
      plot_measurement: req.body.plot_measurement,
      poc: req.body.poc,
      source: req.body.source,
      rate: req.body.rate,
      total_amount: req.body.total_amount,
      duration: req.body.duration,
      date_of_agreement: req.body.date_of_agreement,
      date_of_end_agreement: req.body.date_of_end_agreement,
      user_id: req.userId,
    };
    if (
      info.land_owner === null ||
      info.plot_location === null ||
      info.thana_no === null ||
      info.address === null ||
      info.mobile_no === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const customer = await Customer.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Customer Added Successfully!",
        data: customer.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editCustomer = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      land_owner: req.body.land_owner,
      plot_location: req.body.plot_location,
      thana_no: req.body.thana_no,
      address: req.body.address,
      plot_area: req.body.plot_area,
      plot_no: req.body.plot_no,
      mobile_no: req.body.mobile_no,
      plot_type: req.body.plot_type,
      khata_no: req.body.khata_no,
      muavza: req.body.muavza,
      plot_measurement: req.body.plot_measurement,
      poc: req.body.poc,
      source: req.body.source,
      rate: req.body.rate,
      total_amount: req.body.total_amount,
      duration: req.body.duration,
      date_of_agreement: req.body.date_of_agreement,
      date_of_end_agreement: req.body.date_of_end_agreement,
    };
    if (
      info.land_owner === null ||
      info.plot_location === null ||
      info.thana_no === null ||
      info.address === null ||
      info.mobile_no === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let customer = await Customer.findOne({ where: { id: id } });
      if (customer === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await Customer.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Customer updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editCustomerStatus = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      isActive: req.body.isActive,
    };
    if (info.isActive === null) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let customer = await Customer.findOne({ where: { id: id } });
      if (customer === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await Customer.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Customer updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Customer.destroy({ where: { id: id } });
    await Payment.destroy({ where: { customer_id: id } });
    await Commission.destroy({ where: { customer_id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Customer Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const getAllCustomer = async (req, res) => {
  try {
    User.hasMany(Customer, { foreignKey: "user_id" });
    Customer.belongsTo(User, { foreignKey: "user_id" });

    Customer.hasMany(Payment, { foreignKey: "customer_id" });
    Payment.belongsTo(Customer, { foreignKey: "customer_id" });
    User.hasMany(Payment, { foreignKey: "user_id" });
    Payment.belongsTo(User, { foreignKey: "user_id" });

    Customer.hasMany(Commission, { foreignKey: "customer_id" });
    Commission.belongsTo(Customer, { foreignKey: "customer_id" });
    User.hasMany(Commission, { foreignKey: "user_id" });
    Commission.belongsTo(User, { foreignKey: "user_id" });

    Customer.hasMany(CustomerExpense, { foreignKey: "customer_id" });
    CustomerExpense.belongsTo(Customer, { foreignKey: "customer_id" });
    User.hasMany(CustomerExpense, { foreignKey: "user_id" });
    CustomerExpense.belongsTo(User, { foreignKey: "user_id" });

    Customer.hasMany(CustomerRepayment, { foreignKey: "customer_id" });
    CustomerRepayment.belongsTo(Customer, { foreignKey: "customer_id" });
    User.hasMany(CustomerRepayment, { foreignKey: "user_id" });
    CustomerRepayment.belongsTo(User, { foreignKey: "user_id" });

    let customer = await Customer.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Commission,
          include: [
            {
              model: User,
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
        {
          model: Payment,
          include: [
            {
              model: User,
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
        {
          model: CustomerExpense,
          include: [
            {
              model: User,
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
        {
          model: CustomerRepayment,
          include: [
            {
              model: User,
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.status(200).json({
      statuscode: 200,
      message: "Customer Listed Successfully.",
      data: customer,
    });
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: e,
    });
  }
};

const addExpense = async (req, res) => {
  try {
    let info = {
      payment_type: req.body.payment_type,
      date_of_expense: req.body.date_of_expense,
      mode: req.body.mode,
      amount: req.body.amount,
      category_id: req.body.category_id,
      type: req.body.type,
      user_id: req.userId,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.category_id === null ||
      info.date_of_expense === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const expense = await Expense.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Expense Added Successfully!",
        data: expense.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editExpense = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      payment_type: req.body.payment_type,
      date_of_expense: req.body.date_of_expense,
      mode: req.body.mode,
      amount: req.body.amount,
      type: req.body.type,
      category_id: req.body.category_id,
    };
    if (
      info.payment_type === null ||
      info.mode === null ||
      info.amount === null ||
      info.category_id === null ||
      info.date_of_expense === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let expense = await Expense.findOne({ where: { id: id } });
      if (expense === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await Expense.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Expense updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Expense.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Expense Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const getAllExpense = async (req, res) => {
  try {
    ExpenseCategory.hasOne(Expense, { foreignKey: "category_id" });
    Expense.belongsTo(ExpenseCategory, { foreignKey: "category_id" });

    User.hasMany(Expense, { foreignKey: "user_id" });
    Expense.belongsTo(User, { foreignKey: "user_id" });

    let expense = await Expense.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: ExpenseCategory,
        },
      ],
      order: [["id", "DESC"]],
    });
    res.status(200).json({
      statuscode: 200,
      message: "Expense Listed Successfully.",
      data: expense,
    });
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const addExpenseCategory = async (req, res) => {
  try {
    let info = {
      category: req.body.category,
    };
    if (info.category === null) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const expense = await ExpenseCategory.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Expense Category Added Successfully!",
        data: expense.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteExpenseCategory = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await ExpenseCategory.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Expense Category Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editExpenseCategory = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      category: req.body.category,
    };
    if (info.category === null || id === null) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const expense = await ExpenseCategory.update(info, { where: { id: id } });
      res.status(200).json({
        statuscode: 200,
        message: "Expense Category Added Successfully!",
        data: expense.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const getAllExpenseCategory = async (req, res) => {
  try {
    let expense = await ExpenseCategory.findAll({});
    res.status(200).json({
      statuscode: 200,
      message: "Expense Category Listed Successfully.",
      data: expense,
    });
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const addTransaction = async (req, res) => {
  try {
    let info = {
      particular: req.body.particular,
      date: req.body.date,
      credit: req.body.credit,
      debit: req.body.debit,
      user_id: req.UserId,
      name: req.body.name,
      date_last: req.body.date_last,
      last_payment: req.body.last_payment,
      expected_amount: req.body.expected_amount,
    };
    if (info.particular === null || info.date === null) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const expense = await Transaction.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Transaction Added Successfully!",
        data: expense.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const editTransaction = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      particular: req.body.particular,
      date: req.body.date,
      credit: req.body.credit,
      debit: req.body.debit,
      name: req.body.name,
      date_last: req.body.date_last,
      last_payment: req.body.last_payment,
      expected_amount: req.body.expected_amount,
    };
    if (info.particular === null || info.date === null) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let expense = await Transaction.findOne({ where: { id: id } });
      if (expense === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await Transaction.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Transaction updated Successfully!",
          data: id,
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    let id = req.body.id;
    let count = await Transaction.destroy({ where: { id: id } });
    res.status(200).json({
      statuscode: 200,
      message: "Transaction Deleted Successfully.",
      data: count,
    });
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const getAllTransaction = async (req, res) => {
  try {
    User.hasMany(Transaction, { foreignKey: "user_id" });
    Transaction.belongsTo(User, { foreignKey: "user_id" });
    let expense = await Transaction.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name"],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.status(200).json({
      statuscode: 200,
      message: "Transaction Listed Successfully.",
      data: expense,
    });
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

module.exports = {
  addCustomerExpense,
  editCustomerExpense,
  deleteCustomerExpense,
  addCustomerRepayments,
  editCustomerRepayments,
  deleteCustomerRepayments,
  addProject,
  editProject,
  deleteProject,
  getAllProjects,
  addPayment,
  editPayment,
  deletePayment,
  addInvestor,
  editInvestor,
  deleteInvestor,
  addProjectExpense,
  editProjectExpense,
  deleteProjectExpense,
  addCommission,
  editCommission,
  deleteCommission,
  addCustomer,
  editCustomer,
  deleteCustomer,
  getAllCustomer,
  addExpense,
  addExpenseCategory,
  editExpense,
  deleteExpense,
  getAllExpense,
  getAllExpenseCategory,
  addTransaction,
  deleteTransaction,
  getAllTransaction,
  editTransaction,
  editCustomerStatus,
  deleteExpenseCategory,
  editExpenseCategory,
};
