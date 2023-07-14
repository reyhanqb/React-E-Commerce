import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    const nav = useNavigate()
    const logout = () => {
        localStorage.removeItem("userToken")
        nav("/login")
    }

  return (
    <>
      <p>This is the Homepage</p>
      <button onClick={logout}>logout</button>
    </>
  );
}

export default Homepage