"use client";
import React, { useState, useEffect } from "react";
import "./routine.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";

const Page = ({ params }) => {
  const [routines, setRoutines] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [routine, setRoutine] = useState(null);
  const name = params.id;

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/awoliop/Workout-DB/d02bcab3464c3271d0d9f539198318a2d7fddfc2/merged.json"
      );
      const data = await response.json();
      setWorkouts(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const workoutFinder = (RoutineContentElement) => {
    return workouts.filter((item) => item.id === RoutineContentElement);
  };

  // const adminadded = () => {
  //   try {
  //     // Fetching workouts from the backend API
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);

  //         if (data.ok) {
  //           // Handle successful response
  //           console.log("Workouts fetched successfully:", data.data);
  //         } else {
  //           // Handle error response
  //           console.error("Error fetching workouts:", data.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching workouts:", err);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const fetchAdminWorkouts = async () => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     if (data.ok) {
  //       setAdminWorkouts(data.data);
  //       console.log("Workouts fetched successfully:", data.data);
  //     } else {
  //       console.error("Error fetching workouts:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching workouts:", error);
  //   }
  // };

  useEffect(() => {
    // adminadded();
    fetchPopularRoutines();
    fetchWorkouts();
  }, [params.id]);

  useEffect(() => {
    if (routines.length > 0) {
      const foundRoutine = routines.find((item) => item.RoutineID === params.id);
      setRoutine(foundRoutine);
      setIsLoading(false);
    }
  }, [routines, params.id]);

  if (isLoading || !routine) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {/* <div>
          <h2>{routine ? routine.RoutineID : "Loading..."}</h2>
          <p></p>
        </div> */}
        <div className="hold-accordion">
          {routine.RoutineContent ? (
            routine.RoutineContent.map((item, index) => {
              return (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    {item}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="details">
                      {workoutFinder(item).map((workout, index) => (
                        <div key={index} className="acc-detail">
                          <div className="acc-image">
                            <img src={workout.images[0]} height={320} alt={workout.name} />
                          </div>
                          <div className="acc-info">
                            <div className="acc-primary-muscle">
                              <span className="static-primary-muslcle">Primary Muscles: </span>
                              <span>{workout.primaryMuscles[0]}</span>
                            </div>
                            <div className="acc-instructions-detail">
                              <p id="acc-instruction-title" className="static-primary-muslcle">
                                Instructions
                              </p>
                              <div>
                                {workout.instructions.map((instruction, instructionIndex) => (
                                  <div key={instructionIndex} className="acc-instructions">
                                    <div>➤</div>
                                    <div>{instruction}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <div>No content available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
