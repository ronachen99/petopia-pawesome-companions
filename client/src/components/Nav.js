// imports the necessary dependencies
import React from "react";
// for authenticating whether the user is logged in or not
import Auth from "../utils/auth";
// import uselocation to see which path is the user on
import { Link, useLocation } from "react-router-dom";
// import icons
import {
  PiUserCircleThin,
  PiUserCirclePlusThin,
  PiGhostThin,
  PiGarageThin,
  PiHouseThin,
  PiSignOutThin,
} from "react-icons/pi";

// functional component for nav
function Nav() {
  // set a variable for the function
  const location = useLocation();

  function showNavigation() {
    // if the user is logged in, show this nav
    if (Auth.loggedIn()) {
      return (
        <ul className="flex flex-col items-start">
          <li
            className={
              // check for path, set different colour for active or inactive page
              location.pathname === "/" || location.pathname.startsWith("/home")
                ? "text-purple-500"
                : "text-zinc-600"
            }
          >
            <Link to="/" className="transition-transform">
              <PiHouseThin size={28} className="icon" />
            </Link>
          </li>
          <li
            className={
              location.pathname.startsWith("/dashboard")
                ? "text-purple-500"
                : "text-zinc-600"
            }
          >
            <Link to="/dashboard" className="transition-transform">
              <PiGarageThin size={28} className="icon" />
            </Link>
          </li>
          <li
            className={
              location.pathname.startsWith("/adoption")
                ? "text-purple-500"
                : "text-zinc-600"
            }
          >
            <Link to="/adoption" className="transition-transform">
              <PiGhostThin size={28} className="icon" />
            </Link>
          </li>
          <li>
            {/* once the user clicks on the logout button, it calls the logout function defined in the auth.js */}
            <button
              onClick={() => Auth.logout()}
              className="transition-transform text-zinc-600"
            >
              <PiSignOutThin size={28} className="icon" />
            </button>
          </li>
        </ul>
      );
    } else {
      // if the user is not logged in, show this nav
      return (
        <ul className="flex flex-col items-start">
          <li
            className={
              location.pathname === "/" ? "text-purple-500" : "text-zinc-600"
            }
          >
            <Link to="/" className="transition-transform">
              <PiHouseThin size={28} className="icon" />
            </Link>
          </li>
          <li
            className={
              location.pathname.startsWith("/login")
                ? "text-purple-500"
                : "text-zinc-600"
            }
          >
            <Link to="/login" className="transition-transform">
              <PiUserCircleThin size={28} className="icon" />
            </Link>
          </li>
          <li
            className={
              location.pathname.startsWith("/signup")
                ? "text-purple-500"
                : "text-zinc-600"
            }
          >
            <Link to="/signup" className="transition-transform">
              <PiUserCirclePlusThin size={28} className="icon" />
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
