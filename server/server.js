import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/user.router.js';
import recipeRouter from './routes/recipe.router.js';
import eventRouter from './routes/event.router.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://mongo:cg45AHCgF31G4C44DadHG21bGBHeBGhE@roundhouse.proxy.rlwy.net:20744';

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('Hello World, this is the main backend route');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use('/api', userRouter);
app.use('/api', recipeRouter);
app.use('/api', eventRouter);

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB is connected');
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});