import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import HotelPage from "./pages/HotelPage";
import HotelCheckout from "./pages/HotelCheckout";
import FlightBooking from "./pages/FlightBookingPage";
import PromotionPage from "./pages/PromotionPage";
import "./App.css";

function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="app">
      <div className="background-overlay"></div>
      {isSignIn ? (
        <SignIn switchToSignUp={() => setIsSignIn(false)} />
      ) : (
        <SignUp switchToSignIn={() => setIsSignIn(true)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/account" element={<UserProfilePage />} />
        <Route path="/hotel" element={<HotelPage />} />
        <Route path="/hotel/payment" element={<HotelCheckout />} />
        <Route path="/flight" element={<FlightBooking />} />
        <Route path="/promotion" element={<PromotionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
