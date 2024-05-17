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
      [e.target.value]: e.target.value,
    });
  };
  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise({
      ...exercise,
      [e.target.value]: e.target.value,
    });
  };

  const addExerciseToWorkout = () => {};
  const deleteExerciseFromWorkOut = (index: number) => {};
  const uploadImage = (image: File) => {};
  const checklogin = async () => {};
  const saveWorkout = async () => {};

  return (
    <div className="formpage">
      <h1 className="title">AddWork</h1>
    </div>
  );
};

export default pages;
