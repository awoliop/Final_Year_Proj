import React from "react";
import "./Routines.css";
import Card from "../../components/Routines/Card/Card";
import AddCard from "../../components/Routines/AddCard/AddCard";
const page = () => {
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
