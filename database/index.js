/*-----------------------------Definitions-----------------------------*/
// Some node utilities
const fs = require('node:fs');
const path = require('node:path')

// Sequelize
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('nossadale', process.env.USERNAME, process.env.PASSWORD, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'nossabase.sqlite'),
  logging: false,
});

// Testing connection
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};

// Importing Models

const modelsPath = path.join(__dirname, 'Models')

const modelsFiles = fs.readdirSync(modelsPath).filter(file => {
  const returnFile = file.endsWith('.js') && (file !== path.basename(__filename));
  return returnFile;
});

for (const file of modelsFiles) {
  const model = require(path.join(modelsPath, file))(sequelize, DataTypes, Model);
  db[model.name] = model;
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

exports.db = db;
