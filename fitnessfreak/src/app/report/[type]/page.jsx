"use client";
import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./ReportPage.css";
import { AiFillEdit } from "react-icons/ai";
import showCalorieIntakePopup from "@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";
import { usePathname } from "next/navigation";
import CalorieIntakePopup from "@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";
import { toast } from "react-toastify";
import { title } from "process";

const page = () => {
  const color = "#ffc20e";
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
    }
  };

  useEffect(() => {
    getDataForS1();
  }, []);

  const [showCalorieIntakePopup, setShowCalorieIntakePopup] = useState(false);
  return (
    <div className="reportpage">
      <div className="s1">
        {data && (
          <LineChart
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
          />
        )}
      </div>

      <button
        className="editbutton"
        onClick={() => {
          setShowCalorieIntakePopup(true);
        }}
      >
        <AiFillEdit />
      </button>

      {showCalorieIntakePopup && (
        <CalorieIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />
      )}
    </div>
  );
};

export default page;

// 1:19:00 day-6
