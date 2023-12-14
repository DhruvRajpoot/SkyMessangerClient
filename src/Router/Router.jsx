import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Messanger } from "../Pages/Messanger";
import MyContext from "../Context/MyContext";
import { Toast } from "../Components/Toast";

export const Router = () => {
  const { showToast } = useContext(MyContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messanger" element={<Messanger />} />
      </Routes>
      {showToast && <Toast />}
    </BrowserRouter>
  );
};
