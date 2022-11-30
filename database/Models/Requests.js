module.exports = function (sequelize, DataTypes, Model) {
  class Requests extends Model {};

  Requests.init({
    REQUEST_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    USER_ID: {
      type: DataTypes.INTEGER,
    },
    GUILD_ID: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Requests' 
  });

  return Requests;
};
