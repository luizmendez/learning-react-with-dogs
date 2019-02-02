const Sequelize = require('sequelize');

let models = {};

const iniModels = () => {
    if (Object.keys(models).length) {
        return models;
    }
    const sequelize = new Sequelize('reactdogs', process.env.DB_USER, process.env.DB_PASS, {
        dialect: 'mariadb',
        host: process.env.DB_HOST,
        logging: false
    });

    models = {
        Dog: sequelize.import('./dog'),
        Image: sequelize.import('./image')
    };

    Object.keys(models).forEach(key => {
        if ('associate' in models[key]) {
            models[key].associate(models);
        }
    });

    models.sequelize = sequelize;

    return models;
};

module.exports = iniModels();
