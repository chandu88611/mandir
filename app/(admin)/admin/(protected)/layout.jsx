import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import AdminProvider from "@/providers/AdminProvider";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <AdminProvider>
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-scroll pt-16 px-5">{children}</div>
        </div>
      </AdminProvider>
    </div>
  );
};

export default Layout;
