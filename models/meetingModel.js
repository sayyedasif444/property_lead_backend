module.exports = (sequelize, DataTypes) => {
  const meeting = sequelize.define('meetings', {
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    meeting_point: {
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
  });
  return meeting;
};
