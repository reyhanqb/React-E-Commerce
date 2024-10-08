import { URL } from "../../api/url";
import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";


const AdminDashboard = () => {
  const { checkTimestamp } = useContext(ShopContext);

  const [currentOrders, setCurrentOrders] = useState([]);

  const nav = useNavigate();
  

  useEffect(() => {
    fetchCurrentOrders();
  }, []);

  const a = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  const fetchCurrentOrders = async () => {
    await URL.get("/admin/orders", {})
      .then((response) => {
        const items = response.data.map((item) => ({
          ...item,
          date_created: new Date(item.date_created).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
          }),
          date_finished:
            item.date_finished === null
              ? "-"
              : new Date(item.date_finished).toLocaleString("en-US", {
                  timeZone: "Asia/Jakarta",
                }),
        }));
        setCurrentOrders(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateStatus = async (id) => {
    let today = checkTimestamp();
    await URL.put(`/admin/complete-orders/${id}`, {
      id: id,
      date_finished: today,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

const getPaymentStatus = async (token) => {
  try {
    const response = await URL.post(`/admin/payment-details/:${token}`, {
      params: token 
    });
    console.log(response.data)
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <p>Dashboard</p>
      <div>
        <>
          <div>
            <table className="tg">
              <thead>
                <tr>
                  <th className="tg-0lax">ID</th>
                  <th className="tg-0lax">Name</th>
                  <th className="tg-0lax">Email</th>
                  <th className="tg-0lax">Address</th>
                  <th className="tg-0lax">Order (id, quantity)</th>
                  <th className="tg-0lax">Name</th>
                  <th className="tg-0lax">Province</th>
                  <th className="tg-0lax">City</th>
                  <th className="tg-0lax">Date created</th>
                  <th className="tg-0lax">Date finished</th>
                  <th className="tg-0lax">Payment detail</th>
                  <th className="tg-0lax">Update status</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((p) => (
                  <>
                    <tr key={p.order_id}>
                      <td className="tg-0lax">{p.order_id}</td>
                      <td className="tg-0lax">{p.name}</td>
                      <td className="tg-0lax">{p.email}</td>
                      <td className="tg-0lax">{p.address}</td>
                      <td className="tg-0lax">{p.details}</td>
                      <td className="tg-0lax">{p.province}</td>
                      <td className="tg-0lax">{p.city}</td>
                      <td className="tg-0lax">{p.zipcode}</td>
                      <td className="tg-0lax">{p.date_created}</td>
                      <td className="tg-0lax">{p.date_finished}</td>
                      <td className="tg-0lax">
                        {p.date_finished === "-" ? (
                          <>
                            <button
                              onClick={() => {
                                updateStatus(p.order_id);
                              }}
                            >
                              Complete
                            </button>
                          </>
                        ) : (
                          <>
                            <button disabled>Completed</button>
                          </>
                        )}
                      </td>
                      <td className="tg-0lax">{<Link to={`/admin/details/${p.payment_token}`} state={{currentOrders: currentOrders}}>Check status</Link>}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={a}>logout</button>
        </>
      </div>
    </>
  );
};

export default AdminDashboard;
