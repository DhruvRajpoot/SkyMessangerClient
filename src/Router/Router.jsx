import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Messanger } from "../Pages/Messanger";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messanger" element={<Messanger />} />
      </Routes>
    </BrowserRouter>
  );
};
