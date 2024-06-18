"use client";
import React from "react";
import "./Nutrition.css";

import { useState, useEffect, useRef } from "react";
import { Input } from "@chakra-ui/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { parse } from "path";
import { colors } from "@mui/material";
const Nutrition = () => {
  const myref = useRef(null);
  const [have, sethave] = useState(
    JSON.parse(localStorage.getItem("had")) || [
      {
        name: "",
        calories: null,
        serving_size_g: null,
        fat_total_g: null,
        fat_saturated_g: null,
        protein_g: null,
        cholesterol_mg: null,
        carbohydrates_total_g: null,
        fiber_g: null,
        sugar_g: null,
      },
    ]
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#054147",
      color: theme.palette.common.white,
      fontSize: 17,
    },
    [`&.${tableCellClasses.body}`]: {
      // fontSize: 27,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#EEF7FF",
      fontSize: 20,
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#7AB2B2",
      fontSize: 20,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [input, setinput] = useState("");

  const sendoAPI = async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/nutrition?query=" + input, {
        method: "GET",
        headers: { "X-Api-Key": "jAli6SynO2fFQ3QJAKp1Mw==TV0TL9FsMpJzWV9R" },
        contentType: "application/json",
      });
      if (!response.ok) {
        console.error("an error here", response.statusText);
      }
      const data = await response.json();
      if (have[have.length - 1].name == "") {
        have.pop();
      }

      // data[0].name = data[0].name.toUpperCase();
      console.log(data.name);
      sethave([...data, ...have]);

      if (have.length != 0) {
        localStorage.setItem("had", JSON.stringify(have));
      }

      console.log(have);
    } catch (error) {
      console.log("here is the error" + error);
    }
  };
  return (
    <div className="bigger-container">
      {" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Type meal"
          className="input-field"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
        <button
          className="nutrition-button"
          ref={myref}
          onClick={(e) => {
            sendoAPI(e.target.value);
          }}
        >
          submit
        </button>
      </form>
      {/* <hr /> */}
      <div>
        <h1>Details of your meal</h1>
        <TableContainer component={Paper} sx={{ maxWidth: 1500, marginLeft: "8%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Meal</StyledTableCell>
                {/* <StyledTableCell align="left">calories</StyledTableCell> */}
                <StyledTableCell align="left">serving size&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="left">fat total&nbsp;(g)</StyledTableCell>
                {/* <StyledTableCell align="left">Protein&nbsp;(g)</StyledTableCell> */}
                <StyledTableCell align="left">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="left">fiber&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="left">sugar&nbsp;(g)</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{have[0].name}</TableCell>
                {/* <TableCell>{have[0].calories}</TableCell> */}
                <TableCell>{have[0].fat_total_g}</TableCell>
                <TableCell>{have[0].fat_total_g}</TableCell>
                {/* <TableCell>{have[0].protein_g}</TableCell> */}
                <TableCell>{have[0].carbohydrates_total_g}</TableCell>
                <TableCell>{have[0].fiber_g}</TableCell>
                <TableCell>{have[0].sugar_g}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <h1>Recent search history</h1>
        <TableContainer component={Paper} sx={{ maxWidth: 1500, marginLeft: "8%" }}>
          <Table sx={{ minWidth: 550 }} aria-label="customized table">
            <TableHead>
              <TableRow className="TableRow">
                <StyledTableCell align="left">Meals</StyledTableCell>
                {/* <StyledTableCell align="left">calories</StyledTableCell> */}
                <StyledTableCell align="left">serving size&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="left">fat total&nbsp;(g)</StyledTableCell>
                {/* <StyledTableCell align="left">Protein&nbsp;(g)</StyledTableCell> */}
                <StyledTableCell align="left">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="left">fiber&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="left">sugar&nbsp;(g)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {have.map((food, index) => (
                <StyledTableRow key={index}>
                  <TableCell className="TableCell">{have[index].name}</TableCell>
                  {/* <TableCell className="TableCell">{have[index].calories}</TableCell> */}
                  <TableCell className="TableCell">{have[index].fat_total_g}</TableCell>
                  <TableCell className="TableCell">{have[index].fat_total_g}</TableCell>
                  {/* <TableCell className="TableCell">{have[index].protein_g}</TableCell> */}
                  <TableCell className="TableCell">{have[index].carbohydrates_total_g}</TableCell>
                  <TableCell className="TableCell">{have[index].fiber_g}</TableCell>
                  <TableCell className="TableCell">{have[index].sugar_g}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Nutrition;
