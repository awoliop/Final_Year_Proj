"use client";
import React from "react";
import "./Navbar.css";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoIosBody } from "react-icons/io";
import AuthPopup from "../AuthPopup/AuthPopup";
import { ToastContainer, toast } from "react-toastify";

const NavBar = () => {
  const [isloggedin, setIsloggedin] = React.useState<boolean>(false);

  const [showpopup, setShowpopup] = React.useState<boolean>(false);
  const checklogin = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/checklogin", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          setIsloggedin(true);
        } else {
          setIsloggedin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          // Clear local session or token
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");

          // Redirect the user to the login page or homepage
          window.location.href = "/"; // Replace '/login' with the desired redirect URL
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    checklogin();
  }, [showpopup]);

  return (
    <nav>
      <Link href="/">{/* <Image src={logo} alt="logo" /> */}</Link>

      <Link href="/">Home</Link>
      <Link href="/nutrition">Nutrition</Link>
      <Link href="/ai-assistance">Assist</Link>
      <Link href="/about">About</Link>
      <Link href="/workout">workouts</Link>
      {/* <Link href="/profile">
        <IoIosBody />
      </Link> */}
      {isloggedin ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          LogOut
        </button>
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
