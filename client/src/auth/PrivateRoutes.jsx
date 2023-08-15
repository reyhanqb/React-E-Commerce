import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { URL } from "../api/url";

const PrivateRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const sessionCheck = async () => {
      try {
        setLoading(true);
        const res = await URL.get("/auth/sessions");
        if (res.data.status === 200 || res.data.status === 201) {
          setAuthenticated(true);
          setLoading(false);
        } else {
          localStorage.clear();
          setAuthenticated(false);
          nav("/login");
        }
      } catch (error) {
        console.log(error);
        setAuthenticated(false);
        nav("/login");
      } finally {
        setLoading(false);
      }
    };

    sessionCheck();
  }, [authenticated]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {authenticated ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
};

export default PrivateRoutes;
