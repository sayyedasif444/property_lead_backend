module.exports = (sequelize, DataTypes) => {
  const source = sequelize.define('source', {
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return source;
};
