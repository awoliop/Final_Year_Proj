"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import "./Contactus.css";
import { ToastContainer, toast } from "react-toastify";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_iqp892l", "template_02fm4g6", form.current, {
        publicKey: "4hGGXH68x_SpXctkd",
      })
      .then(
        () => {
          toast.success("Message sent succesfully!");
        },
        (error) => {
          toast.error("message not sent, try again!");
        }
      );
  };

  return (
    <div className="main">
      <div>
        <p>Contact us to better your experience with Fitter</p>
      </div>
      <StyledContactForm>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" required />
          <label>Email</label>
          <input type="email" name="user_email" required />
          <label>Message</label>
          <textarea name="message" required />
          <input type="submit" value="Send" className="button" />
        </form>
      </StyledContactForm>
    </div>
  );
};

export default function Page() {
  return <ContactUs />;
}

const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;
