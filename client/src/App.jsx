import React from "react";
import Landing from "./pages/Landing";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import CreateAd from "./pages/CreateAd";
import CreateSummary from "./pages/CreateSummary";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/login" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/advertisement" element={<CreateAd />} />
      <Route path="/summary" element={<CreateSummary />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
