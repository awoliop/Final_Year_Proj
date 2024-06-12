import React from "react";
import Image from "next/image";
import "./Card.css";
const Card = () => {
  return (
    <div>
      <div className="card">
        <div className="image-card-section">
          <Image src="/download (1).jpg" alt="Routines Image" width={300} height={300} />
        </div>
        <div className="name-card-section">
          <h3 className="name-title">Routine</h3>
          <p className="name-workout-list">
            <span>Bench press</span>
            <span>Dumbbell</span>
            <span>BarBell</span>
            <span>cables</span>
          </p>
          <div className="explore-button-contiain">
            <button className="explore-button">
              <span>
                <Image src="/explore.svg" height={30} width={30} alt="explore" />
              </span>
              <span className="explore-text">Explore</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
