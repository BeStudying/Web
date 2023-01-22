import express from 'express';
import { cas, login, infos, getFriends, addFriend, photo, nom, timetable, ping, marks, loginQR } from './api.js';
import { login as qrlogin} from '@dorian-eydoux/pronote-api';
import {connect} from './db.js';

const port = 100;
const app = express();

app.use(express.json());

app.disable('x-powered-by');

app.get('/pronote/cas', (req, res) => {
    console.log('/pronote/cas')
    return cas(req, res);
});

app.get('/pronote/login', (req, res) => {
    console.log('/pronote/login')
    return login(req, res);
});

app.get('/pronote/loginQr', (req, res) => {
    console.log('/pronote/loginQr')
    return loginQR(req, res);
});

app.get('/pronote/infos', (req, res) => {
    console.log('/pronote/infos')
    return infos(req, res);
});

app.get('/pronote/friends', (req, res) => {
    console.log('/pronote/friends')
    return getFriends(req, res);
});

app.get('/pronote/friends/add', (req, res) => {
    console.log('/pronote/friends/add')
    return addFriend(req, res);
});

app.get('/pronote/photo', (req, res) => {
    console.log('/pronote/photo')
    return photo(req, res);
});

app.get('/pronote/nom', (req, res) => {
    console.log('/pronote/nom')
    return nom(req, res);
});

app.get('/pronote/timetable', (req, res) => {
    console.log('/pronote/timetable')
    return timetable(req, res);
});

app.get('/pronote/marks', (req, res) => {
    console.log('/pronote/marks')
    return marks(req, res);
});

app.get('/pronote/ping', (req, res) => {
    console.log('/pronote/ping')
    return ping(req, res);
});

app.get('/', (req, res) => {
    return res.send("Page en Maintenance.");
});

app.listen(port, () => {
    console.log(`API Pronote is Running on : ${port}`);
    //return connect();
});