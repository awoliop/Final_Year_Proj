"use client";
import React, { useState, useEffect } from "react";
import "./Routines.css";
import Card from "../../components/Routines/Card/Card";
import AddCard from "../../components/Routines/AddCard/AddCard";
import axios from "axios";
import Link from "next/link";

const page = () => {
  const [routines, setRoutines] = useState([]);
  const [adminWorkouts, setAdminWorkouts] = useState([]);

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

  const fetchAdminWorkouts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.ok) {
        setAdminWorkouts(data.data);
        console.log("Workouts fetched successfully:", data.data);
      } else {
        console.error("Error fetching workouts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  useEffect(() => {
    fetchAdminWorkouts();
    fetchPopularRoutines();
  }, []);

  return (
    <div className="render-routines">
      <div className="default-routines">
        <div className="routine-title">
          <h1>Popular Routines</h1>
        </div>
        <div className="card-container">
          {routines.map((item, index) => (
            <Link href={"/routine/" + item.RoutineID} className="links" key={index}>
              <Card routineName={item.RoutineID} />
            </Link>
          ))}
        </div>
      </div>
      <hr />
      <div className="admin-routines">
        <div className="routine-title">
          <h1>New Updates</h1>
        </div>
        <div className="card-container">
          {adminWorkouts.map((item, index) => (
            <Link href={"/adminroutine/" + item.routineID} className="links" key={index}>
              <Card routineName={item.routineID} />
            </Link>
          ))}
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
        </div>
      </div>
    </div>
  );
};

export default page;
