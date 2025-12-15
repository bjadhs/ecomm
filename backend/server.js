import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { ENV } from './config/env.js';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { clerkMiddleware } from '@clerk/express';

dotenv.config();

const app = express();
const __dirname = path.resolve();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// Routes
app.use('/api/users', userRoute);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Error handling middleware
app.use(errorHandler);

if (ENV.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '../admin/dist')))
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin', '/dist', '/index.html'))
  })
}

app.listen(ENV.PORT, async () => {
  console.log(`Server is running on port ${ENV.PORT}`);
  await connectDB();

});