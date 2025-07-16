import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Outlet, useLocation, useNavigation } from "react-router";
import Footer from "../shared/Footer";
import LoadingSpinner from "../Components/LoadingSpinner";

const Root = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    // Simulate a brief loading delay (can be removed if not needed)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 20); 

    return () => clearTimeout(timeout);
  }, [location.pathname]);
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar user={null} onLogout={() => {}} />
      <main className="minHeight">
        {loading ? <LoadingSpinner /> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Root;
