module.exports = (sequelize, DataTypes) => {
  const action = sequelize.define('action', {
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    i_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    i_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    assigned_id: {
      type: DataTypes.INTEGER,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
    },
  });
  return action;
};
