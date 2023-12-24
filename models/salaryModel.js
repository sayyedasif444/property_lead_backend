module.exports = (sequelize, DataTypes) => {
  const action = sequelize.define('salary', {
    user_id: {
      type: DataTypes.INTEGER,
    },
    salary: {
      type: DataTypes.STRING(1000),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    start_date: {
      type: DataTypes.DATEONLY,
    },
    end_date: {
      type: DataTypes.DATEONLY,
    },
  });
  return action;
};
