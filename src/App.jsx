import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const eidDate = new Date(2025, 2, 30, 0, 0, 0).getTime();

  const getTimeLeft = () => {
    const now = new Date().getTime();
    const diff = eidDate - now;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <h1>🕌 Eid al-Fitr Countdown</h1>
      <div className="countdown-card">
        {Object.entries(timeLeft).map(([unit, value], index) => (
          <div className="time-box" key={unit}>
            <motion.div
              key={value} // Ensures animation triggers on value change
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="number"
            >
              {value}
            </motion.div>
            <span className="label">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
