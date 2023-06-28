module.exports = (sequelize, DataTypes) => {
  const investor = sequelize.define('investor', {
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    mobile_number: {
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
  return investor;
};
