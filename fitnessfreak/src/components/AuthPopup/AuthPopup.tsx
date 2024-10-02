"use client";
import React, { useEffect, useState } from "react";
import "./AuthPopup.css";
import Image from "next/image";
import logo from "@/assets/fit1.png";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { ToastContainer, toast } from "react-toastify";
import { parse } from "path";
// import { useAuthData } from "../../hooks/AuthDataContext";

interface AuthPopupProps {
  setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupFormData {
  name: String | null;
  email: String | null;
  password: String | null;
  weightInKg: Number | null;
  heightInCm: Number | null;
  goal: String | null;
  gender: String | null;
  dob: Date | null;
  activityLevel: String | null;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup, loginformData, setLoginFormData }) => {
  // const { authData, login } = useAuthData();
  // const [email, setEmail] = useState("");
  const [showSignup, setShowSignup] = React.useState<boolean>(false);
  const [signupformData, setSignupFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    weightInKg: 0.0,
    heightInCm: 0.0,
    goal: "",
    gender: "",
    dob: new Date(),
    activityLevel: "",
  });

  const login = () => {
    const username = loginformData.email.split("@")[0];
    const timestamp = new Date().toISOString();
    const data = { value: username, timestamp };

    // Store the data as a JSON string
    localStorage.setItem(username, JSON.stringify(data));
    console.log("Set item in localStorage:", localStorage.getItem(username));

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginformData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.ok) {
          toast.success(data.message);
          window.location.reload();
          setShowpopup(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setGoals = () => {
    // console.log(process.env.NEXT_PUBLIC_BACKEND_API);

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupformData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.ok) {
          toast.success(data.message, {
            position: "top-center",
          });

          setShowSignup(false);
        } else {
          toast.error(data.message, {
            position: "top-center",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
            <Image src={logo} alt="Logo" height={200} width={200} className="image-size" />
          </div>
          <div className="right">
            <h1>Signup to become fitter</h1>
            <form action="">
              <Input
                color="warning"
                placeholder="name"
                size="lg"
                variant="solid"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    name: e.target.value,
                  });
                }}
              />
              <Input
                color="warning"
                placeholder="email"
                size="lg"
                variant="solid"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    email: e.target.value,
                  });
                }}
              />
              <Input
                color="warning"
                placeholder="password"
                size="lg"
                variant="solid"
                type="password"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    password: e.target.value,
                  });
                }}
              />

              <Input
                color="warning"
                size="lg"
                variant="solid"
                type="number"
                placeholder="Weight in kg"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    weightInKg: parseFloat(e.target.value),
                  });
                }}
              />

              <Select
                color="warning"
                placeholder="Activity Level"
                size="lg"
                variant="solid"
                onChange={(event: React.SyntheticEvent | null, newValue: string | null) => {
                  setSignupFormData({
                    ...signupformData,
                    activityLevel: newValue?.toString() || "",
                  });
                }}
              >
                <Option value="sedentary">Sedentary</Option>
                <Option value="light">Light</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="active">Active</Option>
                <Option value="veryActive">Very Active</Option>
              </Select>

              <Select
                color="warning"
                placeholder="Goal"
                size="lg"
                variant="solid"
                required
                onChange={(event: React.SyntheticEvent | null, newValue: string | null) => {
                  setSignupFormData({
                    ...signupformData,
                    goal: newValue?.toString() || "",
                  });
                }}
              >
                <Option value="weightLoss">Lose</Option>
                <Option value="weightMaintain">Maintain</Option>
                <Option value="weightGain">Gain</Option>
              </Select>

              <Select
                color="warning"
                placeholder="Gender"
                size="lg"
                variant="solid"
                onChange={(event: React.SyntheticEvent | null, newValue: string | null) => {
                  setSignupFormData({
                    ...signupformData,
                    gender: newValue?.toString() || "",
                  });
                }}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>

              <label htmlFor="">Height</label>

              <Input
                color="warning"
                size="lg"
                variant="solid"
                type="number"
                placeholder="cm"
                required
                // inputMode="numeric"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    heightInCm: parseFloat(e.target.value),
                  });
                }}
              />

              <label htmlFor="">Date of Birth</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  defaultValue={dayjs(new Date())}
                  sx={{
                    backgroundColor: "white",
                  }}
                  onChange={(newValue) => {
                    setSignupFormData({
                      ...signupformData,
                      dob: new Date(newValue as any),
                    });
                  }}
                />
              </LocalizationProvider>

              <button
                className="popup-buttons"
                onClick={(e) => {
                  e.preventDefault();
                  setGoals();
                }}
              >
                Signup
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <button
                className="popup-buttons"
                onClick={() => {
                  setShowSignup(false);
                }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="authform">
          <div className="left">
            <Image src={logo} alt="Logo" />
          </div>
          <div className="right">
            <h1>Login to become fitter</h1>
            <form action="">
              <Input
                color="warning"
                placeholder="email"
                size="lg"
                variant="solid"
                onChange={(e) => {
                  setLoginFormData({
                    ...loginformData,
                    email: e.target.value,
                  });
                }}
              />

              <Input
                color="warning"
                placeholder="password"
                size="lg"
                variant="solid"
                type="password"
                onChange={(e) => {
                  setLoginFormData({
                    ...loginformData,
                    password: e.target.value,
                  });
                }}
              />
              <button
                className="popup-buttons"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                Login
              </button>
            </form>
            <p>
              Don't have an account?{" "}
              <button
                className="popup-buttons"
                onClick={() => {
                  setShowSignup(true);
                }}
              >
                Signup
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
