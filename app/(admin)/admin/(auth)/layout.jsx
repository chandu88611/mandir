import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-[100vh] flex w-full justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
