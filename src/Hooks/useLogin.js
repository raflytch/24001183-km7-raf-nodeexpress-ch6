import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({});
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data.status === "Success") {
        const { token } = response.data.data[0];

        Cookies.set("token", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        login(token);

        setNotificationData({
          message: "Login Successful",
          description: "You have successfully logged in.",
          type: "success",
        });
        setShowNotification(true);
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    showNotification,
    setShowNotification,
    notificationData,
    handleLogin,
  };
};

export default useLogin;
