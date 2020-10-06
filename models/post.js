module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        // Giving the Author model a name of type STRING
        day_quality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gratitude: DataTypes.STRING,

    });

    Post.associate = function (models) {
        Post.belongsTo(models.User);
        Post.belongsTo(models.Reason);
    };

    return Post;
};
