/*-----------------------------Definitions-----------------------------*/
// Some node utilities
const path = require('node:path')

// Defaults imports
const dotenv = require('dotenv/config');

// Models
const modelsPath = path.join(__dirname, 'Models');
const { db } = require('./index.js');

// Querys
const { QueryTypes } = require('sequelize');

/*------------------------------Functions------------------------------*/
exports.create_request = async function creat_request(request) {
  /*
   * In: {user: a user object, guild: a guild object}
   */

  var temp_user;
  var temp_guild;

  // Checking user
  temp_user = await db.Users.findAll({
    where: {
       DISCORD_ID: request.user.DISCORD_ID
    }
  });
  // Creating user
  if (temp_user.length === 0) {
    console.log('Users not in DataBase.');
    console.log(`Creating user: ${request.user.DISCORD_ID}`);
    temp_user = await exports.create_user(request.user);
  } else if (temp_user.length) {
    console.log('More then one entry');
  }

  // Checking guild
  temp_guild = await db.Guilds.findAll({
    where: {
      DISCORD_ID: request.guild.DISCORD_ID
    }
  });
  // Creating guild
  if (temp_guild.length === 0) {
    console.log('Guilds not in DataBase.');
    console.log(`Creating guild: ${request.guild.DISCORD_ID}`);
    temp_guild = await exports.create_guild(request.guild);
  } else if (temp_guild.length) {
    console.log('More then one entry');
  }

  const check = await exports.check_limit(temp_user[0], temp_guild[0]);
    if (check.response) {
      // Creating Request
      try {
        const newRequest = await db.Requests.create({
          USER_ID: temp_user.USER_ID,
          GUILD_ID: temp_guild.GUILD_ID,
          //USER_ID: request.user.DISCORD_ID,
          //GUILD_ID: request.guild.DISCORD_ID
        });
      return {response: true, request: newRequest, text: `Request ${newRequest.REQUEST_ID}: created!`};
    } catch(error) {
      console.error('Failed to create request due:', error);
    }
  } else {
    return check;
  }
}

exports.create_user = async function creat_user(user) {
  /*
   * In: {DISCORD_ID: '546421', USER_NAME: 'exemplo'}
   */

  try {
    const newUser = await db.Users.create(user);
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
    const newGuild = await db.Guilds.create(guild);
    return newGuild;
  } catch(error) {
    console.error('Failed to create guild due:', error);
  }
}

/*-------------------------Database Management-------------------------*/
exports.check_limit = async function check_limit(user, guild) {
  console.log('Checking request limit');

  const users_amount = await db.sequelize.query(
    `SELECT count(Requests.REQUEST_ID)
     FROM Requests
     LEFT JOIN Users ON Users.USER_ID = Requests.USER_ID
     WHERE Users.DISCORD_ID = ?
    `,
    {
      replacements: [user.DISCORD_ID],
      type: QueryTypes.SELECT
    });

  const guild_amount = await db.sequelize.query(
    `SELECT count(Requests.REQUEST_ID)
     FROM Requests
     LEFT JOIN Guilds ON Guilds.GUILD_ID = Requests.GUILD_ID
     WHERE Guilds.DISCORD_ID = ?
    `,
    {
      replacements: [user.DISCORD_ID],
      type: QueryTypes.SELECT
    });

  if (users_amount >= process.env.USER_REQUEST_LIMIT) {
    console.log('User request limit');
    return {response: false, text: `${user.USER_NAME} already got to its requests limit.`};
  } else if (guild_amount >= process.env.GUILD_REQUEST_LIMIT) {
    console.log('Guild request limit');
    return {response: false, text: `This guild ${guild.GUILD_NAME} already got to its requests limit.`};
  } else {
    console.log('Limit ok.');
    return {
      response: true,
      text :
	`Guild uses: ${guild_amount}/${process.env.GUILD_REQUEST_LIMIT}\tUser uses: ${users_amount}/${process.env.USER_REQUEST_LIMIT}`
    };
  }
}
