import { Router } from 'express';
import models from '../models/';

const router = Router();

router.get('/', async (req, res) => {
    return res.send(await models.Dog.findAll({ include: [models.Image] }));
});

router.get('/:dogBreed', (req, res) => {
    return res.send(
        models.Dog.findAll({ where: { breed: req.params.dogBreed }, include: [models.Image] })
    );
});

export default router;
