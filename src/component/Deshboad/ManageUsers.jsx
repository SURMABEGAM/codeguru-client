import React, { useEffect, useState } from "react";
import axiosPublic from "../../hooks/AxiosPublic";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosPublic.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);
  const handleRoleChange = (id, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Make this user ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/users/role/${id}`, { role }).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Role updated successfully", "success");

            // UI update
            setUsers((prev) =>
              prev.map((u) => (u._id === id ? { ...u, role } : u))
            );
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "student"}</td>

                <td className="flex gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(user._id, "admin")}
                      className="btn btn-xs btn-success"
                    >
                      Make Admin
                    </button>
                  )}

                  {user.role !== "instructor" && (
                    <button
                      onClick={() => handleRoleChange(user._id, "instructor")}
                      className="btn btn-xs btn-info"
                    >
                      Make Instructor
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
