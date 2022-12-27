import cors from 'cors';
import express from 'express';
import { cas, login, infos, getFriends, addFriend, photo, nom, timetable, ping } from './api.js';
import path from 'path';
import {fileURLToPath} from 'url';
import {connect} from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 80;
const app = express();

app.use(express.json());

// CORS Middleware
app.use(cors ({
    credentials: true,
    origin: ['https://localhost:80', 'https://localhost:8080', 'https://localhost:443'],
}));

app.disable('x-powered-by');

app.get('/pronote/cas', (req, res) => {
    console.log('/pronote/cas')
    return cas(req, res);
});

app.get('/pronote/login', (req, res) => {
    console.log('/pronote/login')
    return login(req, res);
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

app.get('/pronote/ping', (req, res) => {
    console.log('/pronote/ping')
    return ping(req, res);
});

app.get('/', (req, res) => {
    return res.send("Page en Maintenance");
});

app.listen(port, () => {
    console.log(`API Pronote is Running on : ${port}`);
    return connect();
});