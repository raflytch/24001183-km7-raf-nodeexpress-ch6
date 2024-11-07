import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavbarWithStyling from "./components/NavbarWithStyling";
import { HoverButton } from "./components/Elements/button/HoverButton";
import { AboutView } from "./pages/AboutView";
import { NotFoundView } from "./pages/NotFound";
import { HomeView } from "./pages/HomeView";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
    errorElement: <NotFoundView />,
  },
  {
    path: "/about",
    element: <AboutView />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
