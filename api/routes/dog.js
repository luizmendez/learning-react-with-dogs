import { Router } from 'express';
import models from '../models/';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        return res.send(
            await models.Dog.findAll({
                order: [['breed', 'ASC']],
                attributes: ['id', 'breed'],
                include: [{ model: models.Image, attributes: ['id', 'path'] }]
            })
        );
    } catch (e) {
        const err = new Error('Error retrieving dogs from database.');
        next(err);
    }
});

router.get('/:dogBreed', (req, res, next) => {
    try {
        return res.send(
            models.Dog.findAll({ where: { breed: req.params.dogBreed }, include: [models.Image] })
        );
    } catch (e) {
        const err = new Error('Error retrieving dog from database.');
        next(err);
    }
});

export default router;
