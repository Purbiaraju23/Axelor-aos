import { createContext, useContext } from "react";

export const AuthContext = createContext({
  AuthStatus: false,
  logIn: () => {},
  logout: () => {},
});

export const AuthContextProvider = AuthContext.Provider;

export default function useAuth() {
  return useContext(AuthContext);
}
