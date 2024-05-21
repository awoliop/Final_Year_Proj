"use client";
import React from "react";
import "./addworkout.css";
import { toast } from "react-toastify";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";

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
  const handleWorkOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };
  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
    });
  };

  const addExerciseToWorkout = () => {
    console.log(exercise);
    if (
      exercise.name == "" ||
      exercise.description == "" ||
      exercise.sets == 0 ||
      exercise.reps == 0 ||
      exercise.imageFile == null
    ) {
      toast.error("Please fill all the fields", {
        position: "top-center",
      });
    }

    setWorkout({
      ...workout,
      exercises: [...workout.exercises, exercise],
    });
  };
  const deleteExerciseFromWorkOut = (index: number) => {};
  const uploadImage = (image: File) => {};
  const checklogin = async () => {};
  const saveWorkout = async () => {
    console.log(workout);
  };

  return (
    <div className="formpage">
      <h1 className="title">AddWork</h1>
      <input
        type="text"
        name="name"
        placeholder="Workout name"
        value={workout.name}
        onChange={handleWorkOutChange}
      />
      <textarea
        name="dscription"
        placeholder="workout Description"
        value={workout.description}
        onChange={(e) => {
          setWorkout({
            ...workout,
            description: e.target.value,
          });
        }}
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
        name="WorkoutImage"
        placeholder="Workout image"
        onChange={(e) => {
          setWorkout({
            ...workout,
            imageFile: e.target.files![0],
          });
        }}
        multiple
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 className="title">Add Exercise to workout</h1>
        <input
          type="text"
          name="name"
          placeholder="Workout name"
          value={exercise.name}
          onChange={handleExerciseChange}
        />
        <textarea
          name="dscription"
          placeholder="Wrokout Description"
          value={exercise.description}
          onChange={(e) => {
            setExercise({
              ...exercise,
              description: e.target.value,
            });
          }}
          rows={5}
          cols={50}
        />
        <label htmlFor="sets">sets</label>
        <input
          type="number"
          name="sets"
          placeholder="sets"
          value={exercise.sets}
          onChange={handleExerciseChange}
        />
        <label htmlFor="reps">Reps</label>
        <input
          type="number"
          name="reps"
          placeholder="reps"
          value={exercise.reps}
          onChange={handleExerciseChange}
        />
        <input
          type="file"
          name="Exerciseimage"
          placeholder="Exercise Image"
          onChange={(e) => {
            setExercise({
              ...exercise,
              imageFile: e.target.files![0],
            });
          }}
          multiple
        />
        <button
          onClick={(e) => {
            addExerciseToWorkout(e);
          }}
        >
          Add Exercise
        </button>
      </div>
      <div className="exercises">
        {workout.exercises.map((exercise, index) => (
          <div className="exercise" key={index}>
            <h1>{exercise.name}</h1>
            <p>{exercise.description}</p>
            <p>{exercise.sets}</p>
            <p>{exercise.reps}</p>
            <img
              src={
                exercise.imageFile
                  ? URL.createObjectURL(exercise.imageFile)
                  : exercise.imageURL
              }
              alt="Image File"
            />
          </div>
        ))}
      </div>
      <button
        onClick={(e) => {
          saveWorkout(e);
        }}
      >
        Add Workout
      </button>
    </div>
  );
};

export default pages;