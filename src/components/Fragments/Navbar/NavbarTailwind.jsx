import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const NavbarTailwind = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b shadow-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-teal-600 font-bold text-lg">
          Rafly
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link className="text-gray-700 hover:text-teal-600" to="/">
                Home
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  className="text-gray-700 hover:text-teal-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link className="text-gray-700 hover:text-teal-600" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden md:block rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:block rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white hover:bg-teal-700"
            >
              Login
            </Link>
          )}

          <button
            className="md:hidden p-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul className="px-4 py-8 space-y-4 text-sm">
          <li>
            <Link
              className="block text-gray-700 hover:bg-teal-100 rounded-md px-4 py-2"
              to="/"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                className="block w-full text-left text-gray-700 hover:bg-teal-100 rounded-md px-4 py-2"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                Logout
              </button>
            ) : (
              <Link
                className="block text-gray-700 hover:bg-teal-100 rounded-md px-4 py-2"
                to="/login"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </li>
          {!isLoggedIn && (
            <li>
              <Link
                className="block text-gray-700 hover:bg-teal-100 rounded-md px-4 py-2"
                to="/register"
                onClick={toggleMenu}
              >
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default NavbarTailwind;
