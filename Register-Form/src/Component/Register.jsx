import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthdate: "",
    gender: "",
    phone: "",
    course: "",
  });

  const { id } = useParams(); // Get the user ID from URL params
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/users/${id}`);
          setFormData(response.data);
        } catch (error) {
          alert("Error fetching user data");
        }
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/update/${id}`, formData);
        alert("User updated successfully");
      } else {
        await axios.post("http://localhost:5000/register", formData);
        alert("User registered successfully");
      }
      navigate("/history");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{
        backgroundImage: "url('./src/assets/Background.avif')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        minHeight: "100vh", // Full viewport height
      }}
    >
      <div
        className="row justify-content-center align-items-center w-100"
        
      >
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div
            className="card shadow-lg p-4"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              border: "none",
            }}
          >
            <h2 className="text-center text-light mb-4">
              {id ? "Edit User" : "Register User"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* First Name & Last Name */}
              <div className="row mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold text-light">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    className="form-control shadow-sm"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold text-light">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    className="form-control shadow-sm"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-bold text-light">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control shadow-sm"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                />
              </div>

              {/* Birthdate */}
              <div className="mb-3">
                <label className="form-label fw-bold text-light">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  className="form-control shadow-sm"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label fw-bold text-light">Phone</label>
                <div className="input-group flex-nowrap">
                  <span className="input-group-text bg-light" id="addon-wrapping">
                    +91
                  </span>
                  <input
                    type="text"
                    aria-describedby="addon-wrapping"
                    name="phone"
                    className="form-control shadow-sm"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                  />
                </div>
              </div>

              {/* Gender Selection */}
              <div className="mb-3">
                <label className="form-label fw-bold text-light">Gender</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      className="form-check-input"
                      onChange={handleChange}
                      checked={formData.gender === "Male"}
                    />
                    <label className="form-check-label text-light">Male</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      className="form-check-input"
                      onChange={handleChange}
                      checked={formData.gender === "Female"}
                    />
                    <label className="form-check-label text-light">
                      Female
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      className="form-check-input"
                      onChange={handleChange}
                      checked={formData.gender === "Other"}
                    />
                    <label className="form-check-label text-light">Other</label>
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div className="mb-3">
                <label className="form-label fw-bold text-light">Course</label>
                <select
                  name="course"
                  className="form-select shadow-sm"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                >
                  <option value="">Select Course</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="Node.Js">Node.Js</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 shadow-sm"
                style={{ backgroundColor: "rgba(0, 123, 255, 0.8)" }}
              >
                {id ? "Update" : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
