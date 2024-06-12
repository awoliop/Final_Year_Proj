import React from "react";
import "./AddCard.css";
import Image from "next/image";
const AddCard = () => {
  return (
    <div>
      <div className="icon-card">
        <div className="image-card-section">
          <button className="add-button">
            <Image
              src="/add.svg"
              alt="Routines Image"
              width={300}
              height={300}
              className="add-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
