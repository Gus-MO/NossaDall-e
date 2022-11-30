module.exports = function (sequelize, DataTypes, Model) {
  class Guilds extends Model {
    otherPublicField;
  }

  Guilds.init({
    GUILD_ID:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DISCORD_ID:{
      type: DataTypes.INTEGER,
    },
    GUILD_NAME: {
      type: DataTypes.STRING,
    },
  }, {
    // Other model options
    sequelize, // We need to pass the connection instance
    modelName: 'Guilds' // We need to choose the model name
  });

  return Guilds;
};
