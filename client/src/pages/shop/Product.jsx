import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

const Product = (props) => {
  const { id, name, price } = props.data;
  const { addItems, removeItems, cartItems, addWishlist} =
    useContext(ShopContext);

  const cartItemAmount = cartItems[id];

  return (
    <>
      <ul>
        <li key={id}>
          <h3>{name}</h3>
          <p>{price}</p>
          <button
            onClick={() => {
              addItems(id);
            }}
          >
            Add to cart
          </button>
          {cartItemAmount > 0 && <>{cartItemAmount}</>}
          <button
            onClick={() => {
              removeItems(id);
            }}
          >
            Remove from cart
          </button>
          <button onClick={() => addWishlist(id)}>Add to wishlist</button>
        </li>
      </ul>
    </>
  );
};

export default Product;
