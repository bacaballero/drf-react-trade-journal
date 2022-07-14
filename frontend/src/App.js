import "./App.css";
import HomePage from "./Components/HomePage";
import { useState } from "react";
import { AuthProvider } from "./Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}

export default App;
