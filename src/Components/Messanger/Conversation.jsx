import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";

export const Conversation = ({ user }) => {
  const { onlineUsers } = useContext(UserContext);
  const isOnline = onlineUsers.find((u) => u._id === user._id);

  return (
    <div className="flex gap-4 bg-slate-300">
      <h1>{user.email}</h1>
      <p>{user.fullname}</p>
      {isOnline ? (
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      ) : (
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      )}
    </div>
  );
};
