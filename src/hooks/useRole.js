import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../component/context/AuthContext';
import axiosPublic from './AxiosPublic';

const useRole = () => {
 const { user } = useContext(AuthContext);
  const [role, setRole] = useState("guest");
  const [roleloading, setRoleLoading] = useState(true);

  useEffect(()=>{
      if (user?.email) {
         axiosPublic
      .get(`/users/role/${user.email}`)
       
        .then((res) => {
          setRole(res.data.role);
          setRoleLoading(false);
        });
    }
  },[user]);



    return (
 { role, roleloading }
    );
};

export default useRole;