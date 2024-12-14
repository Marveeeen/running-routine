import { useState, useEffect } from "react";

const getGreetings = (date: Date) => {
  const hour = date.getHours();

  if (hour >= 6 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good morning";

  return "Good evening";
};

export default function Header() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greetings = getGreetings(currentDateTime);

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {greetings}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {currentDateTime.toLocaleDateString()}{" "}
        {currentDateTime.toLocaleTimeString()}
      </p>
    </header>
  );
}
