import express from 'express';
import routes from './routes/index';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const app = express();
const port = 3000;

// Enable cors for all origins and routes
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started successfully at ${port}`);
});

export default app;
