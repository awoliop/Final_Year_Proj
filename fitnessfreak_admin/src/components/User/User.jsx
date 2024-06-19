"use client";
import React, { useState, useEffect } from "react";
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

import "./User.css";
import { colors } from "@mui/material";

const User = () => {
  const [users, setUsers] = useState([]);
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
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();
        console.log(result.data);

        if (result.ok) {
          setUsers(result.data);
          // console.log(result.data);
        } else {
          console.error("Failed to fetch Users");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };

    fetchUsers();
  }, []);

  const manageAccess = async (UserId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/users/${UserId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        console.log("Workout deleted successfully");
        setUsers(users.filter((user) => user._id !== UserId));
      } else {
        console.error("Failed to delete workout: ", result.message);
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div style={{ marginLeft: "150px", marginBottom: "130px" }}>
      <h1 className="users-title">Users</h1>
      {/* <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <p>{user.name}</p>
            <p>{user.gender}</p>
            <p>{user.email}</p>
            <p>
              {formatDistanceToNow(new Date(user.createdAt), {
                addSuffix: true,
              })}
            </p>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div> */}

      <TableContainer component={Paper} sx={{ maxWidth: 1500 }}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Acct. Created</StyledTableCell>
              <StyledTableCell align="center">Terminate Opt.</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} className="row-elements">
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">{user.gender}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                  })}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button onClick={() => manageAccess(user._id)} className="del-buttons">
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

export default User;
