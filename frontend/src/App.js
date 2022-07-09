import "./App.css";
import HomePage from "./Components/HomePage";
import { useState } from "react";
import { AuthProvider } from "./Context";

function App() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}

export default App;
