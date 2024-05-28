import React from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { AiOutlineEye } from "react-icons/ai";
import "./HomeBanner1.css";

const HomeBanner1 = () => {
  const [data, setData] = React.useState<any>(null);

  const getData = async () => {
    // let temp = [
    //   {
    //     name: "Calories Intake",
    //     value: 2000,
    //     unit: "kcal",
    //     goal: 2500,
    //     goalUnit: "kcal",
    //   },
    //   {
    //     name: "Sleep",
    //     value: 8,
    //     unit: "hrs",
    //     goal: 8,
    //     goalUnit: "hrs",
    //   },
    //   {
    //     name: "Steps",
    //     value: 50,
    //     unit: "steps",
    //     goal: 10000,
    //     goalUnit: "steps",
    //   },
    //   {
    //     name: "Water",
    //     value: 2000,
    //     unit: "ml",
    //     goal: 3000,
    //     goalUnit: "ml",
    //   },
    //   {
    //     name: "Weight",
    //     value: 75,
    //     unit: "kg",
    //     goal: 70,
    //     goalUnit: "kg",
    //   },
    //   {
    //     name: "Workout",
    //     value: 2,
    //     unit: "days",
    //     goal: 6,
    //     goalUnit: "days",
    //   },
    // ];
    // setData(temp);
    // console.log(temp);

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/report/getreport", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if (data.ok) {
          setData(data.data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setData([]);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  // function simplifyFraction(numerator: number, denominator: number): [number, number] {
  //   function gcd(a: number, b: number): number {
  //     // Ensure values are positive
  //     a = Math.abs(a);
  //     b = Math.abs(b);

  //     while (b !== 0) {
  //       const temp = b;
  //       b = a % b;
  //       a = temp;
  //     }

  //     return a;
  //   }

  //   if (denominator === 0) {
  //     throw new Error("Denominator cannot be zero.");
  //   }

  //   const commonDivisor: number = gcd(numerator, denominator);
  //   const simplifiedNumerator: number = numerator / commonDivisor;
  //   const simplifiedDenominator: number = denominator / commonDivisor;

  //   return [simplifiedNumerator, simplifiedDenominator];
  // }

  return (
    <div className="meters">
      {data?.length > 0 &&
        data.map((item: any, index: number) => {
          return (
            <div className="card" key={index}>
              <div className="card-header">
                <div className="card-header-box">
                  <div className="card-header-box-name">{item.name}</div>
                  <div className="card-header-box-value">
                    {parseInt(item.value)} {item.unit}
                  </div>
                </div>
                <div className="card-header-box">
                  <div className="card-header-box-name">Target</div>
                  <div className="card-header-box-value">
                    {parseInt(item.goal)} {item.unit}
                  </div>
                </div>
              </div>

              <CircularProgress
                color="neutral"
                determinate
                variant="solid"
                size="lg"
                value={(item.value / item.goal) * 100}
              >
                <div className="textincircle">
                  <span>{parseInt(item.value)}</span>
                  <span className="hrline"></span>
                  <span className="textincircle">{parseInt(item.goal)}</span>
                </div>
              </CircularProgress>

              <button
                onClick={() => {
                  window.location.href = `/report/${item.name}`;
                }}
              >
                Show Report <AiOutlineEye />
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default HomeBanner1;
