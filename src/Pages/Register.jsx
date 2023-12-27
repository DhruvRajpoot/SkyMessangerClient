import React, { useContext, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import UserContext from "../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../Config/Baseurl";
import MyContext from "../Context/MyContext";
import { RegisterContainer, RegisterForm } from "../Styles/Pages/Register";
import { PasswordVisibility } from "../Styles/Pages/Login";
import { InputGroup, PrimaryButton } from "../Styles/Common";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Register = () => {
  const { setLoggedInUser } = useContext(UserContext);
  const { showToastMessage } = useContext(MyContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/auth/register`, {
        email,
        password,
        fullname,
      });
      if (response.status === 201) {
        setLoggedInUser(response.data.user);
        localStorage.setItem("accessToken", response.data.token.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/messanger");
        showToastMessage("Success", "Register Successfully");
      }
    } catch (err) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        showToastMessage(
          "Error",
          "Network Error, Please check your internet connection"
        );
      } else {
        showToastMessage("Error", err.response.data.error);
      }
    }
  };

  const handleGoogleSuccess = async (res) => {
    try {
      const response = await axios.post(`${SERVER_URL}/auth/google/register`, {
        googleToken: res.credential,
      });

      if (response.status === 201) {
        setLoggedInUser(response.data.user);
        localStorage.setItem("accessToken", response.data.token.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        document.cookie = `refreshToken=${
          response.data.token.refreshToken
        };expires=${new Date().getTime() + 7 * 24 * 60 * 60 * 1000}`;
        showToastMessage("Success", "Register Successfully");
        navigate("/messanger");
      }
    } catch (err) {
      console.log(err);
      if (err.code === "ERR_NETWORK") {
        showToastMessage(
          "Error",
          "Network Error, Please check your internet connection"
        );
      } else {
        showToastMessage("Error", err.response.data.error);
      }
    }
  };

  const handleGoogleError = (err) => {
    console.log("error", err);
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleRegisterSubmit}>
        <InputGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Password</label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <PasswordVisibility
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            title={isPasswordVisible ? "Hide Password" : "Show Password"}
          >
            {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
          </PasswordVisibility>
        </InputGroup>
        <InputGroup>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </InputGroup>
        <PrimaryButton type="submit">Register</PrimaryButton>
      </RegisterForm>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          type={"icon"}
          shape={"circle"}
        />
      </GoogleOAuthProvider>

      <Link to={"/messanger"}>
        <button> Go to Messanger</button>
      </Link>

      <Link to={"/login"}>
        <button> Go to Login</button>
      </Link>
    </RegisterContainer>
  );
};
