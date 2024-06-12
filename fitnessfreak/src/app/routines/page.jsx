"use client";
import React from "react";
import "./Routines.css";
import Card from "../../components/Routines/Card/Card";
import AddCard from "../../components/Routines/AddCard/AddCard";
import { useState, useEffect } from "react";
import axios from "axios";
const page = () => {
  const fetchPopularRoutines = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/routines/popularroutines`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching popular routines:", error);
    }
  };

  fetchPopularRoutines();

  useEffect(() => {
    fetchPopularRoutines();
  }, []);

  return (
    <div className="render-routines">
      <div className="default-routines">
        <div className="routine-title">
          <h1>Popular Routines</h1>
        </div>
        <div className="card-container">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <hr />
      <div className="custome-routines">
        <div className="routine-title">
          <h1>My Routines</h1>
        </div>
        <div className="card-container">
          <div className="card-containers">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <AddCard />
          </div>
          {/* <div>
            <AddCard />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
