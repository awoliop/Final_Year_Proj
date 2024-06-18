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

const Addworkout = () => {
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

  const handleWorkOutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Workout, index: number) => {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/imageuploadroutes/uploadimage`, {
      method: "POST",
      body: formData,
    });
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
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
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

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/workoutplans/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWorkout),
      credentials: "include",
    });

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
      <h2 className="title">Workout</h2>
      <input
        type="text"
        name="routineID"
        placeholder="Type Routine Name..."
        value={workout.routineID}
        onChange={handleWorkOutChange}
        className="input-field"
      />
      <div className="expanding-input-fields">
        <div className="section">
          <h2>Suggestions</h2>
          {workout.suggestions.map((suggestion, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                value={suggestion}
                placeholder="Type Suggestions..."
                onChange={(e) => handleArrayChange(e, "suggestions", index)}
                className="input-field"
              />
            </div>
          ))}
          <button onClick={() => addField("suggestions")} className="add-button">
            {/* <span>AddSuggestions</span> */}
            <span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </button>
        </div>
        <div className="section">
          <h2>Cautions</h2>
          {workout.cautions.map((caution, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                value={caution}
                placeholder="Type Cautions..."
                onChange={(e) => handleArrayChange(e, "cautions", index)}
                className="input-field"
              />
            </div>
          ))}
          <button onClick={() => addField("cautions")} className="add-button">
            <span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </button>
        </div>
        <div className="section">
          <h2>Restrictions</h2>
          {workout.restrictions.map((restriction, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                value={restriction}
                placeholder="Type Restrictions..."
                onChange={(e) => handleArrayChange(e, "restrictions", index)}
                className="input-field"
              />
            </div>
          ))}
          <button onClick={() => addField("restrictions")} className="add-button">
            <span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </button>
        </div>
        <div className="section">
          <h2>Mandatories Prior to Workout</h2>
          {workout.mandatoriesPriorToWorkout.map((mandatory, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                value={mandatory}
                placeholder="Type Mandatories..."
                onChange={(e) => handleArrayChange(e, "mandatoriesPriorToWorkout", index)}
                className="input-field"
              />
            </div>
          ))}
          <button onClick={() => addField("mandatoriesPriorToWorkout")} className="add-button">
            <span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                  <path
                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="exercise-form">
        <div className="upper-content">
          <div className="section">
            <h2 className="title">Add Exercise to Workout</h2>
            <input
              type="text"
              name="id"
              placeholder="Exercise ID..."
              value={exercise.id}
              onChange={handleExerciseChange}
              className="input-field"
            />
          </div>
          <div className="section">
            <h2>Exercise Name</h2>
            <input
              type="text"
              name="exercise"
              placeholder="Exercise name..."
              value={exercise.exercise}
              onChange={handleExerciseChange}
              className="input-field"
            />
          </div>
          <div className="section">
            <h2>Primay Muscle</h2>
            <input
              type="text"
              name="primaryMuscle"
              placeholder="Primary Muscle..."
              value={exercise.primaryMuscle}
              onChange={handleExerciseChange}
              className="input-field"
            />
          </div>
          <div className="section">
            <h2>Instructions</h2>
            {exercise.instructions.map((instruction, index) => (
              <div key={index} className="input-group">
                <input
                  type="text"
                  value={instruction}
                  placeholder="instructions..."
                  onChange={(e) =>
                    setExercise({
                      ...exercise,
                      instructions: exercise.instructions.map((inst, i) => (i === index ? e.target.value : inst)),
                    })
                  }
                  className="input-field"
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
              className="add-button"
            >
              <span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                      stroke="#1C274C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>{" "}
                    <path
                      d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                      stroke="#1C274C"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    ></path>{" "}
                  </g>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="lower-content">
          <input
            type="file"
            name="imageFile"
            placeholder="Exercise Image..."
            style={{ backgroundColor: "transparent" }}
            onChange={(e) => {
              if (e.target.files) {
                setExercise({
                  ...exercise,
                  imageFile: e.target.files[0],
                });
              }
            }}
            className="input-field file-input"
          />
          <button onClick={addExerciseToWorkout} className="spec-button">
            Add Exercise
          </button>
        </div>
      </div>
      <div className="exercises">
        {workout.exercises.map((exercise, index) => (
          <div className="exercise" key={index}>
            <h2>{exercise.exercise}</h2>
            <p>Primary Muscle: {exercise.primaryMuscle}</p>
            <p>
              Instructions:{" "}
              {exercise.instructions.join(", ").substring(0, 10) +
                (exercise.instructions.join(", ").length > 10 ? "...." : "")}
            </p>
            <img
              className="imageDisplay"
              src={exercise.imageFile ? URL.createObjectURL(exercise.imageFile) : exercise.imageURL}
              alt="Exercise"
              height={90}
              width={90}
            />
            <button onClick={() => deleteExerciseFromWorkOut(index)} className="spec-button">
              Delete
            </button>
          </div>
        ))}
      </div>
      <button onClick={saveWorkout} className="save-button">
        Add Workout
      </button>
    </div>
  );
};

export default Addworkout;
