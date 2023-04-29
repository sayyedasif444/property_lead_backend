module.exports = (sequelize, DataTypes) => {
  const lead = sequelize.define('lead', {
    company: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
    },
    property_type: {
      type: DataTypes.STRING,
    },
    mobile_number: {
      type: DataTypes.STRING,
    },
    emailid: {
      type: DataTypes.STRING,
    },
    source_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    country: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    requirement: {
      type: DataTypes.STRING(1000),
    },
    notes: {
      type: DataTypes.STRING(1000),
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
    },
  });
  return lead;
};
