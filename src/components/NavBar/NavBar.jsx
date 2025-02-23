import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";
import { tokenContext } from "../../context/tokenContext";
import { cartContext } from "../../context/cartContext";
import { ThemeContext } from "../../context/themeContext";

export default function NavBar() {
  let { token, setToken } = useContext(tokenContext);
  let { cartCount } = useContext(cartContext);
  let { isDark, toggleTheme } = useContext(ThemeContext);
  let navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function LogOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 z-50 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Toggler */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between">
          <Link to="/">
            <img src={Logo} alt="Fresh Cart" className="h-8" />
          </Link>

          {/* Mobile Toggler & Dark Mode Button */}
          <div className="flex items-center gap-2 md:hidden">
            {token && (
              <Link to="/cart" className="relative">
                <i className="fa-solid fa-cart-shopping fa-lg text-gray-900 dark:text-white"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className="p-1 text-color"
              title="Toggle Dark Mode"
            >
              {isDark ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
            </button>

            {/* Menu Toggler */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Links and Logout for Small Screens */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block absolute md:relative top-full left-0 w-full md:w-auto z-50 bg-white dark:bg-gray-900 shadow-md md:shadow-none`}
        >
          <ul className="font-medium flex flex-col md:flex-row p-4 md:p-0 border border-gray-100 md:border-0 rounded-lg bg-gray-50 md:bg-transparent md:space-x-8 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {token ? (
              <>
                <li>
                  <NavLink to="/" className="text-gray-900 dark:text-white hover:text-color">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart" className="text-gray-900 dark:text-white hover:text-color">
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/wishlist" className="text-gray-900 dark:text-white hover:text-color">
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="text-gray-900 dark:text-white hover:text-color">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className="text-gray-900 dark:text-white hover:text-color">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/brands" className="text-gray-900 dark:text-white hover:text-color">
                    Brands
                  </NavLink>
                </li>
                <li className="md:hidden">
                  <button
                    onClick={LogOut}
                    className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              isMenuOpen && (
                <>
                  <li>
                    <NavLink to="/login" className="text-gray-900 dark:text-white hover:text-color">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className="text-gray-900 dark:text-white hover:text-color">
                      Register
                    </NavLink>
                  </li>
                </>
              )
            )}
          </ul>
        </div>

        {/* Right Section: Cart, Dark Mode, Sign Out for Large Screens */}
        <div className="hidden md:flex items-center gap-4">
          {token && (
            <Link to="/cart" className="relative text-gray-900 dark:text-white">
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="p-1 text-color"
            title="Toggle Dark Mode"
          >
            {isDark ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
          </button>

          {!token && !isMenuOpen && (
            <>
              <NavLink to="/login" className="text-gray-900 dark:text-white hover:text-color">
                Login
              </NavLink>
              <NavLink to="/register" className="text-gray-900 dark:text-white hover:text-color">
                Register
              </NavLink>
            </>
          )}

          {token && (
            <button
              onClick={LogOut}
              className="hidden md:block text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
