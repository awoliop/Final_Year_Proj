"use client";
import React from "react";
import Image from "next/image";
import "./Card.css";
import { useState, useEffect } from "react";

const Card = ({ routineName }) => {
  // const routineName = routineName;

  const [routines, setRoutines] = useState([]);
  const [items, setItems] = useState([]);

  const fetchPopularRoutines = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/awoliop/PopularRoutines/6d5b0fe022917ad3eed8d56877914e043f9497af/PopularRoutines.json"
      );
      const data = await response.json();
      setRoutines(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching popular routines:", error);
    }
  };

  const theRoutine = routines.find((item) => item.routineID === routineName);

  const workoutRender = () => {
    if (theRoutine && theRoutine.RoutineContent) {
      const content = [];
      for (let i = 0; i < theRoutine.RoutineContent.length; i++) {
        if (i <= 2) {
          content.push(<span key={i}>{theRoutine.RoutineContent[i]}</span>);
        }
      }
      setItems(content);
    }
  };

  useEffect(() => {
    workoutRender();
    fetchPopularRoutines();
  }, []);
  return (
    <div>
      <div className="card">
        <div className="image-card-section">
          <Image src="/download (1).jpg" alt="Routines Image" width={300} height={300} />
        </div>
        <div className="name-card-section">
          <h3 className="name-title">{routineName}</h3>
          <p className="name-workout-list">
            {items.map((item, index) => {
              return item;
            })}
          </p>
          <div className="explore-button-contiain">
            <button className="explore-button">
              <span>
                <Image src="/explore.svg" height={30} width={30} alt="explore" />
              </span>
              <span className="explore-text">Explore</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
