import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let authenticated;

  let userToken = localStorage.getItem("userToken");
  let adminToken = localStorage.getItem("token");

  if (userToken || adminToken) {
    authenticated = true;
  } else {
    authenticated = false;
  }

  console.log(userToken)

  return <>{authenticated === true ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default PrivateRoutes;
