import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../component/context/AuthContext";
import axiosPublic from "./AxiosPublic";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        try {
          const res = await axiosPublic.get(`/users/${encodeURIComponent(user.email)}`);
          setRole(res.data.role || "student");
        } catch (err) {
          console.error("Failed to fetch user role:", err);
          setRole("student"); 
        } finally {
          setRoleLoading(false);
        }
      } else {
        setRoleLoading(false);
      }
    };
    fetchRole();
  }, [user]);

  return { role, roleLoading };
};

export default useRole;
