module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    emailid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    user_type: {
      type: DataTypes.STRING,
    },
    isSuper: {
      type: DataTypes.BOOLEAN,
    },
  });
  return user;
};
