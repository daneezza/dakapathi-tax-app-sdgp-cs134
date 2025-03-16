import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    nic: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['Admin', 'User'], required: true },
    quizEasyScore: { type: Number, default: 0 },
    quizMediumScore: { type: Number, default: 0 },
    quizHardScore: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

export default User;
