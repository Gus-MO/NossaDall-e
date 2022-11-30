/*-----------------------------Definitions-----------------------------*/
// Some node utilities
const path = require('node:path')

// Defaults imports
const dotenv = require('dotenv/config');

// Models
const modelsPath = path.join(__dirname, 'Models');
const { db } = require('./index.js');

/*------------------------------Functions------------------------------*/
exports.create_request = async function creat_request(request) {
  /*
   * In: {user: a user object, guild: a guild object}
   */

  const user_id = await db.Users.findAll({
    where: {
       DISCORD_ID: request.user.DISCORD_ID
    }
  });

  if (user_id.length === 0) {
    console.log('Users not in DataBase.');
    console.log(`Creating user: ${request.user.DISCORD_ID}`);
    exports.create_user(request.user);
  } else if (user_id.length) {
    console.log('More then one entry');
  }
  const guild_id = await db.Guilds.findAll({
    where: {
      DISCORD_ID: request.guild.DISCORD_ID
    }
  });
  if (guild_id.length === 0) {
    console.log('Guilds not in DataBase.');
    console.log(`Creating guild: ${request.guild.DISCORD_ID}`);
    exports.create_guild(request.guild);
  } else if (guild_id.length) {
    console.log('More then one entry');
  }

  try {
    const newRequest = await db.Requests.create({
      USER_ID: request.user.DISCORD_ID,
      GUILD_ID: request.guild.DISCORD_ID
    });
    return newRequest;
  } catch(error) {
    console.error('Failed to create request due:', error);
  }
}

exports.create_user = async function creat_user(user) {
  /*
   * In: {DISCORD_ID: '546421', USER_NAME: 'exemplo'}
   */

  try {
    const newUser = db.Users.create(user)
    return newUser;
  } catch(error) {
    console.error('Failed to create user due:', error);
  }
}

exports.create_guild = async function creat_guild(guild) {
  /*
   * In: {DISCORD_ID: '546421', GUILD_NAME: 'exemplo'}
   */

  try {
    const newGuild = db.Guilds.create(guild)
    return newGuild;
  } catch(error) {
    console.error('Failed to create guild due:', error);
  }
}

/*-------------------------Database Management-------------------------*/
