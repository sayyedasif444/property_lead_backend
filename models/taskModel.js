module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    tasklist: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    assigned_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    deadline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
    },
  });
  return task;
};
