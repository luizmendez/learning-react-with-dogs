const image = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        path: {
            type: DataTypes.STRING
        }
    });

    Image.associate = models => {
        Image.belongsTo(models.Dog);
    };

    return Image;
};

export default image;
