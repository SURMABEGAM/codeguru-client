import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useRole from "../../hooks/useRole";
import Loader from "../home/Loader";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { role, roleloading } = useRole();

  if (roleloading) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl bg-gradient-to-br from-indigo-50 to-indigo-600 mt-10 p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-indigo-700 mb-10">My Profile</h2>

      <div className="flex items-center gap-5">
        <img
          src={user?.photoURL}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-indigo-400 shadow-md"
        />

        <div>
          <p className="text-lg font-semibold text-slate-800">
            {user?.displayName}
          </p>

          <p className="text-sm text-slate-600">{user?.email}</p>

          <span className="inline-block mt-2 text-xs bg-indigo-200 text-indigo-700 px-3 py-1 rounded-full font-medium">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
