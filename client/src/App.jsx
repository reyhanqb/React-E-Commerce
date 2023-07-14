import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carts from "./pages/cart/Carts";
import Shop from "./pages/shop/Shop";
import ShopContextProvider from "./context/shop-context";
import Checkout from "./pages/shop/Checkout";
import Wishlist from "./pages/cart/Wishlist";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <div className="App">
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="cart" element={<Carts />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="admin/login" element={<AdminLogin />} />
              {/* admin only */}
              <Route element={<PrivateRoutes />}>
                <Route
                  path="admin/dashboard"
                  element={<AdminDashboard />}
                  exact
                />
              </Route>
            </Routes>
          </Router>
        </ShopContextProvider>
      </div>
    </>
  );
}

export default App;
