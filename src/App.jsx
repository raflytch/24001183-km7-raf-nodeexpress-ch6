import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import LoginPageDefault from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import NavbarTailwind from "./components/Fragments/Navbar/NavbarTailwind";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check ada user atau ga

  const checkAuthenticated = () => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <NavbarTailwind checkAuthentication={checkAuthenticated} />
                <HomePage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPageDefault />}
        />
      </Routes>
    </Router>
  );
}

export default App;
