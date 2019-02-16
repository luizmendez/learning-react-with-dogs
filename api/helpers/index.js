import https from 'https';
import models from '../models/';

export function requestURL(url) {
    return new Promise((resolve, reject) => {
        https
            .get(url, res => {
                let raw = '';
                res.on('data', chunk => (raw += chunk));
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(raw);
                        resolve(parsedData);
                    } catch (e) {
                        reject(e);
                    }
                });
            })
            .on('error', e => {
                reject(e);
            });
    });
}

const getImagesURL = breed => `https://dog.ceo/api/breed/${breed}/images`;

export async function getDogsFromAPI() {
    const dogCount = await models.Dog.count();
    if (dogCount) return;
    const urlDogs = 'https://dog.ceo/api/breeds/list/all';
    const dogs = await requestURL(urlDogs);
    return Promise.all(
        Object.keys(dogs.message).map(breed =>
            requestURL(getImagesURL(breed)).then(r =>
                models.Dog.create(
                    { breed, images: r.message.slice(0, 5).map(path => ({ path })) },
                    { include: [models.Image] }
                )
            )
        )
    );
}
