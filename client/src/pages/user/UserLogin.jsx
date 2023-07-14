import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const nav = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (credentials.password && credentials.username !== null) {
      try {
        const res = await axios.post("http://localhost:3001/login", {
          username: credentials.username,
          pwd: credentials.password,
        });
        const userToken = res.data.userToken
        localStorage.setItem("userToken", userToken)
        nav("/")
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
      return error;
    }
  };

  return (
    <>
      <label htmlFor="">Username</label>
      <br />
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="">Password</label>
      <br />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleSubmit}>Login</button>
      <br />
      <p>Dont have an account? Register here</p>
      {error ? <>Invalid credentials.</> : null}
    </>
  );
};

export default UserLogin;
