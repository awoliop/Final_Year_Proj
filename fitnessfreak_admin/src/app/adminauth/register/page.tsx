"use client";
import React, { useState } from "react";
import "../auth.css";
import { ToastContainer, toast } from "react-toastify";

const singupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.ok) {
        console.log("Admin Registered Succesfully", data);
        toast.success("Admin Registerd SuccessFUlly", {
          position: "top-center",
        });
        window.location.href = "/adminauth/login";
      } else {
        console.error("Admin registration failed", response.statusText);
        toast.error("Admin registration failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("An Error occured during registration!", {
        position: "top-center",
      });
      console.error("An Error occured during registration !");
    }
  };
  return (
    <div className="formpage">
      <div className="authPopup">
        <p className="title">Administrator Signup</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          <button onClick={handleSignup}>Sign Up</button>
          <button
            onClick={() => {
              window.location.href = "/adminauth/login";
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default singupPage;
