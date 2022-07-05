import "./App.css";
import HomePage from "./components/HomePage";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  return (
    <div>
      <HomePage token={token} setToken={setToken} />
    </div>
  );
}

export default App;
