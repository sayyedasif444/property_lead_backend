module.exports = (sequelize, DataTypes) => {
  const interaction = sequelize.define('interaction', {
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
    user_id: {
      type: DataTypes.INTEGER,
    },
    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return interaction;
};
