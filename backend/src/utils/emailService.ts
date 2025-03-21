import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configures the nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // EMail service
    auth: {
        user: process.env.EMAIL_USER, // Senders email (Dakapathi official email)
        pass: process.env.EMAIL_PASS, // Your app password
    },
});

// Send OTP email for verification
export const sendOTPEmail = async (type:String,subject:string,email: string, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Recivers email
        subject: subject,
        text: `Your ${type} OTP code is: ${otp}. This code is valid for 5 minutes.`,
};

await transporter.sendMail(mailOptions); // Sends the mail
};
