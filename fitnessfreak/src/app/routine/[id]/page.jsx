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
        "https://raw.githubusercontent.com/awoliop/PopularRoutines/9f640c0878ec13512d164e79c5b9aa13829d4dc2/PopularRoutines.json"
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

  useEffect(() => {
    fetchPopularRoutines();
    fetchWorkouts();
  }, [params.id]);

  useEffect(() => {
    if (routines.length > 0) {
      const foundRoutine = routines.find((item) => item.routineID === params.id);

      console.log(foundRoutine);
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
        <div className="routinrID-div">
          <p>{routine.RoutineID}</p>
        </div>
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
        <div className="text-based">
          <div className="acc-instructions-detail section-in-div">
            <p id="acc-instruction-title" className="static-primary-muslcle">
              Restrictions
            </p>
            <div>
              {routine.Restrictions.map((restriction, index) => (
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
              {routine.Mandatories.map((mandy, index) => (
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
              {routine.Cautions.map((caution, index) => (
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
              {routine.Suggestions.map((suggestion, index) => (
                <div key={index} className="acc-instructions">
                  <div>➤</div>
                  <div>{suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="cautions"></div>
          <div className="suggestions"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
