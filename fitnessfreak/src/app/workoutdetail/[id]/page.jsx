"use client";
import React from "react";
import { useEffect, useState } from "react";
import "./detail.css";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { RxDividerVertical } from "react-icons/rx";
import { SlActionRedo } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const page = ({ params }) => {
  const [selected, setSeleceted] = useState([]);
  const id = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  const fetchWorkout = async (passedId) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://raw.githubusercontent.com/awoliop/Workout-DB/d02bcab3464c3271d0d9f539198318a2d7fddfc2/merged.json"
      );

      const data = await response.json();
      console.log(data);
      const filtered = data.filter((item) => {
        return item.id == passedId;
      });
      setSeleceted(filtered);
      // console.log(selected);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
    console.log(selected);
  };

  useEffect(() => {
    fetchWorkout(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bigger-contianer">
      {isLoading == true ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <span>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </span>
          <span>Loading...</span>
        </div>
      ) : isLoading == false ? (
        <div>
          {selected.map((item, index) => {
            return (
              <div className="whole-section">
                <div className="information-image-section">
                  <div className="image-sections">
                    <img src={item.images[imageIndex]} alt={item.name} />
                  </div>
                  <div className="info-section">
                    {selected.map((item, index) => {
                      return (
                        <div key={index}>
                          <div key={index}>
                            {Object.keys(item).map((key) => {
                              if (key !== "instructions" && key !== "images" && key !== "id") {
                                return (
                                  <div key={key} className="inner-info-section">
                                    <div className="inner-info-one">
                                      <span className="info-icons">
                                        <SlActionRedo />
                                      </span>
                                      <span className="info-text">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                      </span>
                                      <span className="info-icons">
                                        <IoIosArrowForward />
                                      </span>
                                    </div>
                                    <div className="inner-info-two">
                                      {Array.isArray(item[key]) ? item[key].join(", ") : item[key]}
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="instruction-title">
                  <span className="title-icon">
                    <RiErrorWarningLine />
                  </span>
                  Instructions
                </div>
                <div className="instructions-section">
                  <div className="instructions">
                    {item.instructions.map((element, index) => {
                      return (
                        <div key={index} className="instruction">
                          <span className="instruction-icon">
                            <BsArrowRightCircleFill
                              style={{
                                color: "red",
                                fontSize: "26px",
                                textAlign: "start",
                              }}
                            />
                          </span>
                          <span className="instruction-text">{element}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Workout not found | Network Error.</div>
      )}
    </div>
  );
};

export default page;
