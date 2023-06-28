module.exports = (sequelize, DataTypes) => {
  const projectExpenses = sequelize.define('projectExpenses', {
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
    project_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });
  return projectExpenses;
};
