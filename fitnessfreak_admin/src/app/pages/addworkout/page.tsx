"use client";
import React, { useEffect } from "react";
import "./addworkout.css";
import { toast } from "react-toastify";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import { error } from "console";

interface Workout {
  name: string;
  description: string;
  durationInMinutes: number;
  exercises: Exercises[];
  imageURL: string;
  imageFile: File | null;
}

interface Exercises {
  name: string;
  description: string;
  sets: number;
  reps: number;
  imageURL: string;
  imageFile: File | null;
}

const pages = () => {
  const [workout, setWorkout] = React.useState<Workout>({
    name: "",
    description: "",
    durationInMinutes: 0,
    exercises: [],
    imageURL: "",
    imageFile: null,
  });

  const [exercise, setExercise] = React.useState<Exercises>({
    name: "",
    description: "",
    sets: 0,
    reps: 0,
    imageURL: "",
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

  const addExerciseToWorkout = () => {
    if (
      exercise.name === "" ||
      exercise.description === "" ||
      exercise.sets === 0 ||
      exercise.reps === 0 ||
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
      workout.name === "" ||
      workout.description === "" ||
      workout.durationInMinutes === 0 ||
      workout.imageFile === null ||
      workout.exercises.length === 0
    ) {
      toast.error("Please fill all the fields!", {
        position: "top-center",
      });
      return;
    }

    let workoutImageURL = null;
    if (workout.imageFile) {
      workoutImageURL = await uploadImage(workout.imageFile);
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
      imageURL: workoutImageURL || workout.imageURL,
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
        name="name"
        placeholder="Workout name"
        value={workout.name}
        onChange={handleWorkOutChange}
      />
      <textarea
        name="description"
        placeholder="Workout description"
        value={workout.description}
        onChange={handleWorkOutChange}
        rows={5}
        cols={50}
      />
      <input
        type="number"
        name="durationInMinutes"
        placeholder="Workout duration"
        value={workout.durationInMinutes}
        onChange={handleWorkOutChange}
      />
      <input
        type="file"
        name="imageFile"
        placeholder="Workout image"
        onChange={(e) => {
          if (e.target.files) {
            setWorkout({
              ...workout,
              imageFile: e.target.files[0],
            });
          }
        }}
      />

      <div className="exercise-form">
        <h1 className="title">Add Exercise to Workout</h1>
        <input
          type="text"
          name="name"
          placeholder="Exercise name"
          value={exercise.name}
          onChange={handleExerciseChange}
        />
        <textarea
          name="description"
          placeholder="Exercise description"
          value={exercise.description}
          onChange={handleExerciseChange}
          rows={5}
          cols={50}
        />
        <label htmlFor="sets">Sets</label>
        <input
          type="number"
          name="sets"
          placeholder="Sets"
          value={exercise.sets}
          onChange={handleExerciseChange}
        />
        <label htmlFor="reps">Reps</label>
        <input
          type="number"
          name="reps"
          placeholder="Reps"
          value={exercise.reps}
          onChange={handleExerciseChange}
        />
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
            <h1>{exercise.name}</h1>
            <p>{exercise.description}</p>
            <p>Sets: {exercise.sets}</p>
            <p>Reps: {exercise.reps}</p>
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
