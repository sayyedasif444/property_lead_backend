module.exports = (sequelize, DataTypes) => {
  const projectExpenses = sequelize.define('customerExpenses', {
    particular: {
      type: DataTypes.STRING,
    },
    date_of_expense: {
      type: DataTypes.STRING,
    },
    mode: {
      type: DataTypes.STRING(1000),
    },
    amount: {
      type: DataTypes.STRING,
    },
    customer_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });
  return projectExpenses;
};
