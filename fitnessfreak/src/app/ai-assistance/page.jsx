"use client";
import React from "react";
import { useMemo } from "react";
import { AiChat } from "@nlux/react";
import "@nlux/themes/nova.css";
import { streamAdapter } from "./adapter";
import { personas } from "./personas";
import "./theme-overrides.css";

const AI = () => {
  const adapter = useMemo(() => streamAdapter, []);

  const acessSearchResults = () => {
    return (
      <AiChat
        // We can use the 'my-theme' class to increase specificity
        // and override the default theme variables
        className="my-theme"
        conversationOptions={{ layout: "bubbles" }}
        displayOptions={{ colorScheme: "dark" }}
        personaOptions={personas}
        adapter={adapter}
      />
    );
  };
  return (
    // <AiChat
    //   // We can use the 'my-theme' class to increase specificity
    //   // and override the default theme variables
    //   className="my-theme"
    //   conversationOptions={{ layout: "bubbles" }}
    //   displayOptions={{ colorScheme: "dark" }}
    //   personaOptions={personas}
    //   adapter={adapter}
    // />
    <div>{acessSearchResults()}</div>
  );
};

export default AI;
