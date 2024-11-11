import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPageDefault from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPageDefault />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
