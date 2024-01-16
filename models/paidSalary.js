module.exports = (sequelize, DataTypes) => {
  const action = sequelize.define("paidSalary", {
    user_id: {
      type: DataTypes.INTEGER,
    },
    salary_id: {
      type: DataTypes.INTEGER,
    },
    totalPaid: {
      type: DataTypes.STRING(1000),
    },
    advance: {
      type: DataTypes.STRING(1000),
    },
    incentive: {
      type: DataTypes.STRING(1000),
    },
    commission: {
      type: DataTypes.STRING(1000),
    },
    deduction: {
      type: DataTypes.STRING(1000),
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
    },
    paid_date: {
      type: DataTypes.DATEONLY,
    },
    paid_for_date: {
      type: DataTypes.DATEONLY,
    },
  });
  return action;
};
