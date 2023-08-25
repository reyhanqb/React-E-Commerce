import React, { useEffect, useState } from 'react'
import { URL } from '../api/url'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AdminRoutes = () => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        authenticate()
    }, [authenticated])

    const authenticate = async () => {
        try {
         setLoading(true);
         const res = await URL.get("/auth/admin/sessions");
         if (res.data.status === 200) {
           setAuthenticated(true);
           setLoading(false);
         }
         console.log(res.data);   
        } catch (error) {
            console.log(error)
            setAuthenticated(false)
            nav("/");
        } finally {
            setLoading(false)
        }
    }

    if(loading){
        return <><p>Loading...</p></>
    }


  return (
    <>
        {authenticated ? <Outlet/> : <Navigate to={"/"} replace={true}/>}
    </>
  )
}

export default AdminRoutes