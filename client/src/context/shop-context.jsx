import React, { createContext, useState } from "react";
import { products } from "../Products";
import { createTheme } from "@mui/material/styles";

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
    let x = totalCartAmount();
    if(x != 0){
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

  const checkTimestamp = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();

    if (mm.toString().length === 1) {
      mm = "0" + mm;
    }
    if (dd.toString().length === 1) {
      dd = "0" + dd;
    }
    if (hour.toString().length === 1) {
      hour = "0" + hour;
    }
    if (minute.toString().length === 1) {
      minute = "0" + minute;
    }
    if (second.toString().length == 1) {
      second = "0" + second;
    }

    today =
      yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minute + ":" + second;

    return today;
  };

  const theme = createTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  

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
    checkTimestamp,
    theme
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
