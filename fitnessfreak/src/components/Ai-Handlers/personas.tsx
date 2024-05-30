import { PersonaOptions } from "@nlux/react";

const assistantCssStyle = {
  background: "linear-gradient(#4a8582, #00ffbf)",
  fontSize: "2.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const personas: PersonaOptions = {
  assistant: {
    name: "Ai Assistant",
    avatar: (
      <span style={assistantCssStyle} className="emoji-span">
        🤖
      </span>
    ),
    tagline: "Your Nutritionist and workout Advisor",
  },
  user: {
    name: "Alex",
    avatar:
      "https://cdn.icon-icons.com/icons2/2643/PNG/512/man_boy_people_avatar_user_person_black_skin_tone_icon_159355.png",
  },
};
