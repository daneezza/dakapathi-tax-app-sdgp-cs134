import { useState, useEffect } from "react";
import { FaRocket, FaGift } from "react-icons/fa";
import "../styles/Pricing.css";

function Pricing() {
    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
    });

    useEffect(() => {
        let storedLaunchDate = localStorage.getItem("launchDate");

        if (!storedLaunchDate) {
            const newLaunchDate = new Date();
            newLaunchDate.setFullYear(newLaunchDate.getFullYear() + 1);
            storedLaunchDate = newLaunchDate.toISOString();
            localStorage.setItem("launchDate", storedLaunchDate);
        }

        const countdownDate = new Date(storedLaunchDate).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0")
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="coming-soon-container">
            <h1 className="coming-soon-title">
                <FaGift /> Enjoy All Premium Features - FREE for a Year!
            </h1>
            <p className="coming-soon-description">
                We’re thrilled to offer you the full experience at no cost for the first year. Explore everything, hassle-free.
            </p>
            <div className="countdown-timer">
                {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
            </div>
            <div className="phase-launch">
                <FaRocket /> <strong>Phase 2 Launching Soon!</strong>
            </div>
            <p className="coming-soon-description">
                Our official paid version arrives with exciting new features and enhanced experiences. Stay tuned!
            </p>
        </div>
    );
};

export default PricingComingSoon;
