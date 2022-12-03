import cors from 'cors';
import express from 'express';
import { cas, login } from './api.js';
import path from 'path';
import {fileURLToPath} from 'url';

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
    cas(req, res)
});

app.get('/pronote/login', (req, res) => {
    login(req, res)
});

app.get('/', (req, res) => {
    res.send("Page en Maintenance")
});

app.listen(port, () => {
    console.log(`API Pronote is Running on : ${port}`);
});