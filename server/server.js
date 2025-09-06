import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Wrap the async DB call and server start
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB

    app.use('/api/user', userRouter);
     app.use('/api/image', imageRouter);
    app.get('/', (req, res) => res.send("API Working"));

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
