module.exports = (sequelize, DataTypes) => {
  const property_media = sequelize.define('property_media', {
    media_link: {
      type: DataTypes.STRING,
    },
    media_type: {
      type: DataTypes.STRING,
    },
    property_id: {
      type: DataTypes.INTEGER,
    },
  });
  return property_media;
};
