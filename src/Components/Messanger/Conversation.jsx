import React from "react";

export const Conversation = ({ user }) => {
  return (
    <div className="flex gap-4 bg-slate-300">
      <h1>{user.email}</h1>
      <p>{user.fullname}</p>
    </div>
  );
};
