import { redirect } from "next/navigation";
import React from "react";

const AdminHome = () => {
  return redirect("/admin/campaigns");
};

export default AdminHome;
