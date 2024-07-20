"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminProvider({ children }) {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("auth");
    console.log("firstName", isLoggedIn);
    if (!isLoggedIn) {
      router.push("/admin/login");
    }

    return () => {};
  }, [router]);

  return <div>{children}</div>;
}
