import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import AdminProvider from "@/providers/AdminProvider";
import React from "react";

const Layout = ({ children }) => {
  return (
    <AdminProvider>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden pt-16 px-5">{children}</main>
      </div>
    </AdminProvider>
  );
};

export default Layout;
