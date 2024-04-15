import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";

import router from "app/router";
import Translate from "app/services/translate";
import Theme from "app/services/theme";
import { AuthContextProvider } from "./Contexts/AuthContext";

function Root() {
  const [AuthStatus, setAuthenticationStatus] = useState(false);
  const logIn = () => {
    setAuthenticationStatus(true);
  };

  const logout = () => {
    setAuthenticationStatus(false);
    localStorage.clear("user-credential");
  };

  return (
    <AuthContextProvider value={{ AuthStatus, logIn, logout }}>
      <Theme>
        <Translate>
          <RouterProvider router={router} />
        </Translate>
      </Theme>
    </AuthContextProvider>
  );
}

export default Root;
