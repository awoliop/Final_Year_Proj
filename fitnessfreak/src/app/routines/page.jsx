"use client";
import React from "react";
import "./Routines.css";
import Card from "../../components/Routines/Card/Card";
import AddCard from "../../components/Routines/AddCard/AddCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const page = () => {
  const [routines, setRoutines] = useState([]);
  const [adminRoutines, setAdminRoutines] = useState([]);

  const fetchPopularRoutines = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/awoliop/PopularRoutines/6d5b0fe022917ad3eed8d56877914e043f9497af/PopularRoutines.json"
      );
      const data = await response.json();
      setRoutines(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching popular routines:", error);
    }
  };

  const adminadded = () => {
    try {
      // Fetching workouts from the backend API
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.ok) {
            // Handle successful response
            console.log("Workouts fetched successfully:", data.data);
          } else {
            // Handle error response
            console.error("Error fetching workouts:", data.message);
          }
        })
        .catch((err) => {
          console.error("Error fetching workouts:", err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    adminadded();
    fetchPopularRoutines();
  }, []);

  return (
    <div className="render-routines">
      <div className="default-routines">
        <div className="routine-title">
          <h1>Popular Routines</h1>
        </div>
        <div className="card-container">
          {routines.map((item, index) => {
            return (
              <Link href={"/routine/" + item.RoutineID} className="links">
                <Card routineName={item.RoutineID} />
              </Link>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="custome-routines">
        <div className="routine-title">
          <h1>My Routines</h1>
        </div>
        <div className="card-container">
          <div className="card-containers">
            <Card />
            <Card />
            <AddCard />
          </div>
          {/* <div>
            <AddCard />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
