module.exports = (sequelize, DataTypes) => {
  const expense = sequelize.define('expense', {
    payment_type: {
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
    category_id: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });
  return expense;
};
