import cors from 'cors';
import express from 'express';
import { cas, login } from './api.js';

const port = 3080;
const app = express();

app.use(express.json());

// CORS Middleware
app.use(cors ({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3080'], // Domain authorized to make requests
}));

app.disable('x-powered-by');

app.get('/pronote/cas', (req, res) => {
    cas(req, res)
});

app.get('/pronote/login', (req, res) => {
    login(req, res)
});

app.listen(port, () => {
    console.log(`API Pronote is Running on : ${port}`);
});