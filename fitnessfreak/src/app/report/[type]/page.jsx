"use client";
import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./ReportPage.css";
import { AiFillEdit } from "react-icons/ai";
import showCalorieIntakePopup from "@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";
import { usePathname } from "next/navigation";
import CalorieIntakePopup from "@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";
import SleepPopup from "@/components/ReportFormPopup/Sleep/SleepPopup";
import StepPopup from "@/components/ReportFormPopup/Step/StepPopup";
import WaterPopup from "@/components/ReportFormPopup/Water/WaterPopup";
import WeightPopup from "@/components/ReportFormPopup/Weight/WeightPopup";

import { toast } from "react-toastify";
import { title } from "process";

const page = () => {
  const color = "#02b2af";
  const pathname = usePathname();
  console.log(pathname);

  const chartsParams = {
    height: 500,
    width: 700,
  };
  const [data, setData] = useState(null);

  const getDataForS1 = async () => {
    if (pathname === "/report/Calorie%20Intake") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/calorieintake/getcalorieintakebylimit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              limit: 10,
            }),
          }
        );

        const result = await response.json();

        if (result.ok) {
          const temp = result.data.map((item) => ({
            date: item.date,
            value: item.calorieIntake,
            unit: "kcal",
          }));

          const dataForLineChart = temp.map((item) => item.value);
          const dataForXAxis = temp.map((item) => new Date(item.date).getDate());

          setData({
            data: dataForLineChart,
            title: "2 Day Calorie Intake",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (pathname === "/report/Sleep") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/sleeptrack/getsleepbylimit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              limit: 10,
            }),
          }
        );

        const result = await response.json();

        if (result.ok) {
          const temp = result.data.map((item) => ({
            date: item.date,
            value: item.durationInHrs,
            unit: "kcal",
          }));

          const dataForLineChart = temp.map((item) => item.value);
          console.log(dataForLineChart);
          const dataForXAxis = temp.map((item) => new Date(item.date).getDate());

          setData({
            data: dataForLineChart,
            title: "2 Day sleep ",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (pathname == "/report/Steps") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/steptrack/getstepsbylimit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              limit: 10,
            }),
          }
        );

        const result = await response.json();

        if (result.ok) {
          const temp = result.data.map((item) => ({
            date: item.date,
            value: item.steps,
            unit: "m",
          }));

          const dataForLineChart = temp.map((item) => item.value);
          console.log(dataForLineChart);
          const dataForXAxis = temp.map((item) => new Date(item.date).getDate());

          setData({
            data: dataForLineChart,
            title: "2 Day sleep ",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (pathname == "/report/Water") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/watertrack/getwaterbylimit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              limit: 10,
            }),
          }
        );

        const result = await response.json();

        if (result.ok) {
          const temp = result.data.map((item) => ({
            date: item.date,
            value: item.amountInMilliliters,
            unit: "ml",
          }));

          const dataForLineChart = temp.map((item) => item.value);
          console.log(dataForLineChart);
          const dataForXAxis = temp.map((item) => new Date(item.date).getDate());

          setData({
            data: dataForLineChart,
            title: "2 Day sleep ",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "time",
            },
          });
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (pathname == "/report/Weight") {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_API + "/weighttrack/getweightbylimit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              limit: 10,
            }),
          }
        );

        const result = await response.json();

        if (result.ok) {
          const temp = result.data.map((item) => ({
            date: item.date,
            value: item.weight,
            unit: "m",
          }));

          const dataForLineChart = temp.map((item) => item.value);
          console.log(dataForLineChart);
          const dataForXAxis = temp.map((item) => new Date(item.date).getDate());

          setData({
            data: dataForLineChart,
            title: "2 Day sleep ",
            color: color,
            xAxis: {
              data: dataForXAxis,
              label: "Last 10 Days",
              scaleType: "Kg",
            },
          });
        } else {
          setData([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [showCalorieIntakePopup, setShowCalorieIntakePopup] = useState(false);
  const [showSleepPopup, setShowSleepPopup] = useState(false);
  const [showStepPopup, setShowStepPopup] = useState(false);
  const [showWaterPopup, setShowWaterPopup] = useState(false);
  const [showWeightPopup, setShowWeightPopup] = useState(false);
  useEffect(() => {
    getDataForS1();
  }, [showCalorieIntakePopup, showSleepPopup, showStepPopup, showWaterPopup, showWeightPopup]);

  return (
    <div className="reportpage">
      <div className="s1">
        {data && (
          <LineChart
            sx={{
              "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                strokeWidth: "0.25",
                fill: "white", // changed the color to orange
                // stroke: "#ffffff",
              },
              "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                stroke: "white",
                strokeWidth: 0.8,
              },
              "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                stroke: "white",
                strokeWidth: 0.8,
              },
              "& .MuiChartsYAxis-tickContainer": {
                stroke: "white",
                strokeWidth: 0.8,
              },
              "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                strokeWidth: "0.25",
                fill: "white", // changed the color to white
                // stroke: "#ffffff",
              },
            }}
            xAxis={[
              {
                id: "Day",
                data: data.xAxis.data,
                scaleType: data.xAxis.scaleType,
                label: data.xAxis.label,
              },
            ]}
            series={[
              {
                data: data.data,
                label: data.title,
                color: data.color,
              },
            ]}
            {...chartsParams}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
            colors={color}
            className="lineCharts"
          />
        )}
      </div>

      <button
        className="editbutton"
        onClick={() => {
          if (pathname == "/report/Calorie%20Intake") {
            setShowCalorieIntakePopup(true);
          } else if (pathname == "/report/Sleep") {
            setShowSleepPopup(true);
          } else if (pathname == "/report/Steps") {
            setShowStepPopup(true);
          } else if (pathname == "/report/Water") {
            setShowWaterPopup(true);
          } else if (pathname == "/report/Weight") {
            setShowWeightPopup(true);
          }
        }}
      >
        <AiFillEdit />
      </button>
      {showCalorieIntakePopup && (
        <CalorieIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />
      )}

      {showSleepPopup && <SleepPopup setShowSleepPopup={setShowSleepPopup} />}
      {showStepPopup && <StepPopup setShowStepPopup={setShowStepPopup} />}
      {showWaterPopup && <WaterPopup setShowWaterPopup={setShowWaterPopup} />}
      {showWeightPopup && <WeightPopup setShowWeightPopup={setShowWeightPopup} />}
    </div>
  );
};

export default page;

// 1:19:00 day-6
