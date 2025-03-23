import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Notification document
export interface INotification extends Document {
  message: string;
  createdAt: Date;
}

// Define the schema
const notificationSchema: Schema<INotification> = new Schema(
  {
    message: { 
      type: String, 
      required: [true, 'Message is required'], // Add validation
      trim: true, // Remove extra spaces
      minlength: [1, 'Message cannot be empty'], // Ensure message is not empty
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create and export the model
const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;