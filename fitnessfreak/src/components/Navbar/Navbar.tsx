"use client";
import React from "react";
import "./Navbar.css";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoIosBody } from "react-icons/io";
import AuthPopup from "../AuthPopup/AuthPopup";

const NavBar = () => {
  const [isloggedin, setIsloggedin] = React.useState<boolean>(false);

  const [showpopup, setShowpopup] = React.useState<boolean>(false);
  return (
    <nav>
      <Image src={logo} alt="logo" />
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/profile">
        <IoIosBody />
      </Link>
      {isloggedin ? (
        <button>LogOut</button>
      ) : (
        <button
          onClick={() => {
            setShowpopup(true);
          }}
        >
          Login
        </button>
      )}
      {showpopup && <AuthPopup setShowpopup={setShowpopup} />}
    </nav>
  );
};

export default NavBar;
