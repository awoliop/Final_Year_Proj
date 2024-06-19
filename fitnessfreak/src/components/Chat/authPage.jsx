"use client";
import axios from "axios";
import { parse } from "path";
import { useEffect, useState } from "react";
// import { useAuthData } from "../../hooks/AuthDataContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AuthPage = (props) => {
  useEffect(() => {
    // const fetchEmailPart = async () => {
    //   try {
    //     // const response = await api.get("/email/get-email");
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/email/get-email`);
    //     const data = await response.json();

    //     console.log(data);
    //     setEmailPart(data);
    //     console.log(emailPart);
    //   } catch (error) {
    //     throw error;
    //   }
    // };

    const handleLogin = async () => {
      function getSingleWordLocalStorageItem() {
        const regex = /^[a-zA-Z0-9]+$/; // Define your regex pattern
        let mostRecentTimestamp = 0;
        let mostRecentItem = null;

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (regex.test(key)) {
            try {
              const item = JSON.parse(localStorage.getItem(key));
              const itemTimestamp = new Date(item.timestamp).getTime();
              if (itemTimestamp > mostRecentTimestamp) {
                mostRecentTimestamp = itemTimestamp;
                mostRecentItem = { key, value: item.value };
              }
            } catch (e) {
              console.error("Error parsing JSON from localStorage:", e);
            }
          }
        }

        console.log("Most recent item:", mostRecentItem);

        return mostRecentItem;
      }

      const item = getSingleWordLocalStorageItem();
      if (item && item.value) {
        console.log("Matching localStorage item:", item.value);
      } else {
        console.log("No matching localStorage item found.");
      }

      const data = item ? item.value : null;
      console.log("item");
      console.log(item);

      // const data = getEmailPart(authData);
      console.log("data");
      console.log(data);
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/peripheral/authenticate`, {
          username: data,
        })
        .then((r) => props.onAuth({ ...r.data, secret: data }))
        .catch((error) => console.error("Error authenticating:", error));
    };

    // Call fetchEmailPart function
    // fetchEmailPart();
    // Call handleLogin function
    handleLogin();
  }, []);

  return (
    <div className="background">
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        <span>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </span>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default AuthPage;
