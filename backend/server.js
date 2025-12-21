import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { ENV } from './config/env.js';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { inngest, functions } from './config/inngest.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();


import helmet from 'helmet';

// Middleware
app.use(cors({ origin: ENV.CLIENT_URL || true, credentials: true }));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// Routes
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Inngest
app.use('/api/inngest', serve({ client: inngest, functions }));

// Error handling middleware
app.use(errorHandler);

if (ENV.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '../admin/dist')))
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin', '/dist', '/index.html'))
  })
}

const startServer = async () => {
  app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
  })
  await connectDB();
}

startServer();
