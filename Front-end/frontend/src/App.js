import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import HotelPage from "./pages/HotelPage";
import BookingHotel from "./pages/BookingHotel";
import FlightBooking from "./pages/FlightBookingPage";
import PromotionPage from "./pages/PromotionPage";
import AirportTransfer from "./pages/AirportTransferPage";
import DetailsHotel from "./pages/DetailHotelPage";
import ForgotPassword from "./components/ForgotPassword";
import TransactionHistory from "./pages/TransactionHistory";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/account" element={<UserProfilePage />} />
        <Route path="/hotel" element={<HotelPage />} />
        <Route path="/hotel/payment" element={<BookingHotel />} />
        <Route path="/flight" element={<FlightBooking />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/transfer" element={<AirportTransfer />} />
        <Route path="/hi" element={<DetailsHotel />} />
      </Routes>
    </Router>
  );
}

export default App;
