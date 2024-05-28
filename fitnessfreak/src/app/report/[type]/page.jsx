"use client";
import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./ReportPage.css";
import { AiFillEdit } from "react-icons/ai";
import showCalorieIntakePopup from "@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";
import { usePathname } from "next/navigation";
import CalorieIntakePopup from "@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup";

const page = () => {
  const color = "#ffc20e";
  const pathname = usePathname();
  console.log(pathname);

  const chartsParams = {
    height: 300,
    width: 500,
  };
  const [data, setData] = useState(null);

  const getDataForS1 = async () => {
    let temp = [
      {
        date: "Thu Sep 28 2023 20:30:30 GMT+0530 (India Standard Time)",
        value: 2000,
        unit: "kcal",
      },
      {
        date: "Wed Sep 27 2023 20:30:30 GMT+0530 (India Standard Time)",
        value: 2500,
        unit: "kcal",
      },
      {
        date: "Tue Sep 26 2023 20:30:30 GMT+0530 (India Standard Time)",
        value: 2700,
        unit: "kcal",
      },
      {
        date: "Mon Sep 25 2023 20:30:30 GMT+0530 (India Standard Time)",
        value: 3000,
        unit: "kcal",
      },
      {
        date: "Sun Sep 24 2023 20:30:30 GMT+0530 (India Standard Time)",
        value: 2000,
        unit: "kcal",
      },
      {
        date: "Sat Sep 23 2023 20:30:30 GMT+0530 (India Standard Time)",
        value: 2300,
        unit: "kcal",
      },
      {
        date: "Fri Sep 22 2023 20:30:30 GMT+0530 (India Standard Time)",
        value: 2500,
        unit: "kcal",
      },
      {
        date: "Thu Sep 21 2023 20:30:30 GMT+0530 (India Standard Time)",
        value: 2700,
        unit: "kcal",
      },
    ];

    let dataForLineChart = temp.map((item) => {
      let val = item.value;
      return val;
    });

    let dataForXAxis = temp.map((item) => {
      let val = new Date(item.date);
      return val.getDate();
    });

    console.log({
      data: dataForLineChart,
      title: "1 Day Calorie Intake",
      color: color,
      xAxis: {
        data: dataForXAxis,
        label: "Last 10 Days",
        scaleType: "time",
      },
    });

    console.log(data);

    setData({
      data: dataForLineChart,
      title: "1 Day Calorie Intake",
      color: color,
      xAxis: {
        data: dataForXAxis,
        label: "Last 10 Days",
        scaleType: "time",
      },
    });
  };

  useEffect(() => {
    getDataForS1();
  }, []); // Empty dependency array means this effect runs once on component mount

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
