import express from 'express';
import routes from './routes/index';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const app = express();
const port = 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN_URL }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started successfully at ${port}`);
});

export default app;
