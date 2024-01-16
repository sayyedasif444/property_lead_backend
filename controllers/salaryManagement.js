const db = require("../models");
const { Op } = require("sequelize");

const Salary = db.salarys;
const SalaryAddon = db.salaryAddons;
const User = db.users;
const PaidSalary = db.paidSalary;

const addSalary = async (req, res) => {
  try {
    let info = {
      salary: req.body.salary,
      start_date: req.body.start_date,
      user_id: req.body.user_id,
      isActive: true,
    };
    if (
      info.salary === null ||
      info.start_date === null ||
      info.user_id === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      await Salary.update(
        { isActive: false },
        { where: { user_id: info.user_id } }
      );
      const salary = await Salary.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Salary Added Successfully!",
        data: salary.id,
      });
    }
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const listSalary = async (req, res) => {
  User.hasMany(Salary, { foreignKey: "user_id" });
  Salary.belongsTo(User, { foreignKey: "user_id" });

  Salary.hasMany(PaidSalary, { foreignKey: "salary_id" });
  PaidSalary.belongsTo(Salary, { foreignKey: "salary_id" });
  let user = await User.findAll({
    include: [
      {
        model: Salary,
        include: [{ model: PaidSalary }],
      },
    ],
    attributes: ["id", "first_name", "last_name"],
  });

  let listAddons = await SalaryAddon.findAll({
    where: {
      type: {
        [Op.in]: ["Incentive", "Commission"],
      },
    },
  });
  let listAdvance = await SalaryAddon.findAll({
    where: {
      type: {
        [Op.in]: ["Advance"],
      },
    },
  });
  let listDeduction = await SalaryAddon.findAll({
    where: {
      type: {
        [Op.in]: ["Deduction"],
      },
    },
  });

  res.status(200).json({
    statuscode: 200,
    message: "Salary listed Successfully!",
    data: user.filter((ele) => ele.salaries.length > 0),
    addons: listAddons,
    advance: listAdvance,
    deduction: listDeduction,
  });
};

const addSalaryAddons = async (req, res) => {
  try {
    let info = {
      effective_date: req.body.effective_date,
      type: req.body.type,
      amount: req.body.amount,
      count: req.body.count,
      user_id: req.body.user_id,
    };
    if (
      info.effective_date === null ||
      info.type === null ||
      info.amount === null ||
      info.count === null ||
      info.user_id === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const salaryAddonsList = await SalaryAddon.findAll({
        where: {
          user_id: info.user_id,
          type: info.type,
          effective_date: info.effective_date,
        },
      });
      let salaryAddon;
      if (salaryAddonsList.length > 0) {
        salaryAddon = await SalaryAddon.update(info, {
          where: { id: salaryAddonsList[0].id },
        });
      } else {
        salaryAddon = await SalaryAddon.create(info);
      }
      res.status(200).json({
        statuscode: 200,
        message: "Salary Updated Successfully!",
        data: salaryAddon.id,
        news: salaryAddonsList,
      });
    }
  } catch (e) {
    console.log("Error", e);
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

const paySalary = async (req, res) => {
  try {
    let info = {
      totalPaid: req.body.totalPaid,
      salary_id: req.body.salary_id,
      user_id: req.body.user_id,
      advance: req.body.advance,
      incentive: req.body.incentive,
      commission: req.body.commission,
      deduction: req.body.deduction,
      isPaid: req.body.isPaid,
      paid_date: req.body.paid_date,
      paid_for_date: req.body.paid_for_date,
    };
    if (
      info.totalPaid === null ||
      info.salary_id === null ||
      info.advance === null ||
      info.incentive === null ||
      info.commission === null ||
      info.deduction === null ||
      info.isPaid === null ||
      info.paid_date === null ||
      info.paid_for_date === null ||
      info.user_id === null
    ) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      const salary = await PaidSalary.create(info);
      res.status(200).json({
        statuscode: 200,
        message: "Salary Paid Successfully!",
        data: salary.id,
      });
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
      error: e,
    });
  }
};

const listSalaryPaid = async (req, res) => {
  PaidSalary.belongsTo(User, { foreignKey: "user_id" });
  User.hasMany(PaidSalary, { foreignKey: "user_id" });

  PaidSalary.belongsTo(Salary, { foreignKey: "salary_id" });
  Salary.hasMany(PaidSalary, { foreignKey: "salary_id" });
  let user = await PaidSalary.findAll(
    { where: { user_id: req.body.user_id } },
    {
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name"],
        },
        { model: Salary },
      ],
    }
  );

  res.status(200).json({
    statuscode: 200,
    message: "Salary listed Successfully!",
    data: user,
  });
};

const updateSalaryUser = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      isValid: req.body.isValid,
    };
    if (info.isValid === null) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let project = await Salary.findOne({ where: { id: id } });
      if (project === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await Salary.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Salary updated Successfully!",
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
      error: e,
    });
  }
};

const editSalaryUser = async (req, res) => {
  try {
    let id = req.body.id;
    let info = {
      totalPaid: req.body.totalPaid,
      paid_date: req.body.paid_date,
    };
    if (info.isValid === null) {
      res.status(200).json({
        statuscode: 400,
        message: "Invalid request!",
      });
    } else {
      let project = await PaidSalary.findOne({ where: { id: id } });
      if (project === null) {
        res.status(200).json({
          statuscode: 400,
          message: "Invalid request!",
        });
      } else {
        await PaidSalary.update(info, { where: { id: id } });
        res.status(200).json({
          statuscode: 200,
          message: "Salary updated Successfully!",
        });
      }
    }
  } catch (e) {
    res.status(200).json({
      statuscode: 500,
      message: "Something went wrong, please try again.",
      error: e,
    });
  }
};

module.exports = {
  addSalary,
  listSalary,
  addSalaryAddons,
  paySalary,
  listSalaryPaid,
  updateSalaryUser,
  editSalaryUser,
};
