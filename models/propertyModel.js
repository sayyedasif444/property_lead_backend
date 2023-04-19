module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('property', {
    property_type: {
      type: DataTypes.STRING,
    },
    property_location: {
      type: DataTypes.STRING,
    },
    property_locality: {
      type: DataTypes.STRING,
    },
    property_area: {
      type: DataTypes.STRING,
    },
    property_front: {
      type: DataTypes.STRING,
    },
    property_deep: {
      type: DataTypes.STRING,
    },
    plot_face: {
      type: DataTypes.STRING,
    },
    corner_plot: {
      type: DataTypes.STRING,
    },
    no_of_open_sides: {
      type: DataTypes.STRING,
    },
    plot_boundaries: {
      type: DataTypes.STRING,
    },
    facing_road_width: {
      type: DataTypes.STRING,
    },
    plot_land_mark: {
      type: DataTypes.STRING,
    },
    near_by: {
      type: DataTypes.STRING,
    },
    expected_price: {
      type: DataTypes.STRING,
    },
    price_per_sqft: {
      type: DataTypes.STRING,
    },
    google_map_link: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Property;
};
