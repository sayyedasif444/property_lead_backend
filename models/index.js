const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('connected');
  })
  .catch((e) => {
    console.log('error', e);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.propertys = require('./propertyModel.js')(sequelize, DataTypes);
db.property_medias = require('./propertyImageModel.js')(sequelize, DataTypes);
db.users = require('./usersModel.js')(sequelize, DataTypes);
db.sources = require('./sourceModel.js')(sequelize, DataTypes);
db.leads = require('./leadModel.js')(sequelize, DataTypes);
db.interactions = require('./interactionModel.js')(sequelize, DataTypes);
db.actions = require('./actionModel.js')(sequelize, DataTypes);

db.sequelize
  .sync({ force: false })
  .then(() => console.log('Sync Done!'))
  .catch((e) => console.log('DB creation failed!', e));

module.exports = db;
