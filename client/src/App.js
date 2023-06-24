import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carts from "./pages/cart/Carts";
import Shop from "./pages/shop/Shop";
import ShopContextProvider from "./context/shop-context";
import CartItems from "./pages/cart/CartItems";
import Checkout from "./pages/shop/Checkout";
import Wishlist from "./pages/cart/Wishlist";
import Login from "./pages/admin/Login"
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="cart" element={<Carts />} />
            <Route path="items" element={<CartItems />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="admin/login" element={<Login />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
