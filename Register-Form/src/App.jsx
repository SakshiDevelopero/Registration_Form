import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import Register from "./Component/Register";
import ViewHistory from "./Component/ViewHistory";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import backgroundImage from "./assets/Background.avif"; // Import the background image

const App = () => {
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
        className="container-fluid p-0 "
      >
        <div className="row g-0">
          {/* Sidebar */}
          <div className="col-md-2 col-3">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-md-10 col-9 p-4 ">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/history" element={<ViewHistory />} />
              <Route path="/" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
