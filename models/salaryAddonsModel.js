module.exports = (sequelize, DataTypes) => {
  const action = sequelize.define('salaryAddon', {
    user_id: {
      type: DataTypes.INTEGER,
    },
    effective_date: {
      type: DataTypes.DATEONLY,
    },
    type: {
      type: DataTypes.STRING(1000),
    },
    amount: {
      type: DataTypes.STRING(1000),
    },
    count: {
      type: DataTypes.INTEGER,
    },
  });
  return action;
};
