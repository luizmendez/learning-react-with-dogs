import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads'));

app.use('/dogs', routes.dog);
app.use('/image', routes.image);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const isServerError = errStatus >= 500;
    const message = isServerError ? 'Server Error!' : err.message || 'There was an error';
    res.json({
        status: errStatus,
        message
    });
});

export default app;
