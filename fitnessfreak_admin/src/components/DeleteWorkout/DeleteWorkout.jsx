import React, { useState, useEffect } from "react";
import "./DeleteWorkout.css";
import { formatDistanceToNow } from "date-fns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const DeleteWorkout = () => {
  const [workouts, setWorkouts] = useState([]);

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

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();
        console.log("list of workouts");
        console.log(result.data);

        if (result.ok) {
          setWorkouts(result.data);
        } else {
          console.error("Failed to fetch workouts");
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const deleteWorkout = async (workoutId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts/${workoutId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        console.log("Workout deleted successfully");
        setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
      } else {
        console.error("Failed to delete workout: ", result.message);
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div style={{ marginBottom: "170px", marginLeft: "150px" }}>
      <h1 style={{ marginBottom: "20px" }}>Workouts</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 1500 }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Workout name</StyledTableCell>
              <StyledTableCell align="center">Workout Created</StyledTableCell>
              <StyledTableCell align="center">Terminate Opt.</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout._id} className="row-elements">
                <StyledTableCell align="center">{workout._id}</StyledTableCell>
                <StyledTableCell align="center">{workout.routineID}</StyledTableCell>
                <StyledTableCell align="center">
                  {formatDistanceToNow(new Date(workout.createdAt), {
                    addSuffix: true,
                  })}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button onClick={() => deleteWorkout(workout._id)} className="del-buttons">
                    Delete
                  </button>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DeleteWorkout;
