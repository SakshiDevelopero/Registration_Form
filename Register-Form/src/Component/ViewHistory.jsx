import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewHistory = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleUpdate = async (userId) => {
    try {
      const updatedData = {
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        email: editingUser.email,
        gender: editingUser.gender,
        phone: editingUser.phone,
        course: editingUser.course,
      };

      const response = await axios.put(
        `http://localhost:5000/update/${userId}`,
        updatedData
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...updatedData } : user
        )
      );

      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/delete/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid px-4 py-5">
      <div className="row mb-4">
        <div className="col-12 col-md-6 d-flex align-items-center">
          <h2 className="text-center text-primary mb-0">
            View Registered Users
          </h2>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center">
          <input
            type="text"
            className="form-control w-75 shadow-sm  text-white"
            placeholder="Search by Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        {filteredUsers.length > 0 ? (
          <table className="table table-hover table-striped table-bordered shadow-sm rounded text-center mt-5">
            <thead className="table-dark">
              <tr className="text-white">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="table-primary">
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ backgroundColor: "#f8f9fa" }}>
                  {" "}
                  {/* Light background color for rows */}
                  {editingUser && editingUser.id === user.id ? (
                    <td>
                      <input
                        type="text"
                        value={editingUser.first_name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            first_name: e.target.value,
                          })
                        }
                      />
                    </td>
                  ) : (
                    <td>{user.first_name}</td>
                  )}
                  {editingUser && editingUser.id === user.id ? (
                    <td>
                      <input
                        type="text"
                        value={editingUser.last_name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            last_name: e.target.value,
                          })
                        }
                      />
                    </td>
                  ) : (
                    <td>{user.last_name}</td>
                  )}
                  {editingUser && editingUser.id === user.id ? (
                    <td>
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </td>
                  ) : (
                    <td>{user.email}</td>
                  )}
                  {editingUser && editingUser.id === user.id ? (
                    <td>
                      <input
                        type="text"
                        value={editingUser.phone}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            phone: e.target.value,
                          })
                        }
                      />
                    </td>
                  ) : (
                    <td>{user.phone}</td>
                  )}
                  {editingUser && editingUser.id === user.id ? (
                    <td>
                      <input
                        type="text"
                        value={editingUser.gender}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            gender: e.target.value,
                          })
                        }
                      />
                    </td>
                  ) : (
                    <td>{user.gender}</td>
                  )}
                  {editingUser && editingUser.id === user.id ? (
                    <td>
                      <input
                        type="text"
                        value={editingUser.course}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            course: e.target.value,
                          })
                        }
                      />
                    </td>
                  ) : (
                    <td>{user.course}</td>
                  )}
                  <td className="d-flex justify-content-center align-items-center">
                    {editingUser && editingUser.id === user.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(user.id)}
                          className="btn btn-success btn-sm mx-2"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="btn btn-secondary btn-sm"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-warning btn-sm mx-2 shadow"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-danger btn-sm shadow"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-danger">
            No users found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewHistory;
