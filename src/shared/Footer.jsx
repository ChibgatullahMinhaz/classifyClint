import React from "react";
import { Link } from "react-router";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const siteName = "Classify";

  return (
    <footer className="bg-base-200 text-base-content py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: Logo + About */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded" />
            <span className="text-2xl font-bold text-primary">{siteName}</span>
          </Link>
          <p className="text-sm text-gray-600">
            Empowering learners and teachers through world-class online education. Built for all.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 className="footer-title text-lg mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/classes" className="link link-hover">All Classes</Link></li>
            <li><Link to="/teach" className="link link-hover">Teach on {siteName}</Link></li>
            <li><Link to="/login" className="link link-hover">Sign In</Link></li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="footer-title text-lg mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <Facebook />
            </a>
            <a href="#" className="text-sky-500 hover:text-sky-700">
              <Twitter />
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-800">
              <Instagram />
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-900">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="divider my-6" />

      {/* Bottom Row */}
      <div className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
