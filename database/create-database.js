/*-----------------------------Definitions-----------------------------*/
// Some node utilities
const path = require('node:path')

// Defaults imports
const dotenv = require('dotenv/config');

// Models
const modelsPath = path.join(__dirname, 'Models');
const { db } = require('./index.js');

/*-------------------------Database Management-------------------------*/

/*
class User extends Model {
  otherPublicField;
}

class Guild extends Model {
  otherPublicField;
}

const Request = sequelize.define('requests',{
  REQUEST_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    set(value) {
      if ( value === null ) {
        const date = new Date()
        this.setDataValue('CREATED_AT', date.toISOString());
      } else {
        throw new TypeError("Dates must be inserted as null");
      }
    }
  },
  USER_ID: {
    type: DataTypes.INTEGER,
  },
  GUILD_ID: {
    type: DataTypes.INTEGER,
  }
});
*/

/*
User.init({
  USER_ID:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  DISCORD_ID:{
    type: DataTypes.INTEGER,
    unique: true,
  },
  USER_NAME: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options
  sequelize, // We need to pass the connection instance
  modelName: 'users' // We need to choose the model name
});
*/

/*
Guild.init({
  GUILD_ID:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  DISCORD_ID:{
    type: DataTypes.INTEGER,
    unique: true,
  },
  GUILD_NAME: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options
  sequelize, // We need to pass the connection instance
  modelName: 'guilds' // We need to choose the model name
});
*/

/*--------------------------Database Creation--------------------------*/

(async () => {
  await db.sequelize.sync({ force: true });
})();
