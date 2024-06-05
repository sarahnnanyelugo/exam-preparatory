import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";

import { matchPath } from "react-router-dom";
import {UNAUTHENTICATED_URLs} from "../api/urls";

const AuthContext = createContext({
  token: "",
  user: "",
  roles: [],
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userUpdate: () => {},
});

const jsonHelper = (key) => {
  const obj = localStorage.getItem(key);
  if(typeof obj !== 'string' || obj === 'undefined') {
    return "";
  }
  return JSON.parse(obj);
}
const reteriveStoredToken = () => {
  const user = localStorage.getItem("user");
  if(typeof user !== 'string') {
    return "";
  }
  const storedUser = JSON.parse(user);
  const storedToken = localStorage.getItem("token");
  const storedRoles = jsonHelper("roles");
  return { user: storedUser, token: storedToken,roles: storedRoles };
};

export const AuthProvider = (props) => {
  const navigate = useNavigate();
  const tokenData = reteriveStoredToken();
  let initialToken;
  let initialUser;
  let initialRoles;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUser = tokenData.user;
    initialRoles = tokenData.roles;
  }
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);
  const [roles, setRoles] = useState(initialRoles);

  const userIsLoggedIn = !!token;

  const handleLogout = useCallback(() => {
    setToken(null);
    setUser("");
    setRoles([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    const pathname  = window.location.pathname;
    const isMatch = UNAUTHENTICATED_URLs.some((path) =>
        matchPath(path,pathname, pathname)
    );
    if(!isMatch) {
      navigate("/");
    }
    }, []);

  useEffect(() => {
    if (!token) {
      localStorage.clear();
    }
  }, [token]);

  const handleLogin = (user, token,roles) => {
    setToken(token);
    setUser(user);
    setRoles(roles);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("roles", JSON.stringify(roles));
    localStorage.setItem("token", token);
  };
  const handleUserUpdate = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const contextValue = {
    token,
    user,
    roles,
    isLoggedIn: userIsLoggedIn,
    login: handleLogin,
    userUpdate: handleUserUpdate,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
