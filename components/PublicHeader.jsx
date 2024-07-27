"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import LoginModel from "./LoginModel";
import { HiUserCircle, HiOutlineLogout } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { FiUser } from 'react-icons/fi'; // Example icons
import FormModal from "./AddCampaignForm";
import axios from 'axios';

const PublicHeader = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleOpen = () => setOpen1(true);
  const handleClose = () => setOpen1(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('https://temple-donation.onrender.com/api/users/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('authToken');
      // Redirect or update state to reflect logout
      setIsOpen(false); // Close the dropdown menu
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className=" lg:block">
          <Link href={"/"}>
            <img
              src="/logo.png"
              alt="logo"
              priority
              className="object-contain w-[120px] md:w-[180px]"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleOpen} className=" w-full text-[12px] bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 hover:via-brown-500 text-white font-bold py-1 px-2 rounded-full">
            Start Campaign
          </button>
          {localStorage?.getItem("authToken") ? (
            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={toggleDropdown}
              >
                <HiUserCircle className="h-6 w-6 mr-1" />
                <IoIosArrowDown className="h-4 w-4" />
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <FiUser className="inline-block h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    <HiOutlineLogout className="inline-block h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className=" text-[12px] bg-gradient-to-r from-blue-800 via-red-500 to-yellow-500 hover:via-brown-500 text-white font-bold py-1 px-4 rounded-full" onClick={() => setOpen(true)}>
              Login
            </button>
          )}
        </div>
      </nav>
      <LoginModel open={open} onClose={() => setOpen(false)} />
      <FormModal open={open1} onClose={handleClose} />
    </div>
  );
};

export default PublicHeader;
