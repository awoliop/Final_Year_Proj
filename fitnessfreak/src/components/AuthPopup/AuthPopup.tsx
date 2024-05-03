"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import next from "next";
import Input from "@mui/joy/Input";
import "./AuthPopup.css";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";

interface AuthPopupProps {
  setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
  const [showSignup, setShowSignup] = React.useState<boolean>(false);
  const handleLogin = () => {};
  const handleSignUp = () => {};
  return (
    <div className="popup">
      <button
        className="close"
        onClick={() => {
          setShowpopup(false);
        }}
      >
        <AiOutlineClose />
      </button>
      {showSignup ? (
        <div className="authform">
          <div className="left">
            <Image src={logo} alt="logo" />
          </div>
          <div className="right">
            <h1>SignUp to become a freak</h1>
            <form action="">
              <Input color="neutral" placeholder="email" size="lg" variant="oulined" />

              <Input
                color="neutral"
                placeholder="password"
                size="lg"
                variant="oulined"
                type="password"
              />
              <div className="form_input_leftright">
                <Input
                  color="warning"
                  size="lg"
                  variant="outlined"
                  placeholder="Age"
                  type="number"
                />
                <Input
                  color="warning"
                  size="lg"
                  variant="outlined"
                  placeholder="weight"
                  type="number"
                />
              </div>
              <Select color="warning" placeholder="Gender" size="lg" variant="outlined">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
              <br />

              <label htmlFor="height">height</label>
              <div>
                <Input
                  color="warning"
                  size="lg"
                  variant="outlined"
                  placeholder="ft"
                  type="number"
                />
                <Input
                  color="warning"
                  size="lg"
                  variant="outlined"
                  placeholder="in"
                  type="number"
                />
              </div>
              <button
                onClick={() => {
                  handleSignUp();
                }}
              >
                SignUp
              </button>
              <p>
                Already have an account?
                <button
                  onClick={() => {
                    setShowSignup(false);
                  }}
                >
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div className="authform">
          <div className="left">
            <Image src={logo} alt="logo" />
          </div>
          <div className="right">
            <h1>Login to become a freak</h1>
            <form action="">
              <Input color="neutral" placeholder="email" size="lg" variant="oulined" />

              <Input
                color="neutral"
                placeholder="password"
                size="lg"
                variant="oulined"
                type="password"
              />
              <button
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </button>
              <p>
                dont have an account?
                <button
                  onClick={() => {
                    setShowSignup(true);
                  }}
                >
                  Signup
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
