import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

//Context
import { UserProvider } from "./context/userContext.js";
//Layout
import Layout from "./Layout.js";
//main page
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/BLog";
import BLogElement from "./pages/BLogElement.js";
import About from "./pages/About";
import Account from "./pages/Account";
//footerpage
import PrivacyPolicy from "./pages/TermofService.js";
import Contact from "./pages/Contact.js";
//404 page
import NotFound from "./pages/Notfound";
//account
import Dashboard from "./components/account/Dashboard";
import Orders from "./components/account/Orders";
import OrdersElement from "./components/account/OrdersElement";
import Downloads from "./components/account/Downloads";
import Addresses from "./components/account/Addresses";
import Accountdetails from "./components/account/Accountdetails";
//Auth page
import Auth from "./pages/authenication/Authecation.js";
import Login from "./pages/authenication/Login.js";
import Register from "./pages/authenication/Register.jsx";
import ForgetPassword from "./pages/authenication/ForgetPassword.js";
//main page product
import Product from "./pages/Product.js";
//product
import AddInformation from "./components/product/AddInformation.js";
import Description from "./components/product/Description.js";
import Review from "./components/product/Review.js";
//Cart
import ShoppingCart from "./pages/ShoppingCart.js";
//checkcount
import CheckOutPage from "./pages/Checkoutpage.js";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Mỗi lần URL thay đổi thì cuộn về đầu

  return null;
}
function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Product />}>
              <Route index element={<Navigate to="description" replace />} />
              <Route path="description" element={<Description />} />
              <Route path="addInformation" element={<AddInformation />} />
              <Route path="review" element={<Review />} />
            </Route>
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BLogElement />}></Route>
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<OrdersElement />} />
              <Route path="downloads" element={<Downloads />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="accountdetails" element={<Accountdetails />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />}>
              <Route index element={<Navigate to="login" replace />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/forgerpassword" element={<ForgetPassword />}></Route>
            <Route path="/terms" element={<PrivacyPolicy />}></Route>
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<CheckOutPage />}></Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
