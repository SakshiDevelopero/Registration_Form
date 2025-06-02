import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const SideBar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar text-white p-4 ${isSidebarOpen ? "d-block" : "d-none"} d-md-block`}
        style={{ width: "250px" }}
      >
        <h2 className="text-uppercase mb-4">Register Form</h2>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <Link
              className={`nav-link ${
                location.pathname === "/register" ? "bg-primary" : ""
              }`}
              to="/register"
            >
              <i className="fa fa-user-plus me-2"></i> Register
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link
              className={`nav-link ${
                location.pathname === "/history" ? "bg-primary" : ""
              }`}
              to="/history"
            >
              <i className="fa fa-history me-2"></i> View History
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-fill p-4">
        <button
          className="d-md-none btn btn-outline-primary mb-3"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <i className={`fa ${isSidebarOpen ? "fa-times" : "fa-search"}`}></i>
        </button>
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default SideBar;
