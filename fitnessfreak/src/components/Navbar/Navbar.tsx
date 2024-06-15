"use client";
import React from "react";
import "./Navbar.css";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoIosBody } from "react-icons/io";
import AuthPopup from "../AuthPopup/AuthPopup";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

// import { AuthDataProvider } from "../../hooks/AuthDataContext";

const NavBar = () => {
  const [loginformData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
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

  // function deleteSingleWordLocalStorageItems() {
  //   // Regular expression to match single words without special characters
  //   const regex = /^[a-zA-Z0-9]+$/;

  //   // Iterate over all keys in localStorage
  //   for (let i = 0; i < localStorage.length; i++) {
  //     // Check if the key matches the regex
  //     const key = localStorage.key(i);
  //     if (key != null) {
  //       if (regex.test(key)) {
  //         localStorage.removeItem(key);
  //         console.log(`Item with key "${key}" has been removed from localStorage.`);

  //         // Adjust index because the localStorage length is changed after removal
  //         i--;
  //       }
  //     }
  //   }
  // }

  // // Call the function to delete the specified localStorage items
  // deleteSingleWordLocalStorageItems();

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
    // <AuthDataProvider>
    <nav>
      <Link href="/">{/* <Image src={logo} alt="logo" /> */}</Link>

      <Link href="/">Home</Link>
      <Link href="/nutrition">Nutrition</Link>
      <Link href="/ai-assistance">Assist</Link>
      <Link href="/workouts">Workouts</Link>
      <Link href="/routines">Routines</Link>
      <Link href="/chat">Community</Link>
      <Link href="/about">About Us</Link>
      {/* <Link href="/profile">
        <IoIosBody />
      </Link> */}
      {isloggedin ? (
        <button
          className="login-button"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          LogOut
        </button>
      ) : (
        <button
          className="login-button"
          onClick={() => {
            setShowpopup(true);
          }}
        >
          Login
        </button>
      )}
      {showpopup && (
        <AuthPopup
          setShowpopup={setShowpopup}
          loginformData={loginformData}
          setLoginFormData={setLoginFormData}
        />
      )}
    </nav>
  );
};

export default NavBar;
