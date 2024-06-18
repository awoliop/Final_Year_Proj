"use client";
import React from "react";
import Nav from "../../components/Nav/Nav";
import { useState } from "react";
const page = () => {
  const [button, setbutton] = useState("workouts");

  return (
    <div>
      <Nav button={button} setbutton={setbutton} />
    </div>
  );
};

export default page;
