"use client";
import React from "react";
import exp from "constants";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./Workout.css";

const Workout = () => {
  const [isactive, setIsactive] = useState("levels");
  const [level, setLevel] = useState("beginner");
  const [catagory, setCatagory] = useState("strength");
  const [force, setForce] = useState("pull");
  const [mechanics, setMechanics] = useState("compound");
  const [equipment, setEquipment] = useState("dumbbell");
  const [WorkoutData, setWorkoutData] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/awoliop/Workout-DB/d02bcab3464c3271d0d9f539198318a2d7fddfc2/merged.json"
      );

      const data = await response.json();
      setWorkoutData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <main>
      <div className="biggest-contianer">
        <nav className="navbars">
          <span
            className={isactive == "levels" ? "isactive" : "ispassive"}
            onClick={() => {
              setIsactive("levels");
              console.log(isactive);
            }}
          >
            Level
          </span>
          <span
            className={isactive == "category" ? "isactive" : "ispassive"}
            onClick={() => {
              setIsactive("category");
              console.log(isactive);
            }}
          >
            Catagory
          </span>
          <span
            className={isactive == "Force" ? "isactive" : "ispassive"}
            onClick={() => {
              setIsactive("Force");
              console.log(isactive);
            }}
          >
            Force
          </span>
          <span
            className={isactive == "Mechanics" ? "isactive" : "ispassive"}
            onClick={() => {
              setIsactive("Mechanics");
              console.log(isactive);
            }}
          >
            Mechanics
          </span>
          <span
            className={isactive == "Equipments" ? "isactive" : "ispassive"}
            onClick={() => {
              setIsactive("Equipments");
              console.log(isactive);
            }}
          >
            Equipments
          </span>
        </nav>
        {isactive == "levels" ? (
          <div>
            <div className="inner-nav">
              <nav className="smallest-nav">
                <span
                  className={level == "beginner" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setLevel("beginner");
                  }}
                >
                  Beginner
                </span>
                <span
                  className={level == "intermediate" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setLevel("intermediate");
                  }}
                >
                  Intermediate
                </span>
                <span
                  className={level == "expert" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setLevel("expert");
                  }}
                >
                  Expert
                </span>
              </nav>
            </div>
            {level == "beginner" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.level == "beginner") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.id} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.level}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : level == "intermediate" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.level == "intermediate") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.level}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.level == "expert") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.level}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            )}
          </div>
        ) : isactive == "category" ? (
          <div>
            <div className="inner-nav">
              <nav className="smallest-nav">
                <span
                  className={catagory == "strength" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setCatagory("strength");
                  }}
                >
                  Strength
                </span>
                <span
                  className={catagory == "stretching" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setCatagory("stretching");
                  }}
                >
                  Stretching
                </span>
                <span
                  className={catagory == "plyometrics" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setCatagory("plyometrics");
                  }}
                >
                  Plyometrics
                </span>
                <span
                  className={catagory == "strongman" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setCatagory("strongman");
                  }}
                >
                  Strongman
                </span>
                <span
                  className={catagory == "powerlifting" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setCatagory("powerlifting");
                  }}
                >
                  Powerlifting
                </span>
                <span
                  className={catagory == "cardio" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setCatagory("cardio");
                  }}
                >
                  Cardio
                </span>
                <span
                  className={catagory == "olympic weightifting" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setCatagory("olympic weightifting");
                  }}
                >
                  Olympic
                </span>
              </nav>
            </div>
            {catagory == "strength" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.category == "strength") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.category}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : catagory == "stretching" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.category == "stretching") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.category}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : catagory == "plyometrics" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.category == "plyometrics") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.category}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : catagory == "strongman" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.category == "strongman") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.category}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : catagory == "powerlifting" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.category == "powerlifting") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.category}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : catagory == "cardio" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.category == "cardio") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.category}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.category == "olympic weightlifting") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.category}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            )}
          </div>
        ) : isactive == "Force" ? (
          <div>
            <div className="inner-nav">
              <nav className="smallest-nav">
                <span
                  className={force == "pull" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setForce("pull");
                  }}
                >
                  Pull
                </span>
                <span
                  className={force == "push" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setForce("push");
                  }}
                >
                  Push
                </span>
                <span
                  className={force == "static" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setForce("static");
                  }}
                >
                  Static
                </span>
              </nav>
            </div>
            {force == "pull" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.force == "pull") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.force}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : force == "push" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.force == "push") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.force}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.force == "static") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.force}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            )}
          </div>
        ) : isactive == "Mechanics" ? (
          <div>
            <div className="inner-nav">
              <nav className="smallest-nav">
                <span
                  className={mechanics == "compound" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setMechanics("compound");
                  }}
                >
                  compound
                </span>
                <span
                  className={mechanics == "isolation" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setMechanics("isolation");
                  }}
                >
                  Isolation
                </span>
              </nav>
            </div>
            {mechanics == "compound" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.mechanic == "compound") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.mechanic}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : mechanics == "isolation" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.mechanic == "isolation") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.mechanic}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.mechanic == "null") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.mechanic}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="inner-nav">
              <nav className="smallest-nav">
                <span
                  className={equipment == "dumbbell" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setEquipment("dumbbell");
                  }}
                >
                  Dumbbell
                </span>
                <span
                  className={equipment == "barbell" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setEquipment("barbell");
                  }}
                >
                  Barbell
                </span>
                <span
                  className={equipment == "bands" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setEquipment("bands");
                  }}
                >
                  Bands
                </span>
                <span
                  className={equipment == "cable" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setEquipment("cable");
                  }}
                >
                  Cable
                </span>
                <span
                  className={equipment == "exercise ball" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setEquipment("exercise ball");
                  }}
                >
                  Ball
                </span>
                <span
                  className={equipment == "body only" ? "inneractive" : "innerpassive"}
                  onClick={() => {
                    setEquipment("body only");
                  }}
                >
                  Body
                </span>
              </nav>
            </div>
            {equipment == "dumbbell" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.equipment == "dumbbell") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.equipment}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : equipment == "barbell" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.equipment == "barbell") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.equipment}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : equipment == "bands" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.equipment == "bands") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.equipment}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : equipment == "cable" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.equipment == "cable") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.equipment}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : equipment == "exercise ball" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.equipment == "exercise ball") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.equipment}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : equipment == "body only" ? (
              <div className="workout-banners">
                {WorkoutData.map((item, index) => {
                  if (item.equipment == "body only") {
                    return (
                      <Link className="card" href={"/workoutdetail/" + item.id}>
                        <div className="image-section">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="detail-section">
                          <div className="onhover">
                            {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                          </div>
                          <div className="onhover">{item.primaryMuscles}</div>
                          <div className="detail-bottom">
                            <div>{item.equipment}</div>
                            <div>{item.mechanic ? item.mechanic : "None"}</div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Workout;
