import React, { useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
import CartItems from "../cart/CartItems";
import { products } from "../../Products";
import axios from "axios";
import { Grid, TextField, Button } from "@mui/material";

const Checkout = () => {
  const { cartItems, totalCartAmount, checkTimestamp } =
    useContext(ShopContext);

  const total = totalCartAmount();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  let today = checkTimestamp();

  const validationCheck = () => {
    let isValid = false;
    if (!orders.alamat || !orders.email || !orders.nama) {
      isValid = true;
    } else {
      isValid = false;
    }

    return isValid;
  };

  let defaultOrders = {
    nama: "",
    alamat: "",
    total: "",
    order: "",
    email: "",
    createdAt: today,
  };

  const [orders, setCustomerOrders] = useState(defaultOrders);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerOrders((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (total > 0) {
      let v = validationCheck();
      console.log(v);
      if (v === true) {
        console.log("x");
        return;
      }
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
          createdAt: orders.createdAt,
        });
        setIsOrderPlaced(true);
      } catch (error) {
        throw error;
      }
    } else {
      console.log("Your cart is empty");
    }
  };

  return (
    <>
      <p>Checkout</p>
      <div>
        <Grid container justifyContent="center">
          <div className="item-list">
            {products.map((product) => {
              if (cartItems[product.id] !== 0) {
                return <CartItems data={product} key={product.id} />;
              } else {
                return null;
              }
            })}
          </div>
        </Grid>
        <br />
        {total === 0 ? (
          <>
            <p>Your cart is empty</p>
          </>
        ) : (
          <>
            <form>
              <br />
              <TextField
                label="Nama"
                type="text"
                name="nama"
                value={orders.nama}
                onChange={handleChange}
                required
              />
              <br />

              <br />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={orders.email}
                onChange={handleChange}
                required
              />
              <br />

              <br />
              <TextField
                label="Alamat"
                type="text"
                name="alamat"
                value={orders.alamat}
                onChange={handleChange}
                required
              />
              <br />
              <br />
              <p name="total" value={orders.total}>
                Total : Rp{total}
              </p>
              <br />
              <Button onClick={handleSubmit} variant="outlined">
                Order
              </Button>
            </form>
          </>
        )}
      </div>
      {isOrderPlaced ? <p>Terima kasih!</p> : null}
    </>
  );
};

export default Checkout;
