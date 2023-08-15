import "./App.css";
import "./css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carts from "./pages/cart/Carts";
import Shop from "./pages/shop/Shop";
import ShopContextProvider from "./context/shop-context";
import Checkout from "./pages/shop/Checkout";
import Wishlist from "./pages/cart/Wishlist";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateRoutes from "./auth/PrivateRoutes";
import Registration from "./pages/user/Registration";
import UserLogin from "./pages/user/UserLogin";
import Homepage from "./pages/shop/Homepage";
import Order from "./pages/shop/Order"
import SignIn from "./pages/shop/SignIn";

function App() {
  return (
    <>
      <div className="App">
        <ShopContextProvider>
          <Router>
            <Routes>
              <Route path="/order" element={<Order />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<Registration />} />
              <Route path="test" element={<SignIn/>}/>
                <Route
                  path="/shop"
                  element={
                    <>
                      <Navbar />
                      <Shop />
                    </>
                  }
                />
              {/* protected routes */}
              <Route element={<PrivateRoutes />}>
                <Route
                  path="cart"
                  element={
                    <>
                      <Navbar />
                      <Carts />
                    </>
                  }
                />
                <Route
                  path="checkout"
                  element={
                    <>
                      <Navbar />
                      <Checkout />
                    </>
                  }
                />
                <Route
                  path="wishlist"
                  element={
                    <>
                      <Navbar />
                      <Wishlist />
                    </>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <>
                      <Navbar />
                      <AdminDashboard />
                    </>
                  }
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
