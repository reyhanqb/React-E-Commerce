import React, { useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
import CartItems from "../cart/CartItems";
import { products } from "../../Products";
import axios from "axios";

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
var hour = today.getHours();
var minute = today.getMinutes();
var second = today.getSeconds();

if (mm.toString().length === 1) {
  mm = "0" + mm;
}
if (dd.toString().length === 1) {
  dd = "0" + dd;
}
if (hour.toString().length === 1) {
  hour = "0" + hour;
}
if (minute.toString().length === 1) {
  minute = "0" + minute;
}
if (second.toString().length == 1) {
  second = "0" + second;
}  

today = yyyy + "/" + dd + "/" + mm + " " + hour + ":" + minute + ":" + second;



let defaultOrders = {
  nama: "",
  alamat: "",
  total: "",
  order: "",
  email: "",
  createdAt: today,
};

const Checkout = () => {
  const { cartItems, totalCartAmount } = useContext(ShopContext);

  const total = totalCartAmount();

  const [orders, setCustomerOrders] = useState(defaultOrders);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerOrders((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if(total > 0){
      try {
        const cartOrder = Object.entries(cartItems)
          .filter(([id, quantity]) => quantity > 0)
          .map(([id, quantity]) => `${id}(${quantity})`)
          .join(", ");
        await axios.post("http://localhost:3001/create-orders", {
          nama: orders.nama,
          alamat: orders.alamat,
          total: total,
          order: cartOrder,
          email: orders.email,
          createdAt: orders.createdAt
        });
        setIsOrderPlaced(true);
      } catch (error) {
        throw error;
      }
    } else {
      console.log("Your cart is empty")
    }
  };

  

  return (
    <>
      <p>Checkout</p>
      <div>
        <div className="item-list">
          {products.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItems data={product} key={product.id} />;
            } else {
              return null;
            }
          })}
        </div>
        <br />
        {total === 0 ? (
          <>
            <p>Your cart is empty</p>
          </>
        ) : (
          <>
            <form action="" method="post" onSubmit={handleSubmit}>
              <label htmlFor="">Nama</label>
              <br />
              <input
                type="text"
                name="nama"
                value={orders.nama}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="">Email</label>
              <br />
              <input
                type="email"
                name="email"
                value={orders.email}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="">Alamat</label>
              <br />
              <input
                type="text"
                name="alamat"
                value={orders.alamat}
                onChange={handleChange}
              />
              <br />
              <p name="total" value={orders.total}>
                Total : Rp{total}
              </p>
              <button onClick={handleSubmit}>Order</button>
            </form>
          </>
        )}
      </div>
      {isOrderPlaced ? <p>Terima kasih!</p> : null}
    </>
  );
};

export default Checkout;
