import React from "react";
import Landing from "./pages/Landing";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/login" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
