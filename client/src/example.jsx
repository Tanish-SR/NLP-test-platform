import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Hello, World! 🌍</h1>
      <p>This is a random standalone React component using JSX.</p>
      <button onClick={() => alert("Button clicked! 🎉")}>Click Me</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
