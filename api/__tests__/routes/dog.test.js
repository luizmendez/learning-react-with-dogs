import 'dotenv/config';
import request from 'supertest';
import app from '../../app';
import models from '../../models/';
import { getDogsFromAPI } from '../../helpers/';

describe('/dogs path should', () => {
    it('return status 200 and list of dogs', async () => {
        await models.sequelize.sync({ force: true });
        await getDogsFromAPI();
        return request(app)
            .get('/dogs')
            .then(r => {
                expect(r.statusCode).toBe(200);
                expect(r.body).toContainEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        breed: expect.any(String),
                        images: expect.any(Array)
                    })
                );
            });
    });
});
