"use client";
import React, { useState, useEffect } from "react";
import "./routine.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Page = ({ params }) => {
  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [theRoutine, setTheRoutine] = useState([]);
  const routineID = params.id;

  const fetchAdminWorkouts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.data);
      if (data.ok) {
        setRoutines(data.data);

        console.log("Workouts fetched successfully:", data.data);
      } else {
        console.error("Error fetching workouts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  // const RoutinesFinder = (routineID) => {
  //   return routines.filter((item, index) => item.id == routineID);
  // };
  // RoutinesFinder(routineID);

  useEffect(() => {
    fetchAdminWorkouts();
  }, [params.id]);

  useEffect(() => {
    if (routines.length > 0) {
      const foundRoutine = routines.find((item) => item._id == routineID);
      setTheRoutine(foundRoutine);
      setIsLoading(false);
    }
  }, [routines, params.id]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </span>
        <span>Loading...</span>
      </div>
    );
  }

  if (!routines) {
    return <div>No routine found.</div>;
  }

  return (
    <div>
      <div className="routinrID-div">
        <p>{theRoutine.routineID}</p>
      </div>
      <div className="hold-accordion">
        {theRoutine.exercises && theRoutine.exercises.length > 0 ? (
          theRoutine.exercises.map((exercise, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                {exercise.exercise}
              </AccordionSummary>
              <AccordionDetails>
                <div className="details">
                  <div className="acc-detail">
                    <div className="acc-image">
                      <img
                        src={exercise.imageURL}
                        height={400}
                        width={520}
                        alt={exercise.exercise}
                      />
                    </div>
                    <div className="acc-info">
                      <div className="acc-primary-muscle">
                        <span className="static-primary-muslcle">Primary Muscles: </span>
                        <span>{exercise.primaryMuscle}</span>
                      </div>
                      <div className="acc-instructions-detail">
                        <p id="acc-instruction-title" className="static-primary-muslcle">
                          Instructions
                        </p>
                        <div>
                          {exercise.instructions.map((instruction, instructionIndex) => (
                            <div key={instructionIndex} className="acc-instructions">
                              <div>➤</div>
                              <div>{instruction}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <div>No exercises available.</div>
        )}
      </div>
      <div className="text-based">
        <div className="acc-instructions-detail section-in-div">
          <p id="acc-instruction-title" className="static-primary-muslcle">
            Restrictions
          </p>
          <div>
            {theRoutine.restrictions.map((restriction, index) => (
              <div key={index} className="acc-instructions">
                <div>➤</div>
                <div>{restriction}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="acc-instructions-detail second-section-in-div">
          <p id="acc-instruction-title" className="static-primary-muslcle">
            Mandatories
          </p>
          <div>
            {theRoutine.mandatoriesPriorToWorkout.map((mandy, index) => (
              <div key={index} className="acc-instructions">
                <div>➤</div>
                <div>{mandy}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-based">
        <div className="acc-instructions-detail section-in-divs">
          <p id="acc-instruction-title" className="static-primary-muslcle">
            Cautions
          </p>
          <div>
            {theRoutine.cautions.map((caution, index) => (
              <div key={index} className="acc-instructions">
                <div>➤</div>
                <div>{caution}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="acc-instructions-detail second-section-in-divs">
          <p id="acc-instruction-title" className="static-primary-muslcle">
            Suggestions
          </p>
          <div>
            {theRoutine.suggestions.map((suggestion, index) => (
              <div key={index} className="acc-instructions">
                <div>➤</div>
                <div>{suggestion}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
