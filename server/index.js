import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

// pull env variables from .env file
dotenv.config();

// add express and middleware
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
// api endponts to hook onto form frontend
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
// routes
app.get('/', async (req, res) => {
    res.send('Hello from DALL-E')
})

const startServer = async () => {

    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => {console.log('listening on port http://localhost:8080')});
    } catch(error){
        console.log(error)
    }

    
}

startServer();