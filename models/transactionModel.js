module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transactions', {
    name: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    particular: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    credit: {
      type: DataTypes.STRING,
    },
    debit: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.STRING,
    },
    date_last: {
      type: DataTypes.STRING,
    },
    last_payment: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });
  return transaction;
};
