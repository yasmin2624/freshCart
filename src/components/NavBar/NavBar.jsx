import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";
import { tokenContext } from "../../context/tokenContext";
import { cartContext } from "../../context/cartContext";

export default function NavBar() {
  let { token, setToken } = useContext(tokenContext);
  let { cartCount } = useContext(cartContext);
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
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <Link to="/">
            <img src={Logo} alt="Fresh Cart" className="h-8" />
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block absolute md:relative top-full left-0 w-full md:w-auto z-50 bg-white md:bg-transparent shadow-md md:shadow-none`}
          id="navbar-default"
        >
          {token && (
            <ul className="font-medium flex flex-col md:flex-row p-4 md:p-0 border border-gray-100 md:border-0 rounded-lg bg-gray-50 md:bg-transparent md:space-x-8 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" className="text-gray-900 dark:text-white dark:hover:text-green-500">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="text-gray-900 dark:text-white dark:hover:text-green-500">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/wishlist" className="text-gray-900 dark:text-white dark:hover:text-green-500">
                  Wish List
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="text-gray-900 dark:text-white dark:hover:text-green-500">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className="text-gray-900 dark:text-white dark:hover:text-green-500">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="/brands" className="text-gray-900 dark:text-white dark:hover:text-green-500">
                  Brands
                </NavLink>
              </li>
              <li>
                <Link to="/cart" className="text-gray-900 dark:text-white dark:hover:text-green-500">
                  <i className="fa-solid fa-cart-shopping fa-lg" /> {cartCount}
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Social Icons & Authentication */}
        <div className="flex items-center">
          <ul className="flex gap-3">
            <li>
              <i className="fa-brands fa-instagram"></i>
            </li>
            <li>
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li>
              <i className="fa-brands fa-tiktok"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin"></i>
            </li>
            <li>
              <i className="fa-brands fa-youtube"></i>
            </li>
          </ul>
          <ul className="flex gap-3 ms-4">
            {token ? (
              <li>
                <Link onClick={LogOut} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300">
                  SignOut
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}