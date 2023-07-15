import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { products } from "../../Products";
import WishlistItems from "./WishlistItems";
import { Grid } from "@mui/material";

const Wishlist = () => {
  const { wishlist, wishlistAmount } = useContext(ShopContext);

  const { initial } = wishlistAmount()


  return (
    <>
      <br />
      {initial > 0 ? (
        <ul>
          <li>
            <div>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                gap={1}
                direction={"column"}
              >
                {products.map((product) => {
                  if (wishlist[product.id] !== 0) {
                    return <WishlistItems data={product} key={product.id} />;
                  } else {
                    return null;
                  }
                })}
              </Grid>
            </div>
          </li>
        </ul>
      ) : (
        <h1>Your wishlist is empty</h1>
      )}
    </>
  );
};

export default Wishlist;
