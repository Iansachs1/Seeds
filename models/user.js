const db = require(".");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    });
  
    User.associate = function(models) {
      User.hasMany(models.Post);
    };
  
    return User;
  };
  