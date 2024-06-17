import React, { useState, useEffect } from "react";
import "./DeleteWorkout.css";

const DeleteWorkout = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const result = await response.json();
        console.log(result.data);

        if (result.ok) {
          setWorkouts(result.data);
        } else {
          console.error("Failed to fetch workouts");
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const deleteWorkout = async (workoutId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts/${workoutId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok && result.ok) {
        console.log("Workout deleted successfully");
        setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
      } else {
        console.error("Failed to delete workout: ", result.message);
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div>
      <h1>Workouts</h1>
      {workouts.map((workout) => (
        <div key={workout._id} className="workout-item">
          <p>{workout.name}</p>
          <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default DeleteWorkout;
