import 'dotenv/config';
import request from 'supertest';
import app from '../../app';
import models from '../../models/';
import { readdir } from 'fs';

describe('/image path should', () => {
    it('return status 200 and save image path on db', async () => {
        await models.sequelize.sync({ force: true });
        return request(app)
            .post('/image')
            .field('dogBreed', 5)
            .field('dogName', 'Ramona')
            .attach('dogPic', './api/__tests__/dummy/aggretsuko.jpg')
            .then(async response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty('id');
                const haveFiles = await new Promise((resolve, reject) => {
                    readdir('./uploads', (err, files) => {
                        if (err) return reject(err);
                        resolve(files.length);
                    });
                });
                expect(haveFiles).toBeTruthy();
                const image = await models.Image.findOne({ where: { id: response.body.id } });
                expect(image).toBeTruthy();
            });
    });
});
