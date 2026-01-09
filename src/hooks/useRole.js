import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../component/context/AuthContext';

const useRole = () => {
 const { user } = useContext(AuthContext);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      if (user?.email) {
      fetch(`http://localhost:3000/users/role/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data.role);
          setLoading(false);
        });
    }
  },[]);



    return (
 { role, loading }
    );
};

export default useRole;