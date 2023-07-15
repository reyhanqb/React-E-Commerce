import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";
import { products } from "../../Products";
import { Grid, Button } from "@mui/material";


const Carts = () => {
  const { cartItems, totalCartAmount} =
    useContext(ShopContext);

  const total = totalCartAmount();

  const navigate = useNavigate();


  return (
    <>
      <div className="cart">
        <br />
        <div className="item-list">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            gap={1}
            direction={"column"}
          >
            {products.map((product) => {
              if (cartItems[product.id] !== 0) {
                {
                  return <CartItems data={product} />;
                }
              }
              return null;
            })}
          </Grid>
        </div>
        <br />
        {total !== 0 ? (
          <div className="checkout">
            <Grid container gap={3} justifyContent={"center"}>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant="outlined"
              >
                Continue shopping
              </Button>
              <Button
                onClick={() => {
                  navigate("/checkout");
                }}
                variant="outlined"
              >
                Checkout
              </Button>
            </Grid>
            <br />
            <p>Total : {total}</p>
          </div>
        ) : (
          <h1>Your cart is empty</h1>
        )}
      </div>
    </>
  );
};

export default Carts;
