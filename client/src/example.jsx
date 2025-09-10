// this is just an test
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  const randomColors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#1A535C", "#FF9F1C"];
  const randomColor =
    randomColors[Math.floor(Math.random() * randomColors.length)];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: randomColor,
        color: "#fff",
        padding: "2rem",
      }}
    >
      <h1>🌟 Random JSX Example 🌟</h1>
      <p>
        {showMessage
          ? "Hello there! This is some random JSX."
          : "The message is hidden."}
      </p>

      <button
        onClick={() => setShowMessage(!showMessage)}
        style={{ marginRight: "1rem" }}
      >
        Toggle Message
      </button>

      <button onClick={() => setCount(count + 1)}>
        Clicked {count} {count === 1 ? "time" : "times"}
      </button>

      <ul style={{ marginTop: "2rem" }}>
        {["Apple 🍎", "Banana 🍌", "Cherry 🍒", "Mango 🥭"].map(
          (fruit, index) => (
            <li key={index}>{fruit}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
