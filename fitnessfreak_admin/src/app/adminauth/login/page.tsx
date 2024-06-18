"use client";
import React, { useState } from "react";
import "../auth.css";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (data.ok) {
        console.log("Admin logged in Succesfully", data);
        toast.success("Admin Logged in SuccessFUlly", {
          position: "top-center",
          style: {
            backgroundColor: "white",
          },
        });
        window.location.href = "/admin";
      } else {
        console.error("Admin Login In failed", response.statusText);
        toast.error("Admin Login failed", {
          position: "top-center",
          style: {
            backgroundColor: "white",
          },
        });
      }
    } catch (error) {
      toast.error("An Error occured during registration!", {
        position: "top-center",
        style: {
          backgroundColor: "white",
        },
      });
      console.error("An Error occured during registration !");
    }
  };
  return (
    <div className="formpage">
      <div className="authPopup">
        <p
          className="title"
          style={{
            marginBottom: "20px",
          }}
        >
          Administrator Login
        </p>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="buttons">
          <button onClick={handleLogin}>Log In</button>
          <button
            onClick={() => {
              window.location.href = "/adminauth/register";
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
