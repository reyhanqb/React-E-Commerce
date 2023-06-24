import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { products } from "../../Products";
import WishlistItems from "./WishlistItems";

const Wishlist = () => {
  const { wishlist, wishlistAmount } = useContext(ShopContext);

  const { initial } = wishlistAmount()


  return (
    <>
        {
            initial > 0 ? (
      <ul>
        <li>
          <div>
            {products.map((product) => {
              if (wishlist[product.id] !== 0) {
                return <WishlistItems data={product} key={product.id} />;
              } else {
                return null;
              }
            })}
          </div>
        </li>
      </ul>
            ) : (
                <h1>Your wishlist is empty</h1>
            )
        }
    </>
  );
};

export default Wishlist;
