import 'dotenv/config';
import * as helpers from '../../helpers/';
import models from '../../models/';

const urlDogs = 'https://dog.ceo/api/breeds/list/all';
const respDogs = {
    status: 'success',
    message: {
        affenpinscher: [],
        african: [],
        airedale: [],
        akita: []
    }
};

const urlImages = 'https://dog.ceo/api/breed/hound/images';
const respImages = {
    status: 'success',
    message: [
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10715.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10822.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10832.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088094_10982.jpg'
    ]
};

const resolveRequest = url => {
    switch (url) {
        case urlDogs:
            return respDogs;
        case urlImages:
            return respImages;
        default:
            return {};
    }
};

describe('API Helpers should', () => {
    it('get request from URL', () => {
        helpers.requestURL = jest
            .fn()
            .mockImplementationOnce(url => Promise.resolve(resolveRequest(url)));
        return helpers.requestURL(urlDogs).then(r => {
            expect(r).toEqual(respDogs);
        });
    });

    it('get dogs from API and save them in database', async () => {
        await models.sequelize.sync({ force: true });
        helpers.requestURL = jest.fn().mockImplementationOnce(url => {
            if (url.includes('all')) return respDogs;
            return respImages;
        });
        await helpers.getDogsFromAPI(models);
        const dog = await models.Dog.findOne({ where: { id: 4 }, include: [models.Image] });
        expect(dog).toMatchObject({
            id: expect.any(Number),
            breed: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            images: expect.any(Array)
        });
    });
});
