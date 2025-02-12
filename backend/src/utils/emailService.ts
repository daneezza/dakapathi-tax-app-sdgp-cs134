import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
    },
});

export const sendOTPEmail = async (email: string, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Dakapathi OTP Code',
        text: `Your OTP code is: ${otp}. This code is valid for 5 minutes.`,
};

await transporter.sendMail(mailOptions);
};
