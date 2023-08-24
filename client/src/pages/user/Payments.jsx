import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { URL } from '../../api/url'
import Paywall from "../shop/Paywall"

const Payments = () => {
    const [details, setDetails] = useState([])

    const { id } = useParams()

    console.log(id)

    localStorage.setItem("token", id)

    useEffect(() => {
        URL.post(`/payment/details/${id}`, {id: id})
    }, [])

  return (
    <>
    <p>hello</p>
    <Paywall/>
    </>
  )
}

export default Payments