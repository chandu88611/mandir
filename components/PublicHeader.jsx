"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import LoginModel from "./LoginModel";

const PublicHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className=" lg:block">
          <Link href={"/"}>
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              priority
              className="object-contain"
            />
          </Link>
        </div>
        {/* <div className={cn("block lg:!hidden")}>
        <MobileSidebar />
      </div> */}

        <div className="flex items-center gap-2">
          <Button variant="default" onClick={() => setOpen(true)}>
            Login
          </Button>
          {/* <ThemeToggle /> */}
        </div>
      </nav>
      <LoginModel open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default PublicHeader;
