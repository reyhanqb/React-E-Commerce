import React, { useEffect, useState } from "react";
import { URL } from "../../api/url";
import { useNavigate, Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactionDetails();
  }, [loading]);

  const nav = useNavigate();

  const x = async () => {
    await URL.post("/auth/logout");
    localStorage.clear();
    nav("/login");
  };

  const getTransactionDetails = async () => {
    let username = localStorage.getItem("user");
    let email = localStorage.getItem("email");

    setUsers({
      name: username,
      email: email,
    });
    setLoading(false);

    try {
      const res = await URL.post("/orders/current", { username: users.name });
      const items = res.data.map((item) => ({
        ...item,
        date_created: new Date(item.date_created).toLocaleString("en-US", {
          timeZone: "Asia/Jakarta",
        }),
      }));
      setOrders(items);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <p>Active orders</p>
      {orders.map((o) => {
        return (
          <>
            <div key={o.order_id}>
              <h5>Details</h5>
              <p>{o.details}</p>
              <h5>Total</h5>
              <p>{o.total}</p>
              <h5>Date created</h5>
              <p>{o.date_created}</p>
              <h5>Status</h5>
              {o.date_finished === null ? (
                <>
                  <Link to={`/payments/${o.payment_token}`} state={{orders: orders}}>
                    Pending
                  </Link>
                </>
              ) : (
                <>Completed</>
              )}
            </div>
          </>
        );
      })}
      <button onClick={x}>Log out</button>
    </>
  );
};

export default Orders;
