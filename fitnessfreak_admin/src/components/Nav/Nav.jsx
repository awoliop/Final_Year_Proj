"use client";
import React, { useState } from "react";
import "./Nav.css";
import Addworkout from "../addworkout/Addworkout";
import DeleteWorkout from "../DeleteWorkout/DeleteWorkout";
import User from "@/components/User/User";
const Nav = ({ button, setbutton }) => {
  return (
    <div className="nav-contianersss">
      <nav className="nav">
        <button
          className={button == "workouts" ? "isactive" : "ispassive"}
          onClick={(e) => {
            setbutton("workouts");
          }}
        >
          Manage Workouts
        </button>
        <button
          className={button == "user" ? "isactive" : "ispassive"}
          onClick={(e) => {
            setbutton("user");
          }}
        >
          Manage Users
        </button>
      </nav>
      <div>
        {button == "workouts" ? (
          <div>
            <div>
              <h1 className="header">Add WOrkouts</h1>
              <hr />
              <Addworkout />
            </div>
            <div>
              <h1 className="header">Delete WOrkouts</h1>
              <hr />
              <div>
                <DeleteWorkout />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="header">Delete User</h1>
            <hr />
            <div>
              <User />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
