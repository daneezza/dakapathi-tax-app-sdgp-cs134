import mongoose from 'mongoose';

// Mongoose schema for storing user details
const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    nic: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    type: { type: String, enum: ['Admin', 'User'], required: true },
    profilePic: { type: String, default: '' },
    quizEasyScore: { type: Number, default: 0 },
    quizMediumScore: { type: Number, default: 0 },
    quizHardScore: { type: Number, default: 0 }
});

// Create user model
const User = mongoose.model('User', userSchema);
// Export user model
export default User;