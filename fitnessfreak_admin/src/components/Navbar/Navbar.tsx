"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";
import logo from "./logo.png";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const checkAdminAuthenticated = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
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
  const handleLogout = () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/admin/logout", {
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
          setIsAdminAuthenticated(false);
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

  useEffect(() => {
    checkAdminAuthenticated();
  }, []);
  return (
    <div className="navbar-admin">
      {/* <Image src={logo} alt="logo" width={100} className="logo" /> */}
      <div className="admnlinks">
        {isAdminAuthenticated ? (
          <>
            {/* <Link href="/pages/addworkout">Add Workout</Link> */}
            <button
              className="logout-button"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* {show this pages when user not authenticated!!} */}
            <button
              className="logout-button"
              onClick={() => {
                window.location.href = "/adminauth/login";
              }}
            >
              Login
            </button>
            <button
              className="logout-button"
              onClick={() => {
                window.location.href = "/adminauth/register";
              }}
            >
              Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
