"use client";
import { useState } from "react";

import "./chat.css";
import AuthPage from "../../components/Chat/authPage";
import ChatsPage from "../../components/Chat/chatsPage";

function App() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    return <ChatsPage user={user} />;
  }
}

export default App;
