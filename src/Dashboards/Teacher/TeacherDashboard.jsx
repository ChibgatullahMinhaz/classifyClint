import React from "react";
import { Link, Outlet } from "react-router";
import { Menu } from "lucide-react";
import { FilePlus,LayoutDashboard, NotebookText, User2 } from "lucide-react";

// import UserDropdown from "../Admin/Components/UserDropdown/UserDropdown";

const TeacherDashboard = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Hidden checkbox to toggle drawer on mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            {/* Toggle button (only visible on small screens) */}
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <Menu className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-4 text-xl font-bold">Teacher Dashboard</div>
          {/* <UserDropdown /> */}
        </div>

        {/* Page content */}
        <main className="flex-grow p-6 bg-base-100">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-base-300 text-center py-4">
          <p>© 2025 RideApp. All rights reserved.</p>
        </footer>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay lg:hidden"
        ></label>
        <aside className="menu p-4 w-64 bg-base-200 text-base-content min-h-screen">
          <h2 className="text-xl font-bold mb-4">My Menu</h2>
          <ul className="menu p-0 space-y-1">
            <li>
              <Link to="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/myBookings"
                className="flex items-center gap-2"
              >
                <FilePlus size={18} /> Add class
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-2">
                <NotebookText size={18} /> My class
              </Link>
            </li>
            <li>
              <Link to="/dashboard/invoice" className="flex items-center gap-2">
                <User2 size={18} /> Profile
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default TeacherDashboard;
