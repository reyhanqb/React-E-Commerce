import React, { useEffect, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
import CartItems from "../cart/CartItems";
import { products } from "../../Products";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { URL } from "../../api/url";

const Checkout = () => {
  const { cartItems, totalCartAmount, checkTimestamp } =
    useContext(ShopContext);

  const total = totalCartAmount();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  let today = checkTimestamp();

  const validationCheck = () => {
    let isValid = false;
    if (
      !orders.address ||
      !orders.email ||
      !orders.nama ||
      !orders.city ||
      !orders.zipcode ||
      !orders.province
    ) {
      isValid = true;
    } else {
      isValid = false;
    }

    return isValid;
  };

  let user_email = localStorage.getItem("email");
  let user = localStorage.getItem("user");

  const [orders, setCustomerOrders] = useState({
    nama: user,
    email: user_email,
    details: "",
    address: "",
    city: "",
    province: "",
    zipcode: "",
    total: total,
    createdAt: today,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerOrders((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (total < 1) {
      console.log("your cart is empty.");
      return;
    }

    let v = validationCheck();
    console.log(v);
    if (v === true) {
      console.log("x");
      console.log(orders);
      return;
    }
    try {
      const cartOrder = Object.entries(cartItems)
        .filter(([id, quantity]) => quantity > 0)
        .map(([id, quantity]) => `${id}(${quantity})`)
        .join(", ");
      const res = await URL.post("/create-orders", {
        nama: user,
        address: orders.address,
        total: total,
        details: cartOrder,
        city: orders.city,
        province: orders.province,
        zipcode: orders.zipcode,
        email: user_email,
        createdAt: orders.createdAt,
      });
      console.log(res);
      setIsOrderPlaced(true);
      localStorage.setItem("token", token);
      nav("/paywall");
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {isOrderPlaced ? (
        <p>Terima kasih!</p>
      ) : (
        <div>
          <Grid
            container
            justifyContent="center"
            gap={2}
            direction={"column"}
            flex={"column"}
            alignItems={"center"}
          >
            <div className="item-list">
              {products.map((product) => {
                if (cartItems[product.id] !== 0) {
                  return <CartItems data={product} key={product.id} />;
                } else {
                  return null;
                }
              })}
            </div>
            {total === 0 ? (
              <>
                <p>Your cart is empty</p>
              </>
            ) : (
              <>
                <Grid
                  sx={{ display: "flex", textAlign: "center" }}
                  gap={2}
                  direction={"column"}
                  maxWidth={"450px"}
                  justifycontent="center"
                  alignItems={"center"}
                >
                  <TextField
                    label="Address"
                    type="text"
                    name="address"
                    value={orders.address}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Province"
                    type="text"
                    name="province"
                    value={orders.province}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="City"
                    type="text"
                    name="city"
                    value={orders.city}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    label="Zip code"
                    type="text"
                    name="zipcode"
                    value={orders.zipcode}
                    onChange={handleChange}
                    required
                  />
                  <Typography>Total : Rp{total}</Typography>
                  <br />
                  <Button onClick={handleSubmit} variant="outlined">
                    Order
                  </Button>
                </Grid>
                <br />
              </>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

export default Checkout;
