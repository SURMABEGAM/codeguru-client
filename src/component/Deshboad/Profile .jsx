import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useRole from "../../hooks/useRole";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const role = useRole();
  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex items-center gap-4">
        <img
          src={user?.photoURL}
          alt="profile"
          className="w-20 h-20 rounded-full border"
        />

        <div>
          <p className="font-semibold">{user?.displayName}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
