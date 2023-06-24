import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="link">
          <Link to="/">Shop</Link>
          <Link to="/cart">Carts</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
