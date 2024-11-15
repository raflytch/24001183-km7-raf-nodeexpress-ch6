import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPageDefault from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NavbarTailwind from "./components/Fragments/Navbar/NavbarTailwind";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <>
              <NavbarTailwind logout={logout} />
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
  );
}

export default App;
