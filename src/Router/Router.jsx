import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../Pages/Register";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Chats } from "../Pages/Chats";
import MyContext from "../Context/MyContext";
import { Toast } from "../Components/Toast";
import { Error404 } from "../Pages/Error404";

export const Router = () => {
  const { showToast } = useContext(MyContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {showToast && <Toast />}
    </BrowserRouter>
  );
};
