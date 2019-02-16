import { Router } from 'express';
import multer from 'multer';
import models from '../models/';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('dogPic'), async (req, res, next) => {
    try {
        const DogId = ~~req.body.dogBreed;
        const { id, path } = await models.Image.create({
            path: req.file.path,
            DogId
        });
        res.json({ id, path, DogId });
    } catch (err) {
        next(err);
    }
});

export default router;
