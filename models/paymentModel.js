module.exports = (sequelize, DataTypes) => {
  const paymentDetail = sequelize.define('paymentDetail', {
    payment_type: {
      type: DataTypes.STRING,
    },
    date_of_payment: {
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
    customer_id: {
      type: DataTypes.INTEGER,
    },
    investor_id: {
      type: DataTypes.INTEGER,
    },
    commission_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });
  return paymentDetail;
};
