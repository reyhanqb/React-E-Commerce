import React, { createContext, useState } from "react";
import { products } from "../Products";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const getDefaultCart = (products) => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const getWishlist = (products) => {
    let wishlist = {};
    for (let i = 1; i < products.length + 1; i++) {
      wishlist[i] = 0;
    }
    return wishlist;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart(products));
  const [wishlist, setWishlist] = useState(getWishlist(products));
  

  const totalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let product = products.find((product) => product.id === Number(item));
        total += cartItems[item] * product.price;
      }
    }
    return total;
  };

  const wishlistAmount = () => {
    let initial = 0;
    for (const item in wishlist) {
      if (wishlist[item] > 0) {
        initial += wishlist[item];
      }
    }
    return { initial };
  };

  const addItems = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    localStorage.setItem("cart", JSON.stringify(cartItems))
  };

  const removeItems = (id) => {
    if(totalCartAmount != 0){
      setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
  };

  const updateCartItems = (value, id) => {
    setCartItems((prev) => ({ ...prev, [id]: value }));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const addWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: 1 }));
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  };

  const removeWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: 0 }));
  };

  const contextValue = {
    cartItems,
    addItems,
    removeItems,
    updateCartItems,
    totalCartAmount,
    addWishlist,
    wishlist,
    wishlistAmount,
    removeWishlist,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
