module.exports = (sequelize, DataTypes) => {
  const expense = sequelize.define('expenseCategory', {
    category: {
      type: DataTypes.STRING,
    },
  });
  return expense;
};
