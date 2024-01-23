import React, { useState, useContext } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import UserContext from "../Context/UserContext";
import MyContext from "../Context/MyContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../Config/Baseurl";
import {
  LoginForm,
  LoginContainer,
  PasswordVisibility,
} from "../Styles/Pages/Login";
import { InputGroup, PrimaryButton } from "../Styles/Common";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Login = () => {
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(UserContext);
  const { showToastMessage } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        setLoggedInUser(response.data.user);
        localStorage.setItem("accessToken", response.data.token.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        document.cookie = `refreshToken=${
          response.data.token.refreshToken
        }; Max-Age=${7 * 24 * 60 * 60}`;
        showToastMessage("Success", "Login Successfully");
        navigate("/chats");
        setEmail("");
        setPassword("");
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
      const response = await axios.post(`${SERVER_URL}/auth/google/login`, {
        googleToken: res.credential,
      });

      if (response.status === 200) {
        setLoggedInUser(response.data.user);
        localStorage.setItem("accessToken", response.data.token.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        document.cookie = `refreshToken=${
          response.data.token.refreshToken
        }; Max-Age=${7 * 24 * 60 * 60}`;
        navigate("/chats");
        showToastMessage("Success", "Login Successfully");
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
    <LoginContainer>
      <LoginForm onSubmit={handleLoginSubmit}>
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
        <PrimaryButton type="submit">Login</PrimaryButton>
      </LoginForm>

      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          type={"icon"}
          shape={"circle"}
        />
      </GoogleOAuthProvider>

      <Link to={"/chats"}>
        <button> Go to Chat Page</button>
      </Link>

      <Link to={"/register"}>
        <button> Go to Register</button>
      </Link>
    </LoginContainer>
  );
};
