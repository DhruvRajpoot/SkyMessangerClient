import React, { useContext, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export const Messanger = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      {user !== null ? (
        <div>
          <h1>Messanger {user.email}</h1>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
