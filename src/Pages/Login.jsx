import React, { useContext } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import MyContext from "../Context/MyContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../Config/Baseurl";

export const Login = () => {
  const { loggedInUser, setLoggedInUser } = useContext(MyContext);
  const navigate = useNavigate();
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
        };expires=${new Date().getTime() + 7 * 24 * 60 * 60 * 1000}`;
        navigate("/messanger");
      }
    } catch (err) {
      console.log(err);
      if (err.response.data.error === "User not exists") {
        navigate("/register");
      }
    }
  };

  const handleGoogleError = (err) => {
    console.log("error", err);
  };

  return (
    <>
      <div>Login</div>
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
      <br />
      <Link to={"/register"}>
        <button> Go to Register</button>
      </Link>
    </>
  );
};
