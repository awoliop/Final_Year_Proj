"use client";
import axios from "axios";
import { parse } from "path";
import { useEffect, useState } from "react";
// import { useAuthData } from "../../hooks/AuthDataContext";

const AuthPage = (props) => {
  // // const [emailPart, setEmailPart] = useState("");
  // const { authData } = useAuthData();

  // const getEmailPart = (email) => {
  //   const emailPart = email.split("@");
  //   console.log(emailPart[0]);
  //   return emailPart[0];
  // };

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
        const regex = /^[a-zA-Z0-9]+$/;
        let mostRecentItem = null;
        let mostRecentTimestamp = 0;

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (regex.test(key)) {
            const item = JSON.parse(localStorage.getItem(key));
            const itemTimestamp = new Date(item.timestamp).getTime();
            if (itemTimestamp > mostRecentTimestamp) {
              mostRecentTimestamp = itemTimestamp;
              mostRecentItem = { key, value: item.value };
            }
          }
        }

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
      <h1>Loading...</h1>
    </div>
  );
};

export default AuthPage;
