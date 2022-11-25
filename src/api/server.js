import cors from 'cors';
import cookieParser from 'cookie-parser';

import { router as usersRouter} from './routes/users.route';

import authJWT from './middlewares/authJWT';

const port = 8080;
const express = require('express');
const app = express();

app.use(express.json());

// CORS Middleware
app.use(cors ({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080'], // Domain authorized to make requests
}));

app.use(cookieParser());

app.disable('x-powered-by');

app.use('/users', usersRouter);

app.get('/isAuthenticated', authJWT, (req, res) => {
    return res.status(200).json({success: true, message: 'Authenticated'});
});

app.get('/logout', (req, res) => {
    res.writeHead(200, {
        "Set-Cookie": `token=; HttpOnly; path=/; max-age=0`,
    });

    res.end();
});

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});