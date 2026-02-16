import { Route, Routes } from "react-router-dom";
import Home from "./User/Page/Home/Home";
import Login from "./User/Page/Login/Login";
import Signup from "./User/Page/Login/Signup";
import Profile from "./User/Page/Profile/Profile";
import Orders from "./User/Page/Orders/Orders";
import Saved from "./User/Page/Saved/Saved";
import Settings from "./User/Page/Settings/Settings";
import HelpCenter from "./User/Page/HelpCenter/HelpCenter";
import Products from "./User/Page/Products/Products";
import ProductDetail from "./User/Page/ProductDetail/ProductDetail";
import Checkout from "./User/Page/Checkout/Checkout";
import OrderSuccess from "./User/Page/OrderSuccess/OrderSuccess";
import Payment from "./User/Page/Payment/Payment";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
    )
}
