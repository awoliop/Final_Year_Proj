"use client";
import React from "react";
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
  const deleteExerciseFromWorkOut = (index: number) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.filter((exercise, i) => i !== index),
    });
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
  const checklogin = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/admin/checklogin",
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.ok) {
      console.log("Admin is authenticated!!");
    } else {
      console.log("Admin is not Auhenticated!");
      toast.error("You are not authenticated!");
      window.location.href = "/adminauth/login";
    }
  };
  const saveWorkout = async () => {
    await checklogin();
    if (
      workout.name == "" ||
      workout.description == "" ||
      workout.durationInMinutes == 0 ||
      workout.imageFile == null ||
      workout.exercises.length == 0
    ) {
      toast.error("Please fill all the feilds!", {
        position: "top-center",
      });
      return;
    }
    if (workout.imageFile) {
      const imageURL = await uploadImage(workout.imageFile);

      setWorkout({
        ...workout,
        imageURL,
      });
    }

    {
      for (let i = 0; i < workout.exercises.length; i++) {
        const tempimg = workout.exercises[i].imageFile;
        if (tempimg) {
          const imageURL = await uploadImage(tempimg);
          workout.exercises[i].imageURL = imageURL;
        }
      }
    }

    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_API + "/workoutplans/workouts",
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(workout),
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("workout created successfully", data);
      toast.success("workout created successfully", {
        position: "top-center",
      });
    } else {
      console.error("workout creation Failed");
      toast.error("workout creation Failed", {
        position: "top-center",
      });
    }
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
              className="imageDIsplay"
              src={
                exercise.imageFile
                  ? URL.createObjectURL(exercise.imageFile)
                  : exercise.imageURL
              }
              alt="Image File"
            />
            <button
              onClick={() => {
                deleteExerciseFromWorkOut(index);
              }}
            >
              Delete
            </button>
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
