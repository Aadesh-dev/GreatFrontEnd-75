//Simple
import React, { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startRef = useRef(null);

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${totalSeconds}s ${centiseconds.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedMs((elapsedMs) => elapsedMs + 10);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedMs(0);
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch-display" onClick={toggleRunning}>
        {formatTime(elapsedMs)}
      </div>

      <button onClick={toggleRunning}>{isRunning ? "Stop" : "Start"}</button>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

//More accurate but complicated
import React, { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startRef = useRef(null);

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${totalSeconds}s ${centiseconds.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      // Adjust the starting reference so resumed timers continue correctly
      startRef.current = performance.now() - elapsedMs;

      intervalId = setInterval(() => {
        setElapsedMs(performance.now() - startRef.current);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedMs(0);
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch-display" onClick={toggleRunning}>
        {formatTime(elapsedMs)}
      </div>

      <button onClick={toggleRunning}>{isRunning ? "Stop" : "Start"}</button>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}