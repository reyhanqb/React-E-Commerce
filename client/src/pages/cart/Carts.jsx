import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";
import { products } from "../../Products";

const Carts = () => {
  const { cartItems, totalCartAmount} =
    useContext(ShopContext);

  const total = totalCartAmount();

  const navigate = useNavigate();


  return (
    <div className="cart">
      <div>
        <p>Cart</p>
      </div>
      <div className="item-list">
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            {
              return <CartItems data={product} />;
            }
          }
          return null;
        })}
      </div>
      {total !== 0 ? (
        <div className="checkout">
          <p>Total : {total}</p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Continue shopping
          </button>
          <button
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </div>
  );
};

export default Carts;
