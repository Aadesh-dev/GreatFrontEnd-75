import { useState, useEffect } from "react";

const LIGHT_SEQUENCE = [
  { color: "green", duration: 3000 },
  { color: "yellow", duration: 500 },
  { color: "red", duration: 4000 },
];

export default function TrafficLight() {
  const [index, setIndex] = useState(0);
  const currentLight = LIGHT_SEQUENCE[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % LIGHT_SEQUENCE.length);
    }, currentLight.duration);

    return () => clearTimeout(timer);
  }, [index, currentLight.duration]);

  return (
    <div className="traffic-light">
      {LIGHT_SEQUENCE.map((light, i) => (
        <div
          key={light.color}
          className={`light ${light.color}`}
          style={{ opacity: i === index ? 1 : 0.2 }}
        />
      ))}
    </div>
  );
}
