'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


// Importar modelos explícitamente
const User = require('./user.js')(sequelize, Sequelize.DataTypes);
const Link = require('./link.js')(sequelize, Sequelize.DataTypes);
const LinkClick = require('./linkclick.js')(sequelize, Sequelize.DataTypes);

// Asignar modelos al objeto db
db.User = User;
db.Link = Link;
db.LinkClick = LinkClick;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
