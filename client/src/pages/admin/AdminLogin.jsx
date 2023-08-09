import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { URL } from "../../api/url";


const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    pwd: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);

  const nav = useNavigate();

  const adminLogin = async () => {
    try {
      const res = await URL.post("/auth/admin/login", credentials);
      if (res.data.status !== 200) {
        nav("/");
        console.log("p")
        // localStorage.setItem("adminToken", res.data.accessToken);
      } else {
        nav("/admin/dashboard")
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <br />
      <TextField
        label="Username"
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleInputChange}
      />
      <br />
      <br />
      <TextField
        label="Password"
        type="password"
        name="pwd"
        value={credentials.pwd}
        onChange={handleInputChange}
      />
      <br />
      <br />
      <Button variant="outlined" onClick={adminLogin}>
        Login
      </Button>
      <br />
      <br />
      {errorMsg ? (
        <>
          <p>Invalid credentials</p>
        </>
      ) : null}
      <p>You must be an admin to log in.</p>
    </>
  );
};

export default AdminLogin;
