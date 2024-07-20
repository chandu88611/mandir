import PublicHeader from "@/components/PublicHeader";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
};

export default layout;
