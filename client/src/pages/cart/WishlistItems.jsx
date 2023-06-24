import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

const WishlistItems = (props) => {
  const { id, name, price } = props.data;
  const { removeWishlist } = useContext(ShopContext);
  return(
    <div>
        <ul key={id}>
            <li>
                <h3>{name}</h3>
                <p>{price}</p>
            </li>
        </ul>
        <button onClick={() => {removeWishlist(id)}}>Remove from wishlist</button>
    </div>
  ) 
  ;
};

export default WishlistItems;
