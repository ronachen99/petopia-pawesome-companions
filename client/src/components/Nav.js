import React from "react";
import Auth from "../utils/auth";
import { Link, useLocation } from "react-router-dom";
import {
  PiUserCircleThin,
  PiUserCirclePlusThin,
  PiGhostThin,
  PiGarageThin,
  PiHouseThin,
  PiSignOutThin,
} from "react-icons/pi";

function Nav() {
  const location = useLocation();

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex flex-col items-start">
          <li
            className={
              location.pathname === "/" || location.pathname.startsWith("/home")
                ? "text-blue-500"
                : "text-gray-600"
            }
          >
            <Link to="/" className="transition-transform">
              <PiHouseThin size={28} className="icon" />
            </Link>
          </li>
          <li
            className={
              location.pathname.startsWith("/dashboard")
                ? "text-blue-500"
                : "text-gray-600"
            }
          >
            <Link to="/dashboard" className="transition-transform">
              <PiGarageThin size={28} className="icon" />
            </Link>
          </li>
          <li
            className={
              location.pathname.startsWith("/adoption")
                ? "text-blue-500"
                : "text-gray-600"
            }
          >
            <Link to="/adoption" className="transition-transform">
              <PiGhostThin size={28} className="icon" />
            </Link>
          </li>
          <li>
            <button onClick={() => Auth.logout()} className="icon">
              <PiSignOutThin size={28} />
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex flex-col items-start">
          <li
            className={
              location.pathname === "/" ? "text-blue-500" : "text-gray-600"
            }
          >
            <Link to="/" className="transition-transform">
              <PiHouseThin size={28} className="icon" />
            </Link>
          </li>
          <li
            className={
              location.pathname.startsWith("/signup")
                ? "text-blue-500"
                : "text-gray-600"
            }
          >
            <Link to="/signup" className="transition-transform">
              <PiUserCirclePlusThin size={28} className="icon" />
            </Link>
          </li>
          <li
            className={
              location.pathname.startsWith("/login")
                ? "text-blue-500"
                : "text-gray-600"
            }
          >
            <Link to="/login" className="transition-transform">
              <PiUserCircleThin size={28} className="icon" />
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <nav className="fixed left-4 top-1/2 transform -translate-y-1/2 flex justify-start items-center px-4 py-2 bg-white rounded-lg shadow">
      {showNavigation()}
    </nav>
  );
}

export default Nav;
