module.exports = function (sequelize, DataTypes, Model) {
  class Users extends Model {
    otherPublicField;
  }

  Users.init({
    USER_ID:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    DISCORD_ID:{
      type: DataTypes.INTEGER,
    },
    USER_NAME: {
      type: DataTypes.STRING,
    },
  }, {
    // Other model options
    sequelize, // We need to pass the connection instance
    modelName: 'Users' // We need to choose the model name
  });

  return Users;
};
