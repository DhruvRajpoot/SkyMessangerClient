import React, { useContext } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import MyContext from "../Context/MyContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../Config/Baseurl";

export const Register = () => {
  const { loggedInUser, setLoggedInUser } = useContext(MyContext);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (res) => {
    try {
      const response = await axios.post(`${SERVER_URL}/auth/google/signup`, {
        googleToken: res.credential,
      });

      if (response.status === 201) {
        setLoggedInUser(response.data.user);
        localStorage.setItem("accessToken", response.data.token.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/messanger");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 409) {
        navigate("/login");
      }
    }
  };

  const handleGoogleError = (err) => {
    console.log("error", err);
  };

  return (
    <>
      <div className="text-lg">Register</div>
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
      <Link to={"/login"}>
        <button> Go to Login</button>
      </Link>
    </>
  );
};
