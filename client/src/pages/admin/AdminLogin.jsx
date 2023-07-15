import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const api = axios.create({
  baseURL: "http://localhost:3001/admin",
});

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    pwd: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);

  const nav = useNavigate();

  const adminLogin = async () => {
    try {
      const res = await api.post("/login", credentials);
      if (res.data.status === 200 && res.data.accessToken !== null) {
        nav("/admin/dashboard");
        localStorage.setItem("token", res.data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
    setErrorMsg(true);
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
        type="text"
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
