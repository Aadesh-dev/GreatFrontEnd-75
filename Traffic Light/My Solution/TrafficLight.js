import {useState, useEffect} from "react";

export default function TrafficLight() {
  const [currentColor, setCurrentColor] = useState("green");

  useEffect(() => {
    let greenTimer, yellowTimer, redTimer;

    function litGreenLight() {
      setCurrentColor("green");

      yellowTimer = setTimeout(() => {
        litYellowLight();
      }, 3000);
    }

    function litYellowLight() {
      setCurrentColor("yellow");

      redTimer = setTimeout(() => {
        litRedLight();
      }, 500);
    }

    function litRedLight() {
      setCurrentColor("red");

      greenTimer = setTimeout(() => {
        litGreenLight();
      }, 4000);
    }

    litGreenLight();

    return () => {
      clearTimeout(greenTimer);
      clearTimeout(yellowTimer);
      clearTimeout(redTimer);
    }
  }, []);

  return ( 
  <div>
    <div className="light red" style={{opacity: currentColor === "red" ? 1 : 0.2}}></div>
    <div className="light yellow" style={{opacity: currentColor === "yellow" ? 1 : 0.2}}></div>
    <div className="light green" style={{opacity: currentColor === "green" ? 1 : 0.2}}></div>
  </div>
)}
