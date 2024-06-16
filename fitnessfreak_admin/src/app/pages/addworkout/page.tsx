"use client";
import React, { useEffect } from "react";
import "./addworkout.css";
import { toast } from "react-toastify";

interface Exercise {
  id: string;
  exercise: string;
  imageURL: string;
  primaryMuscle: string;
  instructions: string[];
  imageFile: File | null;
}

interface Workout {
  routineID: string;
  exercises: Exercise[];
  suggestions: string[];
  cautions: string[];
  restrictions: string[];
  mandatoriesPriorToWorkout: string[];
}

const pages = () => {
  const [workout, setWorkout] = React.useState<Workout>({
    routineID: "",
    exercises: [],
    suggestions: [""],
    cautions: [""],
    restrictions: [""],
    mandatoriesPriorToWorkout: [""],
  });

  const [exercise, setExercise] = React.useState<Exercise>({
    id: "",
    exercise: "",
    imageURL: "",
    primaryMuscle: "",
    instructions: [""],
    imageFile: null,
  });

  const handleWorkOutChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const handleExerciseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Workout,
    index: number
  ) => {
    const newArray = [...workout[field]];
    newArray[index] = e.target.value;
    setWorkout({
      ...workout,
      [field]: newArray,
    });
  };

  const addField = (field: keyof Workout) => {
    setWorkout({
      ...workout,
      [field]: [...workout[field], ""],
    });
  };

  const addExerciseToWorkout = () => {
    if (
      exercise.id === "" ||
      exercise.exercise === "" ||
      exercise.primaryMuscle === "" ||
      exercise.instructions.length === 0 ||
      exercise.imageFile === null
    ) {
      toast.error("Please fill all the fields", {
        position: "top-center",
      });
      return;
    }

    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: [...prevWorkout.exercises, exercise],
    }));
  };

  const deleteExerciseFromWorkOut = (index: number) => {
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: prevWorkout.exercises.filter((_, i) => i !== index),
    }));
  };

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("myimage", image);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/imageuploadroutes/uploadimage`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("image uploaded successfully!", data);
      return data.imageUrl;
    } else {
      console.error("Failed to upload Image!!");
      return null;
    }
  };

  const checkLogin = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      console.log("Admin is authenticated!!");
    } else {
      console.log("Admin is not authenticated!");
      toast.error("You are not authenticated!");
      window.location.href = "/adminauth/login";
    }
  };

  const saveWorkout = async () => {
    await checkLogin();

    if (
      workout.routineID === "" ||
      workout.exercises.length === 0 ||
      workout.suggestions.length === 0 ||
      workout.cautions.length === 0 ||
      workout.restrictions.length === 0 ||
      workout.mandatoriesPriorToWorkout.length === 0
    ) {
      toast.error("Please fill all the fields!", {
        position: "top-center",
      });
      return;
    }

    const updatedExercises = await Promise.all(
      workout.exercises.map(async (exercise) => {
        if (exercise.imageFile) {
          const imageURL = await uploadImage(exercise.imageFile);
          return { ...exercise, imageURL };
        }
        return exercise;
      })
    );

    const updatedWorkout = {
      ...workout,
      exercises: updatedExercises,
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/workoutplans/workouts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWorkout),
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Workout created successfully", data);
      toast.success("Workout created successfully", {
        position: "top-center",
      });
    } else {
      console.error("Workout creation failed");
      toast.error("Workout creation failed", {
        position: "top-center",
      });
    }
    console.log(updatedWorkout);
  };

  return (
    <div className="formpage">
      <h1 className="title">Add Workout</h1>
      <input
        type="text"
        name="routineID"
        placeholder="Routine ID"
        value={workout.routineID}
        onChange={handleWorkOutChange}
      />
      <div>
        <h2>Suggestions</h2>
        {workout.suggestions.map((suggestion, index) => (
          <div key={index}>
            <input
              type="text"
              value={suggestion}
              onChange={(e) => handleArrayChange(e, "suggestions", index)}
            />
          </div>
        ))}
        <button onClick={() => addField("suggestions")}>Add Suggestion</button>
      </div>
      <div>
        <h2>Cautions</h2>
        {workout.cautions.map((caution, index) => (
          <div key={index}>
            <input
              type="text"
              value={caution}
              onChange={(e) => handleArrayChange(e, "cautions", index)}
            />
          </div>
        ))}
        <button onClick={() => addField("cautions")}>Add Caution</button>
      </div>
      <div>
        <h2>Restrictions</h2>
        {workout.restrictions.map((restriction, index) => (
          <div key={index}>
            <input
              type="text"
              value={restriction}
              onChange={(e) => handleArrayChange(e, "restrictions", index)}
            />
          </div>
        ))}
        <button onClick={() => addField("restrictions")}>
          Add Restriction
        </button>
      </div>
      <div>
        <h2>Mandatories Prior to Workout</h2>
        {workout.mandatoriesPriorToWorkout.map((mandatory, index) => (
          <div key={index}>
            <input
              type="text"
              value={mandatory}
              onChange={(e) =>
                handleArrayChange(e, "mandatoriesPriorToWorkout", index)
              }
            />
          </div>
        ))}
        <button onClick={() => addField("mandatoriesPriorToWorkout")}>
          Add Mandatory
        </button>
      </div>
      <div className="exercise-form">
        <h1 className="title">Add Exercise to Workout</h1>
        <input
          type="text"
          name="id"
          placeholder="Exercise ID"
          value={exercise.id}
          onChange={handleExerciseChange}
        />
        <input
          type="text"
          name="exercise"
          placeholder="Exercise name"
          value={exercise.exercise}
          onChange={handleExerciseChange}
        />
        <input
          type="text"
          name="primaryMuscle"
          placeholder="Primary Muscle"
          value={exercise.primaryMuscle}
          onChange={handleExerciseChange}
        />
        <div>
          <h2>Instructions</h2>
          {exercise.instructions.map((instruction, index) => (
            <div key={index}>
              <input
                type="text"
                value={instruction}
                onChange={(e) =>
                  setExercise({
                    ...exercise,
                    instructions: exercise.instructions.map((inst, i) =>
                      i === index ? e.target.value : inst
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            onClick={() =>
              setExercise({
                ...exercise,
                instructions: [...exercise.instructions, ""],
              })
            }
          >
            Add Instruction
          </button>
        </div>
        <input
          type="file"
          name="imageFile"
          placeholder="Exercise Image"
          onChange={(e) => {
            if (e.target.files) {
              setExercise({
                ...exercise,
                imageFile: e.target.files[0],
              });
            }
          }}
        />
        <button onClick={addExerciseToWorkout}>Add Exercise</button>
      </div>
      <div className="exercises">
        {workout.exercises.map((exercise, index) => (
          <div className="exercise" key={index}>
            <h1>{exercise.exercise}</h1>
            <p>Primary Muscle: {exercise.primaryMuscle}</p>
            <p>Instructions: {exercise.instructions.join(", ")}</p>
            <img
              className="imageDisplay"
              src={
                exercise.imageFile
                  ? URL.createObjectURL(exercise.imageFile)
                  : exercise.imageURL
              }
              alt="Exercise"
            />
            <button onClick={() => deleteExerciseFromWorkOut(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button onClick={saveWorkout}>Add Workout</button>
    </div>
  );
};

export default pages;
