module.exports = function (sequelize, DataTypes) {
    var Reason = sequelize.define("Reason", {
        // Giving the Author model a name of type STRING
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [3]
            }
        }
    });

    Reason.associate = function(models) {
        Reason.belongsTo(models.User, {
            foreignKey: "user_id"
          })
        // Reason.hasMany(models.Post, {
        //     foreignKey: "user_id"
        //   });
    };

    return Reason;
};
