import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products';

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with Atlas support
const mongoURI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/productdb';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
    
    // Check if we're connected to Atlas
    const connection = mongoose.connection;
    const host = connection.host;
    if (host.includes('mongodb.net')) {
      console.log('Connected to MongoDB Atlas');
    } else {
      console.log('Connected to local MongoDB');
    }
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/products', productRoutes);

// Basic health check route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});