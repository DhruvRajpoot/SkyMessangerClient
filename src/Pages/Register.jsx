import React, { useContext } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import AuthContext from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";

export const Register = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleGoogleSuccess = (res) => {
    const decode = jwtDecode(res.credential);
    console.log("success", decode);
    setUser(decode);
  };
  console.log(user)

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
    </>
  );
};
