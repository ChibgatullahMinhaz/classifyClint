import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const siteName = "Classify";

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 md:px-10">
      {/* Left: Logo + Site Name */}
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-x-0.5 text-xl font-bold text-primary"
        >
          <img className="w-10" src="https://cdn.vectorstock.com/i/500p/06/95/flat-web-template-with-lms-for-concept-design-vector-42750695.jpg" />
          {siteName}
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 text-base font-medium">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
          <Link to="/AllClasses" className="hover:text-primary ">
              All Classes
            </Link>
          </li>
          <li>
            <Link to="/techOn" className="hover:text-primary">
              Teach on {siteName}
            </Link>
          </li>
        </ul>
      </div>

      {/* Right: Auth or Profile */}
      <div className="flex-none gap-2">
        {!user ? (
          <Link to="/login" className="btn btn-primary btn-sm px-4 text-white">
            Sign In
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-10 rounded-full border-2 border-primary">
                <img src={user.photoURL} alt="profile" />
              </div>
            </div>
            {dropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-52 transition-all duration-150"
              >
                <li className="text-gray-800 font-semibold cursor-default">
                  {user.name}
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 hover:bg-base-200"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={onLogout}
                    className="flex items-center text-red-600 hover:bg-base-200 gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* Mobile Dropdown Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/classes">All Classes</Link>
            </li>
            <li>
              <Link to="/teach">Teach on {siteName}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
