import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Establish mongodb connection using mongoose
const connectDB = async () => {
    try {
        // Connect to Mongodb using connection URL
        await mongoose.connect(process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as any);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);// Terminate the application is connection fails
    }
};

export default connectDB;