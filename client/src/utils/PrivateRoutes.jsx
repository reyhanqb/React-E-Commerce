import React from 'react'
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes = () => {
    let authenticated;
    if(localStorage.getItem("token") == null){
      authenticated = false
    } else {
      authenticated = true
    }

  return (
    <> 
    {authenticated === true ? <Outlet/> : <Navigate to={"/"}/>}
    </>
  )
}

export default PrivateRoutes