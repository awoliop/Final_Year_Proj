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
import Image from "next/image";
import logo1 from "@/assets/pdf/fitness bible/download.jpg";
import logo2 from "@/assets/pdf/nutrition/download (1).jpg";
import logo3 from "@/assets/pdf/nutrition/download (2).jpg";
import logo4 from "@/assets/pdf/nutrition/et.jpg";
import logo5 from "@/assets/pdf/nutrition/download (4).jpg";
import logo6 from "@/assets/pdf/nutrition/download (5).jpg";
import logo7 from "@/assets/pdf/nutrition/download (6).jpg";
import logo8 from "@/assets/pdf/nutrition/download.jpg";
import logo9 from "@/assets/pdf/nutrition/images.jpg";
// import pdf1 from "@/assets/pdf/kehe103.pdf";
const Nutrition = () => {
  const myref = useRef(null);
  const [have, setHave] = useState([
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
  ]);

  useEffect(() => {
    const storedHad = localStorage.getItem("had");
    if (storedHad) {
      setHave(JSON.parse(storedHad));
    }
  }, []);

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

      const updatedHave = [...data, ...have];
      setHave(updatedHave);

      localStorage.setItem("had", JSON.stringify(updatedHave));

      console.log(updatedHave);
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
      <div className="title-nutrition">
        <p>Nutrition and Fitness Materials.</p>
      </div>
      <div className="pdf-contianer">
        <div className="one-pdf">
          <div className="nutrition-image">
            <Image src={logo8} alt="Nutrition Pdf" height={270} width={270} />
          </div>
          <div>
            <p></p>
            <a href="/p/kehe103.pdf" download="kehe103.pdf" className="link-download">
              Download PDF
            </a>
          </div>
        </div>
        <div className="one-pdf">
          <div className="nutrition-image">
            <Image src={logo2} alt="Nutrition Pdf" height={270} width={270} />
          </div>
          <div>
            <p></p>
            <a
              href="/p/fitness-handbook.jpg"
              download="fitness-handbook.pdf"
              className="link-download"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="one-pdf">
          <div className="nutrition-image">
            <Image src={logo3} alt="Nutrition Pdf" height={270} width={270} />
          </div>
          <div>
            <p></p>
            <a
              href="/p/fundamentals-of-foodnutrition-and-diet-therapy.pdf"
              download="fundamentals-of-foodnutrition-and-diet-therapy.pdf"
              className="link-download"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="one-pdf">
          <div className="nutrition-image">
            <Image src={logo4} alt="Nutrition Pdf" height={270} width={270} />
          </div>
          <div>
            <p></p>
            <a
              href="/p/ln_hew_nutrition_final.pdf"
              download="ln_hew_nutrition_final.pdf"
              className="link-download"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="one-pdf">
          <div className="nutrition-image">
            <Image src={logo5} alt="Nutrition Pdf" height={270} width={270} />
          </div>
          <div>
            <p></p>
            <a
              href="/p/Nutrition and health.pdf"
              download="Nutrition and health.pdf"
              className="link-download"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="one-pdf">
          <div className="nutrition-image">
            <Image src={logo6} alt="Nutrition Pdf" height={270} width={270} />
          </div>
          <div>
            <p></p>
            <a
              href="/p/Nutrition_and_Fitness.pdf"
              download="Nutrition_and_Fitness.pdf"
              className="link-download"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="one-pdf">
          <div className="nutrition-image">
            <Image src={logo1} alt="Nutrition Pdf" height={270} width={270} />
          </div>
          <div>
            <p></p>
            <a
              href="/p/The Men's Fitness Exercise Bible [101 Best Workouts To Build Muscle, Burn Fat And Sculpt Your Best Body Ever].pdf"
              download="The Men's Fitness Exercise Bible [101 Best Workouts To Build Muscle, Burn Fat And Sculpt Your Best Body Ever].pdf"
              className="link-download"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
