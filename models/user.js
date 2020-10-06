const db = require(".");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    });
  
    User.associate = function(models) {
      User.hasMany(models.Post, {
        foreignKey: "user_id"
      });
      User.hasMany(models.Reason, {
        foreignKey: "user_id"
      });
    };
  
    return User;
  };
  