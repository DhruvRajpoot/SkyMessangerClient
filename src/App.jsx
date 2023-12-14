import React, { useContext } from "react";
import { Router } from "./Router/Router";
import { UserContextProvider } from "./Context/UserContext";
import { MyContextProvider } from "./Context/MyContext";
import GlobalStyle from "./Styles/GlobalStyle";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <UserContextProvider>
        <MyContextProvider>
          <Router />
        </MyContextProvider>
      </UserContextProvider>
    </div>
  );
};

export default App;
