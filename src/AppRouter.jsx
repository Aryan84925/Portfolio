import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./User/Page/Home/Home.jsx";
import Login from "./User/Page/Login/Login.jsx";
import AdminDashbord from "./Admin/AdminDashbord/AdminDashbord.jsx";
import Admin from "./Admin/Admin.jsx";
import AdminProducts from "./Admin/AdminProducts/AdminProducts.jsx";
import AdminUsers from "./Admin/AdminUsers/AdminUsers.jsx";
import AdminSetting from "./Admin/AdminSetting/AdminSetting.jsx";
import AdminAnalytics from "./Admin/AdminAnalytics/AdminAnalytics.jsx";
import AdminOrders from "./Admin/AdminOrders/AdminOrders.jsx";

export default function AppRouter({ isAdmin }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/login" replace />}>
        <Route index element={<AdminDashbord />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/settings" element={<AdminSetting />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
