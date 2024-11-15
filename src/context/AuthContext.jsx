import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAuthenticated = () => {
    const token = Cookies.get("token");
    if (!token || isTokenExpired(token)) {
      Cookies.remove("token");
      setIsAuthenticated(false);
      setUser(null);
    } else {
      setIsAuthenticated(true);
      setUser(jwtDecode(token));
    }
  };

  const login = (token) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    setIsAuthenticated(true);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data.status === "Success") {
        const { token } = response.data.data[0];
        login(token);

        setNotificationData({
          message: "Login Successful",
          description: "You have successfully logged in.",
          type: "success",
        });
        setShowNotification(true);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(`Login failed. Please try again: ${response.data.status}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      setNotificationData({
        message: "Login Failed",
        description: errorMessage,
        type: "error",
      });
      setShowNotification(true);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        checkAuthenticated,
        user,
        email,
        setEmail,
        password,
        setPassword,
        error,
        showNotification,
        setShowNotification,
        notificationData,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
