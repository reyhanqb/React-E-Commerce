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
import Registration from "./pages/user/Registration";
import UserLogin from "./pages/user/UserLogin";
import Homepage from "./pages/shop/Homepage"

function App() {
  return (
    <>
      <div className="App">
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<Registration />} />
              <Route path="admin/login" element={<AdminLogin />} />
              {/* protected routes */}
              <Route element={<PrivateRoutes />}>
                <Route
                  path="admin/dashboard"
                  element={<AdminDashboard />}
                  exact
                />
                <Route path="/shop" element={<Shop />} />
                <Route path="cart" element={<Carts />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="wishlist" element={<Wishlist />} />
              </Route>
            </Routes>
          </Router>
        </ShopContextProvider>
      </div>
    </>
  );
}

export default App;
