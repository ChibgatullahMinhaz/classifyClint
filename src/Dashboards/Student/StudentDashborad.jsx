import React from "react";
import { Link, Outlet } from "react-router";
import { LayoutDashboard, User, BookOpen, Menu, ClipboardList } from "lucide-react";

// import UserDropdown from "../Admin/Components/UserDropdown/UserDropdown";

const StudentDashboard = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Hidden checkbox to toggle drawer on mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-blue-100">
          <div className="flex-none lg:hidden">
            {/* Toggle button (only visible on small screens) */}
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <Menu className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-4 text-xl font-bold">
            Classify Student Dashboard
          </div>
          {/* <UserDropdown /> */}
        </div>

        {/* Page content */}
        <main className="flex-grow p-6 bg-base-100">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-blue-100 text-center py-4">
          <p>© 2025 classify. All rights reserved.</p>
        </footer>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay lg:hidden"
        ></label>
        <aside className="menu p-4 w-64 bg-blue-50 text-base-content min-h-screen">
          <h2 className="text-xl font-bold mb-4">My Menu</h2>
          <ul className="menu p-0 space-y-1">
            <li>
              <Link to="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-enroll-class"
                className="flex items-center gap-2"
              >
                <BookOpen size={18} /> My enroll class
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-request"
                className="flex items-center gap-2"
              >
                <ClipboardList size={18}  /> My Request
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-profile"
                className="flex items-center gap-2"
              >
                <User size={18} /> Profile
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default StudentDashboard;
