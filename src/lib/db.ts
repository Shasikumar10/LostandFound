import mongoose from 'mongoose';

// Direct connection string for development
const MONGODB_URI = 'mongodb+srv://Shashi:shashi@cluster0.zwciql3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Track connection status
let isConnected = false;

async function connectToDatabase() {
  // If already connected, return the existing connection
  if (isConnected) {
    return mongoose;
  }

  try {
    // Connect to MongoDB using the correct import
    await mongoose.connect(MONGODB_URI);
    
    // Set connection flag
    isConnected = true;
    console.log('MongoDB connected successfully');
    
    // Setup connection event handlers
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });
    
    // Return mongoose instance
    return mongoose;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }
}

export default connectToDatabase;