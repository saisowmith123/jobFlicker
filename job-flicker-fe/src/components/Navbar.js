import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const isCompany = userData?.role === "company";

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="text-2xl font-bold">
        <Link to="/">JobFlicker</Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link
          to="/companies"
          className="hover:text-green-300 transition text-lg font-medium"
        >
          Home
        </Link>
        {/* ✅ Conditionally render Applied Jobs if NOT a company */}
        {!isCompany && (
          <Link
            to="/appliedJobs"
            className="hover:text-green-300 transition text-lg font-medium"
          >
            Applied Jobs
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
