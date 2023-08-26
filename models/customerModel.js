module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    land_owner: {
      type: DataTypes.STRING,
    },
    plot_location: {
      type: DataTypes.STRING,
    },
    thana_no: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    plot_area: {
      type: DataTypes.STRING,
    },
    plot_no: {
      type: DataTypes.STRING,
    },
    mobile_no: {
      type: DataTypes.STRING,
    },
    plot_type: {
      type: DataTypes.STRING,
    },
    khata_no: {
      type: DataTypes.STRING,
    },
    muavza: {
      type: DataTypes.STRING,
    },
    plot_measurement: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.STRING,
    },
    total_amount: {
      type: DataTypes.STRING,
    },
    source: {
      type: DataTypes.STRING,
    },
    poc: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    date_of_agreement: {
      type: DataTypes.STRING,
    },
    date_of_end_agreement: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  });
  return customer;
};
