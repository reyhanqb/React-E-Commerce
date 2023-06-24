import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

const CartItems = (props) => {
  let { id, name, price } = props.data;
  const { cartItems, addItems, removeItems, updateCartItems } =
    useContext(ShopContext);

  return (
    <div>
      <h3>{name}</h3>
      <p>{price}</p>
      <button
        onClick={() => {
          addItems(id);
        }}
      >
        +
      </button>
      <input
        value={cartItems[id]}
        onChange={(e) => {
          updateCartItems(Number(e.target.value));
        }}
      />
      <button
        onClick={() => {
          removeItems(id);
        }}
      >
        -
      </button>
    </div>
  );
};

export default CartItems;
