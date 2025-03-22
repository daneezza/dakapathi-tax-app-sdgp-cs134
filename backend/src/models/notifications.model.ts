import mongoose, { Document, Schema } from 'mongoose';

interface INotification extends Document {
    userId: string;
    message: string;
    createdAt: Date;
    read: boolean;
}

const notificationSchema: Schema = new Schema({
    userId: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

export default mongoose.model<INotification>('Notification', notificationSchema);