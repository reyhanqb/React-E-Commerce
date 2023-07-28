import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {URL} from "../../api/url"

const Registration = () => {
  const nav = useNavigate()

  const [error, setError] = useState(false)
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    pwd: ""
  })

  const handleInputChange = (e) => {
    let {value, name} = e.target;
    setCredentials({
      ...credentials, 
      [name]: value
    })
  }

  const registerUser = async () => {
    console.log(credentials)
    const res = await URL.post("/register", credentials)
    if(res.status === 200){
      nav("/login")
    } else {
      setError(true)
    }
  }

  return (
    <>
      <label htmlFor="">Email</label>
      <input type="email" name="email" onChange={handleInputChange} />
      <label htmlFor="">Username</label>
      <input type="text" name="username" onChange={handleInputChange} />
      <label htmlFor="">Password</label>
      <input type="password" name="pwd" onChange={handleInputChange} />
      <button onClick={registerUser}>register</button>
    </>
  );
}

export default Registration