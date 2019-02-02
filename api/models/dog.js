const dog = (sequelize, DataTypes) => {
    const Dog = sequelize.define('dog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        breed: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    Dog.associate = models => {
        Dog.hasMany(models.Image, { onDelete: 'CASCADE' });
    };

    return Dog;
};

export default dog;
