import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import models from './models/';

let { users, messages } = models;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.me = users[1];
    next();
});

app.get('/users', (req, res) => {
    return res.send({ ...users });
});
app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

app.get('/messages', (req, res) => {
    return res.send({ ...messages });
});
app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
});
app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.me.id
    };
    messages[id] = message;
    return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
    const { [req.params.messageId]: message, ...otherMessages } = messages;
    messages = otherMessages;
    return res.send(message);
});

app.put('/messages/:messageId', (req, res) => {
    const { [req.params.messageId]: message, ...otherMessages } = messages;
    const newMessage = {
        id: req.params.messageId,
        text: req.body.text,
        userId: req.me.id
    };
    messages = { ...otherMessages, newMessage };
    return res.send(message);
});

app.get('/session', (req, res) => {
    return res.send(users[req.me.id]);
});

app.listen(3000, () => console.log('Listening on port 3000!'));
