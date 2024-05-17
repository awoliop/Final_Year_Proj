"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";
import logo from "./logo.png";

const Navbar = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  return (
    <div className="navbar">
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
