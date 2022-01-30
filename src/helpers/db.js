'use strict';
const Sequelize = require('sequelize');
const database = {
  username: 'tawatant_dvd',
  password: '48346275',
  database: 'tawatant_dvd',
  host: '108.167.189.38',
  dialect: 'mysql',
};
const sequelize = new Sequelize(
  // process.env.DATABASE_NAME,
  // process.env.DATABASE_USERNAME,
  // process.env.DATABASE_PASSWORD,
  // {
  //   host: process.env.DATABASE_HOST,
  //   port: process.env.DATABASE_PORT,
  //   dialect: 'mysql',
  //   pool: {
  //     max: 15,
  //     min: 5,
  //     idle: 20000,
  //     evict: 15000,
  //     acquire: 30000,
  //   },
  // }
  database.database,
  database.username,
  database.password,
  {
    host: database.host,
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000,
    },
  }
);

try {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection to database has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to database:', err);
    });
} catch (err) {
  console.log(err);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/user.model')(sequelize, Sequelize);
db.Address = require('../models/address.model')(sequelize, Sequelize);
db.Qr = require('../models/qr.model')(sequelize, Sequelize);
db.Package = require('../models/package.model')(sequelize, Sequelize);

db.RefreshToken = require('../models/refresh-token.model')(
  sequelize,
  Sequelize
);
// db.aboutus = require("./../modules/aboutus/models/about.model")(
//   sequelize,
//   Sequelize
// );
// db.award = require("./../modules/award/models/award.model")(
//   sequelize,
//   Sequelize
// );

// Relations
// db.Address.belongsTo(db.User);
// db.User.hasOne(db.Address);

// db.sequelize.sync({force:false,match:/qrgen$/})
// .then(()=>{
//     console.log("resync done!")
// })

module.exports = db;
