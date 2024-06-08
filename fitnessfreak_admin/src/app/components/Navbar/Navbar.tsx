"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";
import logo from "./logo.png";

const Navbar = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const checkAdminAuthenticated = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
      setIsAdminAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAdminAuthenticated();
  }, []);
  return (
    <div className="navbar-admin">
      <Image src={logo} alt="logo" width={100} className="logo" />
      <div className="admnlinks">
        {isAdminAuthenticated ? (
          <>
            <Link href="/pages/addworkout">Add Workout</Link>
          </>
        ) : (
          <>
            {/* {show this pages when user not authenticated!!} */}
            <Link href="/adminauth/login">Login</Link>
            <Link href="/adminauth/register">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
