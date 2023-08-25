import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const PaymentDetails = () => {
  const [unavailable, setUnavailable] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [base64Image, setBase64Image] = useState("");

  const params = useParams();
  let { id } = params;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `http://localhost:3001/admin/payment-details/${id}`,
          {
            id: id,
          }
        );

        let data = res.data;

        if (!data) {
          console.log("payment is not complete");
          setUnavailable(true);
        }

        setPayments(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [id]);

  const getPaymentImg = async () => {
    try {
      setShowImage(true);
      const res = await axios.post(
        `http://localhost:3001/admin/payment-details/img/${id}`,
        { id: id }
      );
      const base64Image = res.data.image;
      setBase64Image(base64Image);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      {unavailable ? (
        <p>
          Payment for this order is not yet complete.{" "}
          <Link to={"/admin/dashboard"}>
            <span>
              <i>Return</i>
            </span>
          </Link>
        </p>
      ) : (
        <>
          {payments.map((p) => (
            <div key={p.payment_id}>
              <p>{p.payment_method}</p>
              <p>{p.payment_token}</p>
              <p>{p.account_number}</p>
              <p>{p.payment_proof}</p>
              <button onClick={getPaymentImg}>Show Image</button>
              {showImage ? (
                <>
                  <img
                    src={`data:image/png;base64,${base64Image}`}
                    alt="Decoded Image"
                  />
                </>
              ) : null}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PaymentDetails;
