"use client";
import React from "react";
import "./Navbar.css";
import logo from "@/assets/fit1.png";
import Image from "next/image";
import Link from "next/link";
import { IoIosBody } from "react-icons/io";
import AuthPopup from "../AuthPopup/AuthPopup";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

const NavBar = () => {
  // const router = useRouter();

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

  const checkAuthentication = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: "POST",
      credentials: "include", // Include cookies in the request
    });
    const data = await response.json();
    return data.ok;
  };

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const isAuthenticated = await checkAuthentication();
    if (isAuthenticated) {
      window.location.href = href;
      setShowpopup(false);
    } else {
      // window.location.href = "/AuthPopup";
      setShowpopup(true);
    }
  };

  React.useEffect(() => {
    checklogin();
  }, [showpopup]);

  return (
    // <AuthDataProvider>
    <nav>
      <Link href="/">
        <Image src={logo} alt="logo" height={100} width={100} />
      </Link>

      <Link href="/" onClick={(e) => handleLinkClick(e, "/")}>
        Home
      </Link>
      <Link href="/nutrition" onClick={(e) => handleLinkClick(e, "/nutrition")}>
        Nutrition
      </Link>
      <Link href="/ai-assistance" onClick={(e) => handleLinkClick(e, "/ai-assistance")}>
        Assist
      </Link>
      <Link href="/workouts" onClick={(e) => handleLinkClick(e, "/workouts")}>
        Workouts
      </Link>
      <Link href="/routines" onClick={(e) => handleLinkClick(e, "/routines")}>
        Routines
      </Link>
      <Link href="/chat" onClick={(e) => handleLinkClick(e, "/chat")}>
        Community
      </Link>
      <Link href="/about" onClick={(e) => handleLinkClick(e, "/about")}>
        About Us
      </Link>

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
