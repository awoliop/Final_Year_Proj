"use client";
import axios from "axios";
import { parse } from "path";
import { useEffect, useState } from "react";

const AuthPage = (props) => {
  const [emailPart, setEmailPart] = useState("");

  useEffect(() => {
    // const fetchEmailPart = async () => {
    //   try {
    //     // Fetch the email part from the backend
    //     const response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_BACKEND_API}/email/extract-email-part`
    //     );
    //     // Extract the email part from the response data
    //     const { emailPart } = response.data;
    //     setEmailPart(emailPart);
    //   } catch (error) {
    //     console.error("Error fetching email part:", error.response ? error.response.data : error);
    //   }
    // };

    const handleLogin = () => {
      const emailPart = localStorage.getItem("usernames112");
      console.log(emailPart);
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/peripheral/authenticate`, {
          username: emailPart,
        })
        .then((r) => props.onAuth({ ...r.data, secret: emailPart }))
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
