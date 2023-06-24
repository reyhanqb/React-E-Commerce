import React, { useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
import CartItems from "../cart/CartItems";
import { products } from "../../Products";
import axios from "axios";

let defaultOrders = {
  nama: "",
  alamat: "",
  total: "",
  order: "",
  email: "",
};



const Checkout = () => {
  const { cartItems, totalCartAmount } = useContext(ShopContext);

  const total = totalCartAmount();

  const [orders, setCustomerOrders] = useState(defaultOrders);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    console.log(cartItems)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerOrders((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const cartOrder = Object.entries(cartItems)
        .filter(([id, quantity]) => quantity > 0)
        .map(([id, quantity]) => `${id}(${quantity})`)
        .join(", ");
      console.log(typeof(cartOrder))
      await axios.post("http://localhost:3001/create-orders", {
        nama: orders.nama,
        alamat: orders.alamat,
        total: total, 
        order: cartOrder,
        email: orders.email,
      });
      setIsOrderPlaced(true); 
    } catch (error) {
      throw error;
    } 
  };

  return (
    <>
      <p>Checkout</p>
      <div>
        <div className="item-list">
          {products.map((product) => {
            if (cartItems[product.id] !== 0) {
              {
                return <CartItems data={product} key={product.id}/>;
              }
            } else {
              return null;
            }
          })}
        </div>
        <br />
        <div></div>
      </div>
      {isOrderPlaced ? (
        <p>Terima kasih!</p>
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
          </form>
          <button onClick={handleSubmit}>Order</button>
        </>
      )}
    </>
  );
};

export default Checkout;
