import React from "react";
import { Router } from "./Router/Router";
import { MyContextProvider } from "./Context/MyContext";

const App = () => {
  return (
    <div>
      <MyContextProvider>
        <Router />
      </MyContextProvider>
    </div>
  );
};

export default App;
