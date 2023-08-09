import React, { useState } from "react";
import { URL } from "../../api/url";
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
        const res = await URL.post("/auth/user/login", credentials);
        console.log(res)
        if(res.data.status !== 200){
          nav("/")
        } else {
          let user = res.data.user
          localStorage.setItem("user", user.username);
          localStorage.setItem("email", user.email);
          nav("/shop")
        }
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
