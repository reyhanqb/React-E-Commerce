import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css"
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [currentOrders, setCurrentOrders] = useState([]);

  const nav = useNavigate()

  useEffect(() => {
    fetchCurrentOrders();
  }, []);

  const a = () => {
    localStorage.removeItem("token")
    nav("/")
  }

  const fetchCurrentOrders = async () => {
    await axios
      .get("http://localhost:3001/admin/orders", {})
      .then((response) => {
        let items = response.data;
        setCurrentOrders(items);
      })
      .catch((error) => {
        console.log(error);
      });
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
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((p) => (
                  <>
                  <tr>
                    <td className="tg-0lax">{p.id}</td>
                    <td className="tg-0lax">{p.name}</td>
                    <td className="tg-0lax">{p.email}</td>
                    <td className="tg-0lax">{p.address}</td>
                    <td className="tg-0lax">{p.orders}</td>
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
