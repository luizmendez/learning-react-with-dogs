import 'dotenv/config';
import models from './models';
import app from './app';
import { getDogsFromAPI } from './helpers';

const startServer = async () => {
    try {
        await models.sequelize.sync({ force: true });
        await getDogsFromAPI();
        app.listen(3000, () => console.log('Listening on port 3000!')); //eslint-disable-line
    } catch (e) {
        console.error(e); //eslint-disable-line
    }
};

export default startServer;
