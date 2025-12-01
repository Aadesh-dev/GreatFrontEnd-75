import { useState } from "react";

export default function App() {
  const [bars, setBars] = useState(0);

  return (
    <div>
      <button onClick={() => setBars(bars + 1)}>Add</button>
      <div className="progress-bars">
        {Array.from({ length: bars }).map((_) => (
          <div className="progress-bars__track">
            <div className="progress-bars__track__bar"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
