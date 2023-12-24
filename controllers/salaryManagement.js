const db = require("../models");
const { Op } = require("sequelize");

const Salary = db.salarys;
const SalaryAddon = db.salaryAddons;
const User = db.users;

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
  let user = await User.findAll({
    include: [
      {
        model: Salary,
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

  res.status(200).json({
    statuscode: 200,
    message: "Salary listed Successfully!",
    data: user.filter((ele) => ele.salaries.length > 0),
    addons: listAddons,
    advance: listAdvance,
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

module.exports = {
  addSalary,
  listSalary,
  addSalaryAddons,
};
